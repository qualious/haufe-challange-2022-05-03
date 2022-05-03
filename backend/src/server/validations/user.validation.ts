import { Joi } from 'express-validation';

const userValidation = {
  create: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().max(255).required(),
    }),
  },
};

export default userValidation;
