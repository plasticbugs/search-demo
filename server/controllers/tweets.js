const Tweet = require('../models/tweet');
const removeAccents = require('remove-accents');

module.exports.search = (req, res) => {
  let sanitizedSearch = removeAccents(req.query.q);
  Tweet.search(sanitizedSearch, (err, results) => {
    if(err) {
      console.log("There was a database error: ", err);
      res.status(500).send({ error: 'Something went wrong.' });
    } else {
      res.send(results);
    }
  });
}
