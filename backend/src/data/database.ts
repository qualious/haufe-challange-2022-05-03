import { Connection, createConnection, ConnectionOptionsReader } from 'typeorm';

export default class Database {
  private connection: Connection;

  async startDatabase() {
    const env = process.env.NODE_ENV;
    let configName: string = '';
    switch (env) {
      case 'development':
        configName = '.dev.env';
        break;
      case 'production':
        configName = '.prod.env';
        break;
      case 'docker':
        configName = '.docker.env';
        break;
      default:
        configName = '.dev.env';
        break;
    }
    const connectionOptions = await new ConnectionOptionsReader({ configName }).get('default');

    await createConnection(connectionOptions)
      .then((_con: Connection) => {
        this.setConnection(_con);
      })
      .catch(console.error);
  }

  dropDatabase(): Promise<void> {
    return this.getConnection().dropDatabase();
  }

  getConnection(): Connection {
    return this.connection;
  }

  private setConnection(connection: Connection): void {
    this.connection = connection;
  }
}
