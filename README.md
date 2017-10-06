### Instructions:

## Setup:

Copy the full raw text file as `assignment_tweet.txt` into the db/ folder.

Start your MongoDB server: `mongod`

## Seed the database

A migration generates a JSON file from the raw text, creates a database called `twitter` and seeds it with data.
Run the migration with:

`node ./node_modules/mongodb-migrate -runmm -dbc '{ "host":"localhost","db":"twitter","port":27017}' up`

## Running the server

Install dependencies by running `yarn` inside the repository.
Then, start the server:

`yarn start`

Open <http://localhost:3000> in your browser to use the application.

## Roll back the database

To roll back the migration, run:

`node ./node_modules/mongodb-migrate -runmm -dbc '{ "host":"localhost","db":"twitter","port":27017}' down`