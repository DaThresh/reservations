import { Request, Response } from 'express';
import { Provider } from '../../models';
import { createProviderSchema } from '../../schemas/providers';

export const createProvider = async (request: Request, response: Response) => {
  const { name } = createProviderSchema.body.validateSync(request.body);
  const provider = await Provider.create({ name });
  response.status(201).send({ provider }).end();
};
