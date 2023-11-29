import { Request, Response } from 'express';
import { sequelize } from '../..';
import { Availability, Provider } from '../../models';
import { reserveAvailabilityParams } from '../../schemas/availabilities';
import { ApiError } from '../../utilities/ApiError';

export const reserveAvailability = async (
  request: Request,
  response: Response
) => {
  const params = reserveAvailabilityParams.params.validateSync(request.params);
  const body = reserveAvailabilityParams.body.validateSync(request.body);

  const savedAvailability = await sequelize.transaction(async (transaction) => {
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

    if (availability.requester || availability.requestedAt) {
      throw new ApiError(
        'Appointment already booked for this availability',
        409
      );
    }

    availability.verifyEnoughLeadTimeForBooking();

    return await availability.update(
      { requester: body.email, requestedAt: new Date(), confirmed: false },
      { transaction }
    );
  });

  response.send({ availability: savedAvailability }).status(204).end();
};
