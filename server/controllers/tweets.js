const Tweet = require('../models/tweet');
const moment = require('moment');

module.exports.search = (req, res) => {
  Tweet.find( { $text: { $search: req.query.q } } ).lean().exec( ( err, result ) => {
    if(err) {
      console.log("There was a database error: ", err);
      res.status(500).send({ error: 'Something went wrong.' });
    } else {
      let formattedResult = result.map( tweet => {
        tweet.formatted_date = moment(tweet.created_at, "YYYYMMDD").fromNow();
        return tweet;
      });
      res.send(formattedResult);
    }
  });
}