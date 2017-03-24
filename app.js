'use strict';
// require('ssl-root-cas').inject();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const router = express.Router();
const port = process.env.PORT || 8080;

var multer  = require('multer');

app.use(bodyParser.json());

app.use(logger('dev'));

app.use(multer({ 
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    },
    onFileUploadStart: function (file) {
        console.log(file.fieldname + ' is starting ...')
    },
    onFileUploadData: function (file, data) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));

require('./routes')(router);
app.use('/api/v1',router);

app.listen(port);

console.log(`App runs on ${port}`);