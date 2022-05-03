import cors from 'cors';
import path from 'path';
import { Pool } from 'pg';
import logger from 'morgan';
import passport from 'passport';
import { User } from 'data/models';
import session from 'express-session';
import swaggerDocument from './swagger';
import { UserService } from './services';
import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import rickyRouter from './routes/ricky.route';
import favoriteRouter from './routes/favorite.route';
import { pasportFields } from './utils/constants/config';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  errorHandler,
  responseHandler,
  pageNotFoundHandler,
  initResLocalsHandler,
} from './middlewares';

const app = express();
const pgSession = require('connect-pg-simple')(session);

const setUpAPIRoutes = (store = undefined) => {
  // Swagger
  app.use('/swagger', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));
  // Middlewares
  app.use(logger('dev'));
  app.use(express.json());
  app.use(cookieParser(process.env.SESSION_SECRET || 'testing'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(initResLocalsHandler);
  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    }),
  );
  // NOTE: If we want stateless authentication, I'd prefered JWT authentication instead.
  // But since on the task it says "The user information for login should be stored in a DB"
  // I wasn't sure whether that meant storing a session or just simply storing a password to
  // later authenticate. Oh well. I can implement a JWT solution as well, just let me know.
  app.use(
    session({
      name: 'SID',
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'testing',
      cookie: {
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
        // TODO: true on HTTPS
        secure: false,
      },
      // IMPROVEMENT: Redis could've been used here for "auto" pruning, but
      // I didn't want to add another database just for the sake of it.
      // Trying to keep it simple.
      store: store
        ? store
        : new pgSession({
            pool: new Pool({
              port: 5432,
              host: process.env.TYPEORM_HOST,
              user: process.env.TYPEORM_USERNAME,
              password: process.env.TYPEORM_PASSWORD,
              database: process.env.TYPEORM_DATABASE,
            }),
            tableName: 'session',
          }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/ricky', rickyRouter);
  app.use('/favorite', favoriteRouter);
};

const setUpPassport = () => {
  passport.use(
    new LocalStrategy(pasportFields, (username: string, password: string, done: Function) => {
      UserService.verifyPassword(username, password)
        .then((user) => {
          return done(null, user);
        })
        .catch(() => {
          return done(null, false);
        });
    }),
  );

  passport.serializeUser((user: User, cb: Function) => {
    process.nextTick(() => {
      cb(null, { id: user.id, email: user.email });
    });
  });

  passport.deserializeUser((user: User, cb: Function) => {
    process.nextTick(() => {
      cb(null, user);
    });
  });
};

function useCustomRoute(route: string, router: Router) {
  app.use(route, router);
}

function setUpMiddlewares() {
  // Use custom response handler
  app.use(responseHandler);

  // Use custom error handler
  app.use(errorHandler);

  // Page not found
  app.use(pageNotFoundHandler);
}

export { app, useCustomRoute, setUpAPIRoutes, setUpPassport, setUpMiddlewares };
