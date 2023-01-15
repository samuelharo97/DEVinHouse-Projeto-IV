# ConnectLab Server

This project is the fourth major challenge from the DEVinHouse course in collaboration with Intelbras. The objective was to develop a REST-API server built using NestJs, typeORM, and postgres. It is designed to manage a dashboard of IOT devices.

## Prerequisites

- Node.js
- Postgres
- TypeScript

## Installation

To install the necessary dependencies, run the following command:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application will start on http://localhost:3000.
Although it would be best to include PORT variable in your .env file to run the application with a different port.

## Database configuration

The application uses typeORM to connect to a postgres database. The database configuration can be found in the ormconfig.json file. Update this file with your database credentials.

## Migrations / Seeding

Running the following command will create all necessary tables and insert all of the standard devices

```bash
# migrations and seeding
$ npm run migration:run
```

To automatically undo changes run

```bash
# undo / revert
$ npm run migration:revert
```

## Deploy

You can make requests to the deployed version of the API here: [Deploy](https://connectlab.up.railway.app)

## API Endpoints

[Deployed version's SWAGGER documentation](https://connectlab.up.railway.app/api)

```bash

# Authentication Endpoints

POST
/auth/register
POST
/auth/login



# Users Endpoits (JWT Protected)

GET - unavailable in deployed version - /users

GET - /users/{userId}

PATCH - /users/{userId}

PUT - /users/{userId}

DELETE - /users/{userId}

PATCH - /users/block/{userId}

PATCH - /users/unblock/{userId}



# Devices Endpoints (JWT Protected)

POST - unavailable in deployed version - /devices

GET - /devices

GET - /devices/{id}

PUT - unavailable in deployed version - /devices/{id}

DELETE - unavailable in deployed version - /devices/{id}



# User-Device Endpoints (JWT Protected)

POST - /user-devices/{userId}

GET - /user-devices/{userId}

GET - unavailable in deployed version - /user-devices

GET - /user-devices/details/{userDeviceId}

PATCH - /user-devices/{userDeviceId}

PUT - /user-devices/{userDeviceId}

DELETE - /user-devices/{userDeviceId}

```

## Error Handling

Error handling is done using the built-in NestJs exception filters. Any unhandled errors will return a 500 status code with a JSON response containing the error message.

## Author

- Samuel Haro - [LinkedIn](https://www.linkedin.com/in/samuel-haro-b14551236/)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
