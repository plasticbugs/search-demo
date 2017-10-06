const mongodb = require('mongodb');
const seedSetup = require('../db/seed-setup');

exports.up = function(db, next){
  seedSetup(() => {
    let tweetData = require('../db/seeds/tweets.json');
    let tweets = db.collection('tweets');
    tweets.insert(tweetData.tweets);
    tweets.createIndex( { searchableText: 'text' } );
    next();
  })
};

exports.down = function(db, next){
  let tweets = db.collection('tweets');
  tweets.deleteMany({})
  next();
};
