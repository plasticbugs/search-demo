const Tweet = require('../models/tweet');
const moment = require('moment');
const removeAccents = require('remove-accents');

module.exports.search = (req, res) => {
  let sanitizedSearch = removeAccents(req.query.q);
  Tweet.find( { $text: { $search: sanitizedSearch, $diacriticSensitive: false } }, {score : { $meta: "textScore" } } )
    .sort( { score: { $meta: "textScore" } } )
    .lean()
    .exec( ( err, result ) => {
    if(err) {
      console.log("There was a database error: ", err);
      res.status(500).send({ error: 'Something went wrong.' });
    } else {
      let formattedResult = result.map( tweet => {
        tweet.formatted_date = moment(tweet.created_at, "YYYYMMDD").fromNow();
        delete tweet.searchableText;
        return tweet;
      });
      res.send(formattedResult);
    }
  });
}
