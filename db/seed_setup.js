const fs = require('fs');
const readline = require('readline');
const path = require('path');
const parseLine = require('./seed_helpers');

let myInterface = readline.createInterface({
  input: fs.createReadStream(path.resolve('./db/assignment_tweet.txt'))
})

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
  // writeout the JSON to a seed file
  let json = JSON.stringify(tweetJSON);
  fs.writeFileSync(path.resolve('./seeds/tweets.json'), json);
})
