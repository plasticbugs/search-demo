var mongodb = require('mongodb');
var tweetData = require('../seeds/tweets.json');

exports.up = function(db, next){
  var tweets = db.collection('tweets');
  tweets.insertMany(tweetData.tweets);
  tweets.createIndex( { text: 'text' } );
  next();
};

exports.down = function(db, next){
  var tweets = db.collection('tweets');
  tweets.deleteMany({})
  next();
};
