import { Request, Response } from 'express';
import { sequelize } from '../..';
import { Availability, Provider } from '../../models';
import { confirmAvailabilitySchemas } from '../../schemas/availabilities';
import { ApiError } from '../../utilities/ApiError';

export const confirmAvailability = async (
  request: Request,
  response: Response
) => {
  const params = confirmAvailabilitySchemas.params.validateSync(request.params);

  await sequelize.transaction(async (transaction) => {
    const [provider, availability] = await Promise.all([
      Provider.findByPk(params.providerId, {
        rejectOnEmpty: new ApiError('Provider not found', 404),
        lock: transaction.LOCK.UPDATE,
        transaction,
      }),
      Availability.findByPk(params.availabilityId, {
        rejectOnEmpty: new ApiError('Availability not found', 404),
        lock: transaction.LOCK.UPDATE,
        transaction,
      }),
    ]);

    if (availability.providerId !== provider.id) {
      throw new ApiError('Availability not found for specific Provider', 404);
    }

    if (availability.confirmed) {
      throw new ApiError('This appointment is already confirmed', 409);
    }

    await availability.update({ confirmed: true }, { transaction });
  });

  response.status(204).end();
};
