# Budget app
Store your real life shopping receipts. Analyze your spendings.

## Technologies and Services
* NextJS - Application framework 
* Firebase - Authentication service
* Postgresql - Database

## Requirements
* NodeJS(Javascript runtime) --
* Yarn(Nodejs package manager) -- Used in development, not tested with other package managers
* Docker

## Setup
- (All the following commands should be ran from root folder)
- Run `yarn install`
- Run `docker compose up -d` to create services via docker
- Run `yarn migrations` to update database schema
- Run `yarn seed` to seed the database
- Run `yarn dev` to run application in development mode
