// This job below could be scheduled via a CRON schedule to run every minute.
// Alternatively, it could be scheduled to run using something like GCP Cloud Scheduler.

// There are many possible ways of achieving the business requirement.
// We could also use a Job Scheduler, and schedule a specific Availability ID to be evaluated 30 minutes after reservation
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Availability } from '../../models';

export const purgeUnconfirmedAvailabilities = async (
  _: Request,
  response: Response
) => {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.setMinutes(now.getMinutes() - 30));

  await Availability.update(
    {
      requestedAt: null,
      requester: null,
      confirmed: false,
    },
    { where: { confirmed: false, requestedAt: { [Op.lte]: thirtyMinutesAgo } } }
  );

  response.status(204).end();
};
