var Tweet = require('../server/models/tweet');
const removeAccents = require('remove-accents');

const DATE_END = 19;
const TEXT_START = 20;
const TEXT_END = 161;
const USERNAME_START = 161;

module.exports = function(line) {
  let created_at = new Date(line.slice(0, DATE_END));
  let user_id = line.slice(USERNAME_START, line.length).trim();
  let text = line.slice(TEXT_START, TEXT_END).trim();
  let searchableText = removeAccents(text);
  
  return {
    created_at,
    user_id,
    text,
    searchableText
  }
}
