const Tweet = require('../models/tweet');

module.exports.search = (string, callback) => {
  Tweet.find( { $text: { $search: "equipment" } }, (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result);
    }
  } )
}