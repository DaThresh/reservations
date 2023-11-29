import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Availability, Provider } from '../../models';
import { getAvailabilitiesSchemas } from '../../schemas/availabilities';
import { ApiError } from '../../utilities/ApiError';

export const getAvailabilities = async (
  request: Request,
  response: Response
) => {
  const params = getAvailabilitiesSchemas.params.validateSync(request.params);
  const query = getAvailabilitiesSchemas.query.validateSync(request.query);

  const provider = await Provider.findByPk(params.providerId, {
    rejectOnEmpty: new ApiError('Provider not found', 404),
  });

  const copiedDate = new Date(query.startDate);
  const sevenDaysFromNow = new Date(
    copiedDate.setDate(copiedDate.getDate() + 7)
  );

  const availabilities = await Availability.findAll({
    attributes: ['id', 'providerId', 'datetime'],
    order: [['datetime', 'ASC']],
    where: {
      providerId: provider.id,
      requester: null,
      requestedAt: null,
      confirmed: false,
      datetime: { [Op.between]: [query.startDate, sevenDaysFromNow] },
    },
  });

  response.status(200).send({ availabilities }).end();
};
