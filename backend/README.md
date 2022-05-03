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

Don't forget to update .dev.env, .docker.env, and .prod.env as well!

### Run the app in terminal

1.  Create a Postgres database on your machine (default: haufe\_local)
2.  Create testing database on your machine (default: haufe\_local\_test)
3.  Install packages and start the application server.

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

### Packages

"admin-bro": For admin panel. I've used it before and have no complaints so far. It's highly customizable
and the direct UI access to DB is pretty nice

"axios": For sending requests, which can be replaced with node-fetch as I've said in a
comment above the import statement of axios. My thoughts can be found there.

"class-validator" to use in conjuction with typeorm to validate length/type/etc

"connect-pg-simple" to establish a pg session for the express-session

"cookie-parser" to parse cookies

"cors" to enable cross origin resource sharing

"crypto" to manage password salts and hashing

"dayjs" this is a pretty standard momentjs replacement which is around 2kb. Pretty impressive

"dotenv": to parse environemnt variables

"express-formidable": this is a "beforehand" installation, we are not handling any file data
at the moment but it's always beneficial to add it from the get go

"express-session": to handle session

"express-validation": to validate request body/params/queries

"http-status": just a nice package that gathers http status information

"morgan": request logger used as middleware

"passport": might be a slight overkill but handles our cookie sessions for now. It also comes with
lots of login strategies in case we want to add facebook/google/github authentication in the future.
right now, we are using a classic local password validation strategy.

"passport-local": local strategy for pasport

"pg": postgres driver

"swagger-ui-express": used for documentation purposes, can be accessed on /swagger/

"tslib": ts runtime

"typeorm": ORM that I've used before and have no complaints with unless we are doing highly complicated stuff
i also considered using objectionjs instead of this but ultimately decided that I should go with something that
i'm slightly more familiar with since I've never used objectionjs. people do recommend it tho so I might create
a project with it soon :)
