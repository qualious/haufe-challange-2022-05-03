import { Pool } from 'pg';
import session from 'express-session';
import { User, Favorite, Session } from 'data/models';
import { Connection, createConnection } from 'typeorm';
import { setUpAPIRoutes, setUpMiddlewares, setUpPassport } from 'server/app';

const pgSession = require('connect-pg-simple')(session);

export default class Database {
  public static connection: Connection;

  static async startDatabase() {
    await createConnection({
      port: 5432,
      password: '',
      logging: false,
      type: 'postgres',
      dropSchema: true,
      synchronize: true,
      username: 'postgres',
      entities: [User, Favorite, Session],
      database: process.env.TESTING_DATABASE,
    })
      .then((_con) => {
        Database.connection = _con;
      })
      .catch(console.error);
  }

  static async dropDatabase(): Promise<void> {
    await Database.connection.dropDatabase();
  }
}

function setUpRoutesAndMiddlewares(): void {
  const store = new pgSession({
    pool: new Pool({
      port: 5432,
      password: '',
      host: 'localhost',
      user: 'postgres',
      database: process.env.TESTING_DATABASE,
    }),
    tableName: 'session',
  });

  setUpAPIRoutes(store);
  setUpPassport();
  setUpMiddlewares();
}

export { Database, setUpRoutesAndMiddlewares };
