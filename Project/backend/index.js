'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

 var cors = require('cors')

 app.use(cors())


const mongoose = require("mongoose");
// const axios = require('axios');

app.listen(3001, () => console.log('webhook is listening'));



require('./db')();
const router = require('./routes/index');
// require("./telegram/telegram");




app.use("/", router);