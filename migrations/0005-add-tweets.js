var mongodb = require('mongodb');
var tweetData = require('../seeds/tweets.json');

exports.up = function(db, next){
  var tweets = db.collection('tweets');
  console.log(tweetData.tweets.length);
  tweets.insert(tweetData.tweets);
  tweets.createIndex( { searchableText: 'text' } );
  next();
};

exports.down = function(db, next){
  var tweets = db.collection('tweets');
  tweets.deleteMany({})
  next();
};
