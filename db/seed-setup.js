const fs = require('fs');
const readline = require('readline');
const path = require('path');
const parseLine = require('./parse-line');

let myInterface = readline.createInterface({
  input: fs.createReadStream(path.resolve('./db/assignment_tweet.txt'))
})

module.exports = function(done) {
  let multiLineTweet = "";
  let lineCount = 0;
  let tweetJSON = {
    tweets: []
  };
  
  myInterface.on('line', (line) => {
    // skip first two lines
    if(lineCount > 1) {
      if (line.length < 169) {
        multiLineTweet += (line + '\n');
        if(multiLineTweet.length === 170) {
          tweetJSON.tweets.push(parseLine(multiLineTweet))
          multiLineTweet = "";
        }
      } else {
        tweetJSON.tweets.push(parseLine(line));
      }
    } else {
      lineCount++
    }
  });
  
  myInterface.on('close', ()=> {
    // write out the JSON to a seed file
    let json = JSON.stringify(tweetJSON) + '\n';
    fs.writeFileSync(path.resolve('./db/seeds/tweets.json'), json);
    console.log("Wrote ", tweetJSON.tweets.length, " entries to file.");
    done();
  })
}
