import { object, string } from 'yup';

export const createProviderSchema = {
  body: object({ name: string().min(2).required() }),
};
