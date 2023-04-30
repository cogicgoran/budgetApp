# AragoK Budget App
Store your real life shopping receipts. Analyze your spendings.

## Technologies and Services
* [NextJS](https://nextjs.org/) - Application framework 
* [Firebase](https://firebase.google.com/) - Authentication service provider
* [Docker](https://www.docker.com/)
* [Postgresql](https://www.postgresql.org/) - Database

## Requirements
* [NodeJS](https://nodejs.org/en) (JavaScript language runtime) -- Used v16.15.0 in development
* [Yarn](https://yarnpkg.com/) (Package manager for nodejs) -- Used in development, not tested with other package managers
* [Docker](https://www.docker.com/)

## Setup
- Run `docker compose up -d` to create necessary services available via docker
- `Optional -` Run `npm install firebase -g` and `firebase emulators:start` - You might be prompted to login in order to start firebase emulators
- (All the following commands should be ran from root folder)
- Run `yarn install`
- Run `yarn migrations` to update database schema
- Run `yarn seed` to seed the database
- Run `yarn dev` to run application in development mode

### Firebase emulator setup
- Requirement(npm package `firebase`);
- Navigate to project root folder in terminal of your choice
- Run `firebase login` and complete the login
- Run `firebase emulators:start`. Make sure your ports mentioned in file `{projectRoot}/firebase.json` are available
