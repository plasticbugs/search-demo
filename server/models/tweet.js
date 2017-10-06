var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');

var tweetSchema = new Schema({
  created_at: Date,
  text: String,
  user_id: String,
  searchableText: String
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

module.exports.search = (query, callback) => {
  Tweet.find( { $text: { $search: query, $diacriticSensitive: false } }, {score : { $meta: 'textScore' } } )
  .sort( { score: { $meta: 'textScore' } } )
  .lean()
  .exec( ( err, result ) => {
    if(err) {
      callback(err);
    } else {
      let formattedResult = result.map( tweet => {
        let formatted_date = moment(tweet.created_at, 'YYYYMMDD').fromNow();
        let formattedTweet = {
          user_id: tweet.user_id,
          created_at: formatted_date,
          text: tweet.text
        }
        return formattedTweet;
      });
      callback(null, formattedResult);
    }
  });
}
