import { Router } from 'express';
import { getAvailabilities } from '../services/availabilities';

export const createV1Router = () => {
  const v1Router = Router();

  v1Router.get('/v1/availabilities', getAvailabilities);

  // v1Router.post('/v1/availabilities');
  // v1Router.post('/v1/appointments');
  // v1Router.post('/v1/appointments/confirm');

  return v1Router;
};
