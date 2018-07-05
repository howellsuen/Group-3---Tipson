const express = require('express');
const server = require('express-static')
const app = express();

const events = require('events');
const util = require('util');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080);