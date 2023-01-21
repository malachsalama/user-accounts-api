# user-accounts-api

A Node.js server that connects to a MongoDB database and contains the following endpoints:
- /api/users
- /api/users/active-users
- /api/users/:id
- /api/remove-user/:id
- /api/suspend-user/:id
- /api/reactivate-user/:id

## User Data

The user consists of the following data:
- ID (A unique ID generated in the database)
- Name
- Birth date (in yyyy-mm-dd format)
- Email
- Activity status ('active', 'suspended', or 'archived')

## Endpoints

### /api/users

An endpoint for adding a new user that expects the name, birth date (in yyyy-mm-dd format), and email parameters. The unique ID must be generated randomly on the server side. All data must be validated according to the expected format and if the request is not valid, an error will be generated. Users must be at least 18 years old.

### /api/users/:id

An update endpoint that expects the email and ID parameter to update the email of the user. All data must be validated according to the expected format and if the request is not valid, an error will be generated. Only active accounts can be updated.

### /api/users/active-users

Returns the list of active accounts including ID, full name, birth date (in yyyy-mm-dd format), email, and activity status.

### /api/remove-user/:id

Expects an account ID as a parameter and sets the activity status to 'archived'. Only users that are not archived can be removed.

### /api/suspend-user/:id

Expects an account ID as a parameter and sets the activity status to 'suspended'. Only active users can be suspended.

### /api/reactivate-user/:id

Expects an account ID as a parameter and changes the status from suspended to active. Only suspended users can be reactivated.

## Data Validation

All data validation is done in the backend, and if the data received is not in the expected format, the proper error will be returned. Any exceptions and errors will be caught to return a proper message without crashing the server.

## MongoDB

The data is stored in the MongoDB database, all user status codes are separated and referenced in a special collection or document. The proper validations and indexes are defined in the database. All database logic is encapsulated inside the database functions and wrapped into MongoDB transactions when needed. The query calls are sent to the database in a parameterized way to prevent MongoDB injection.

