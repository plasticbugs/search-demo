var Tweet = require('../server/models/tweet');

module.exports = function(line) {
  let created_at = new Date(line.slice(0,19));
  let user_id = line.slice(161, line.length).trim();
  let text = line.slice(20, 161).trim();
  
  return {
    created_at,
    user_id,
    text
  }
}