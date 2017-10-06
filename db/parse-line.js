var Tweet = require('../server/models/tweet');
const removeAccents = require('remove-accents');

module.exports = function(line) {
  let created_at = new Date(line.slice(0,19));
  let user_id = line.slice(161, line.length).trim();
  let text = line.slice(20, 161).trim();
  let searchableText = removeAccents(text);
  
  return {
    created_at,
    user_id,
    text,
    searchableText
  }
}
