# Cypress Automation Framework

Testing framework project for ServeRest application

[Frontend](https://front.serverest.dev/)

[Backend](https://serverest.dev/)

## Pre-requirements

To run this project, you will need:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/)
- NPM
- [Google Chrome](https://www.google.com/intl/en_us/chrome/) (I've used version `131.0.6778.140` while writing this doc)

**Note:** When installing nodejs, NPM is automatically installed too.

## Installation

### Clone the repository

```
git clone https://github.com/BrunoFBarbosa/serve-rest-cypress-tests.git
```

### Dependencies

To install the dependencies, run `npm install` in the project root folder.

```
cd serve-rest-cypress-tests/
npm install
```

## Running The Tests

### Running All Tests

Use `npm run cypress:run:dev` to run all tests in headless mode.

### Running Specific Tests Only

#### UI
`npm run cypress:run:dev:ui`

#### API
`npm run cypress:run:dev:api`

### Running Cypress In Interactive Mode

Use `npm run cypress:open:dev` to open Cypress