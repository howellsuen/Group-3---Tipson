const http = require('http');

const express = require('express');
const server = require('express-static')
const app = express();

const events = require('events');
const util = require('util');



app.get('/', function (req, res) {
    res.send(__dirname + 'index.html');
});

app.listen(8080);
