var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  created_at: Date,
  text: String,
  user_id: String
});

module.exports = mongoose.model('Tweet', tweetSchema);