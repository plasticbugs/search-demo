const express = require('express');
const app = express();
const path = require('path');
const db = require('../db-config');
const tweetController = require('./controllers/tweets');

app.use(express.static('public'));

app.get('/api/search', tweetController.search);

module.exports = app;
