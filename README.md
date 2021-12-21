# nagp-unit-testing-assignment
Assignment created for NAGP unit testing workshop

## For configuration of database (you need to make changes for database access in config/migrations.json)
1. create database if not created via command `node_modules/.bin/sequelize  db:create --env development`
2. run migrations to create required tables `node_modules/.bin/sequelize  db:migrate --env development`
2. run seeders to create required init data `node_modules/.bin/sequelize  db:seed:all --env development`


## For configuration of database for running integration tests (you need to make changes for database access in config/migrations.json) (here we will create test database)
1. create database if not created via command `node_modules/.bin/sequelize  db:create --env test`
2. run migrations to create required tables `node_modules/.bin/sequelize  db:migrate --env test`
2. run seeders to create required init data `node_modules/.bin/sequelize  db:seed:all --env test`




## Steps to run service
1. make config changes in config/env/test.json5.sample, config/env/development.json5.sample and config/env/production.json5.sample
2. run npm install
3. run npm install pm2 -g
4. run pm2 start pm2-ecosystem.json --env development

## steps to run test case
1. to run all test cases (unit and integration) run `npm test`
2. to run integration test cases run `npm run test-integration`
3. to make code coverage report run `npm run coverage`


test coverage report can be found at path `nagp_unit_testing/coverage/index.html`
to view the report in browser you can directly open the above mentioned html page in browser