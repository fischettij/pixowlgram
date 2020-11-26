# Technologies

## Node dependencies

- bcrypt: For encipt and compare user password.
- cors: Enable cors for browsers (configured for any domain)
- dotenv: Manage many .env files.
- express: Web server.
- express-paginate: Parse query parameters to paginate responses.
- express-routes: Print routes un development mode.
- express-validator: Requests validations middelware.
- http-status-codes: Constants enumerating the HTTP status codes.
- jsonwebtoken: Sign and verify tokens.
- morgan: Logger.
- multer: Used for upload images.
- sequelize: SQL ORM (postgres in production, sqlite in dev and memory for tests)

## Database

For this MVP use SQL databases.
Choosed SQL for my knowledge with this paradigm and my experience using sequelize (SQL ORM).
I would have preferred to use MongoDB (or some other document database) to exploit horizontal scale and faster access times.Don't use mongo because of the times I had available to perform the MVP
