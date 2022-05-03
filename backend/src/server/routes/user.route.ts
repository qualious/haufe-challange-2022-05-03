import { Router } from 'express';
import { validate } from 'express-validation';
import { UserController } from 'server/controllers';
import { authenticate } from 'server/middlewares';
import { userValidation, options } from 'server/validations';

const userRouter = Router();

userRouter.post('/', validate(userValidation.create, options), UserController.create);

userRouter.delete('/', authenticate, UserController.destroy);

export default userRouter;
