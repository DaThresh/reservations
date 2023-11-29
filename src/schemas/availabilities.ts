import { array, date, object, string } from 'yup';

export const getAvailabilitiesSchemas = {
  params: object({ providerId: string().required() }),
  query: object({ startDate: date().required() }),
};

export const createAvailabilitiesSchemas = {
  params: object({ providerId: string().required() }),
  body: object({ datetimes: array(date().required()).required() }),
};

export const reserveAvailabilityParams = {
  body: object({ email: string().email().required() }),
  params: object({
    providerId: string().required(),
    availabilityId: string().required(),
  }),
};

export const confirmAvailabilitySchemas = {
  params: object({
    providerId: string().required(),
    availabilityId: string().required(),
  }),
};
