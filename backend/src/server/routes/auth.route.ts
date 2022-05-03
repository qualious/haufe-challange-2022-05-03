import passport from 'passport';
import { Router } from 'express';
import { validate } from 'express-validation';
import { AuthController } from 'server/controllers';
import { authValidation, options } from 'server/validations';

const authRouter = Router();

authRouter.post(
  '/login',
  passport.authenticate('local'),
  validate(authValidation.login, options),
  AuthController.login,
);

export default authRouter;
