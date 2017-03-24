'use strict';
// require('ssl-root-cas').inject();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const router = express.Router();
const port = process.env.PORT || 8080;

// var multer  = require('multer');

app.use(bodyParser.json());

app.use(logger('dev'));



require('./routes')(router);
app.use('/api/v1',router);

app.listen(port);

console.log(`App runs on ${port}`);