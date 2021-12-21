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




## Steps to run
1. make config changes in config/env/development.json5.sample and config/env/production.json5.sample
2. run npm install
3. run npm install pm2 -g
4. run pm2 start pm2-ecosystem.json --env development

