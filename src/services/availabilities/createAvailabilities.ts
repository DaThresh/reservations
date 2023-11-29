import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { sequelize } from '../..';
import { Availability, Provider } from '../../models';
import { createAvailabilitiesSchemas } from '../../schemas/availabilities';
import { ApiError } from '../../utilities/ApiError';

const FIFTEEN_MINUTES_IN_SECONDS = 60 * 15;

export const createAvailabilities = async (
  request: Request,
  response: Response
) => {
  const body = createAvailabilitiesSchemas.body.validateSync(request.body);
  const params = createAvailabilitiesSchemas.params.validateSync(
    request.params
  );

  const availabilities = await sequelize.transaction(async (transaction) => {
    const newAvailabilities: Availability[] = [];
    const provider = await Provider.findByPk(params.providerId, {
      rejectOnEmpty: new ApiError('Provider not found', 404),
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    for (const datetime of body.datetimes) {
      const existingAvailability = await Availability.findOne({
        where: {
          providerId: provider.id,
          datetime: { [Op.between]: getConflictingTimeWindow(datetime) },
        },
        transaction,
      });

      if (existingAvailability) {
        throw new ApiError(
          `Datetime ${datetime.toString()} overlaps with existing availability with ID ${
            existingAvailability.id
          }`,
          409
        );
      }

      newAvailabilities.push(
        await Availability.create(
          { datetime, providerId: provider.id },
          { transaction }
        )
      );
    }

    return newAvailabilities;
  });

  response.status(201).send({ availabilities }).end();
};

const getConflictingTimeWindow = (datetime: Date): [Date, Date] => {
  let copiedDate = new Date(datetime);
  const beginningConflictWindow = new Date(
    copiedDate.setSeconds(
      copiedDate.getSeconds() - FIFTEEN_MINUTES_IN_SECONDS + 1
    )
  );

  copiedDate = new Date(datetime);
  const endingConflictWindow = new Date(
    copiedDate.setSeconds(
      copiedDate.getSeconds() + FIFTEEN_MINUTES_IN_SECONDS - 1
    )
  );

  return [beginningConflictWindow, endingConflictWindow];
};
