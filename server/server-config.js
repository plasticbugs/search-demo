const express = require('express');
const app = express();
const path = require('path');
const db = require('../db-config');

const search = require('./controllers/tweets').search

  // } else if (fixLine.length === 169) {
  //   console.log(fixLine);
  //   fixLine = "";
  // } else {
  //   // console.log(line.slice(20,160));
  //   console.log("hey")
  // }

// }) 

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../public/index.html'));
});

app.get('/api/search', (req, res) => {
  let data = {created_at: new Date(), text: "hello this is a tweet.", user_id: "plasticbugs"};
  search(data, (err, tweet) => {
    res.send(tweet);
  })
})

module.exports = app;