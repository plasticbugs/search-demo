var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var tweetSchema = new Schema({
  created_at: Date,
  text: String,
  user_id: String
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

module.exports.search = (query, callback) => {
  console.log(query);
  Tweet.find( { $text: { $search: query, $diacriticSensitive: false } }, {score : { $meta: "textScore" } } )
  .sort( { score: { $meta: "textScore" } } )
  .lean()
  .exec( ( err, result ) => {
    if(err) {
      callback(err);
    } else {
      console.log(result.length);
      let formattedResult = result.map( tweet => {
        tweet.formatted_date = moment(tweet.created_at, "YYYYMMDD").fromNow();
        delete tweet.searchableText;
        return tweet;
      });
      callback(null, formattedResult);
    }
  });
}
