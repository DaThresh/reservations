import { Request, Response } from 'express';

export const getAvailabilities = async (
  request: Request,
  response: Response
) => {
  response.status(200).send({ availabilities: [] }).end();
};
