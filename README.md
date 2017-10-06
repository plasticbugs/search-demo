To run this application:

1. Replace `example.raw.txt` with the full raw text file

To start the server:

`yarn start`

Then, open <http://localhost:3000> in your browser

A JSON file has already been generated from the raw data in the repo. To regenerate the JSON which is used to seed the database, run:

`node run seed-setup`

Once the JSON has been generated, seed the local database with Tweets by running:

`node ./node_modules/mongodb-migrate -runmm -dbc '{ "host":"localhost","db":"twitter","port":27017}' up`

To roll back the migration, run:

`node ./node_modules/mongodb-migrate -runmm -dbc '{ "host":"localhost","db":"twitter","port":27017}' down`