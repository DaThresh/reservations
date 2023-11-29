import { Router } from 'express';
import { confirmAvailability } from '../services/availabilities/confirmAvailability';
import { createAvailabilities } from '../services/availabilities/createAvailabilities';
import { getAvailabilities } from '../services/availabilities/getAvailabilities';
import { purgeUnconfirmedAvailabilities } from '../services/availabilities/purgeUnconfirmed';
import { reserveAvailability } from '../services/availabilities/reserveAvailability';
import { createProvider } from '../services/providers/createProvider';

export const createV1Router = () => {
  const v1Router = Router();

  // GET Endpoints
  v1Router.get('/v1/providers/:providerId/availabilities', getAvailabilities);

  // POST Endpoints
  v1Router.post('/v1/providers', createProvider);
  v1Router.post(
    '/v1/providers/:providerId/availabilities',
    createAvailabilities
  );

  // PATCH Endpoints
  v1Router.patch(
    '/v1/providers/:providerId/availabilities/:availabilityId/reserve',
    reserveAvailability
  );
  v1Router.patch(
    '/v1/providers/:providerId/availabilities/:availabilityId/confirm',
    confirmAvailability
  );

  // This Route could have different Authentication Middleware since Origin isn't a User
  v1Router.patch('/v1/availabilities/purge', purgeUnconfirmedAvailabilities);

  return v1Router;
};
