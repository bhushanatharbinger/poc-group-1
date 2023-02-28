# Lambda Layers Example

This project use the Serverless Framework to create a microservices architecture with AWS Lambda Layers.

# Dependencies

- Node.JS 14
- Serverless

## Installation

In the root folder install the dependencies using the command `npm i` (_Node version v14.x_).
# Setup

follow following instructions:

1. Install [node.js 14](https://nodejs.org/en/) and [Serverless](https://www.npmjs.com/package/serverless)
2. run `serverless plugin install --name  serverless-offline`
3. Run `npm start` in the root folder of this project, this will run lamda endpoints in localhost to test. 
4. Configure AWS Account in [AWS CLI](https://aws.amazon.com/de/cli/)
5. Run `serverless deploy` in the root folder of this project, this will deploy the dependency layer. 
4. Checkout Lambda created by serverless in the AWS Console

# Sequelize Migrations

Migration in Sequelize is a javascript file which exports two functions, up and down, that dictates how to perform the migration and undo it. You define those functions manually, but you don't call them manually; they will be called automatically by the CLI

To install the Sequelize CLI:

`npm install --save-dev sequelize-cli`

To add new table/model migration 
`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

Running Migrations
`npx sequelize-cli db:migrate`

Undoing Migrations
`npx sequelize-cli db:migrate:undo`
`npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`

New Custom migration 
`npx sequelize-cli migration:generate --name migration-skeleton`

# Serverless

## Getting started

