require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const axios = require('axios');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
    console.log(`running server on port ${port}`);
})
