# Advanced Notes Platform

A notes application with more comprehensive features, either already implemented or planned. This project was built using
the following main technologies:

- Express
- TypeScript
- CSS (vanilla)
- EJS
- MySQL

## Docker

As this project depends on MySQL, I have created a `docker-compose.yaml` file for the sole purpose of spinning up a database for this
application to work with. If you would like to use a separate service (ex: MySQL installed on your local computer, DigitalOcean, PlanetScale, etc.),
you may do so. If your particular service allows, I have an initialization file located under `.db/db-init.sql` that will create the database and
its tables. Otherwise, if you plan on using Docker as I did here, ignore everything I just said as we will install it through there.

## Node

You should be able to use the most current LTS version of Node.js with this project.

## Getting Started

Firstly, rename `.env.example` to `.env` and provide the proper credentials to your MySQL database. (NOTE: If you're not using Docker you
may delete MYSQL_CONTAINER_NAME). Next, go to `.src/env.example.ts` and provide the exact same credentials to DB_USER, DB_PASSWORD, and DB_DATABASE
as you have within the other `.env` file. Your DB_HOST will be whatever the name of your server's host is (ex: localhost). You may ignore
PUBLIC_KEY and PRIVATE_KEY as that was when I was working with JWT originally (but you're welcome to use it if you'd like). Similar to the other `.env` file,
rename `.src/env.example.ts` to `.src/env.ts`

### Install All NPM Dependencies

Let's start off by installing all NPM dependencies:

>npm install

### Install the Database

Next, let's install the MySQL database. If you're using Docker, it's as simple as going into the project and running:

>docker-compose up

or

>docker-compose up -d

if you would like to run your container in detached mode.

### Start the Server

To start the server, run:

>npm run devStart

within your command line interface. This will start the application on port 7001, or whatever you set the SERVER_PORT number
to within `.src/env.ts`

### More Coming Soon!

More features to be added in the future. Some files may have functions/methods that have yet
to be implemented, but I plan to later on.

