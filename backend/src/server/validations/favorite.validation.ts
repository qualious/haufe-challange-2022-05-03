import { Joi } from 'express-validation';

const favoriteValidation = {
  create: {
    body: Joi.object({
      characterId: Joi.number().integer().required(),
    }),
  },
  destroy: {
    body: Joi.object({
      characterId: Joi.number().integer().required(),
    }),
  },
};

export default favoriteValidation;
