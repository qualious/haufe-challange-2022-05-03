import { Joi } from 'express-validation';

const authValidation = {
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(255).required(),
    }),
  },
  register: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(255).required(),
    }),
  },
};

export default authValidation;
