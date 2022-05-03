# haufe\_challange

## Env

.env

```

POSTGRES_PORT=5432
POSTGRES_PASSWORD=''
POSTGRES_USER=postgres
POSTGRES_DB=haufe_local
POSTGRES_HOST_AUTH_METHOD=trust
POSTGRES_HOST=host.docker.internal
FRONTEND_URL=http://localhost:3000
TESTING_DATABASE=haufe_local_test
SESSION_SECRET=ZUsjoI2N2wKF83KGGMeqfPzPb8bRRo5zAFWj6rPioG7RkV1k9v
SECRET=NJEo5PPunIlNDM2NtyoWnkn1YwsXQOnAh61pvdU369YhgB7GDgmtCwCC2ta06ZUKdiMoZ1laU0G9hBFeP7BaA4k16PaxCOD4Y

```

### Run the app in terminal

1.  Create a Postgres database on your machine (default: haufe\_local)
1.  Create testing database on your machine (default: haufe\_local\_test)
2.  Install packages and start the application server.

```

$ yarn install
$ yarn start

```

3.  Build the application

```

$ yarn build

```

4.  Generate and apply migrations

```

$ yarn typeorm migration:generate --config .dev.env -n database-migrations
$ yarn build
$ yarn typeorm migration:run --config .dev.env

```

### Run the app inside a Docker container

Build the docker container and get it up and running.

Make sure that docker is running locally, then

```

$ docker-compose build
$ docker-compose up

```

### Run migrations inside a Docker container

With docker-compose running, in another terminal:

```

$ docker exec -it docker\_name /bin/sh
$ yarn typeorm migration:generate -n migration\_name --config .docker.env
$ yarn build
$ yarn typeorm migration:run --config .docker.env

```

### Make API calls against the server

Go to <http://localhost:8000/swagger> to see Swagger documentation for API endpoints.

### Access admin bro dashboard

Go to <http://localhost:8000/admin>

### Run tests and check code coverage

```

$ yarn test
$ yarn coverage

```
