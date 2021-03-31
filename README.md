# test-task-express-app

## Setup
* Copy `.env-example` file into `.env`
* Run `npm install`
* Run `docker-compose up -d`

## Testing
Use the `postman_collection.json` file to testing endpoints manually.

Or just launch automated tests from the root:
```
docker-compose down
npm test
```
