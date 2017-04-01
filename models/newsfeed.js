'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = mongoose.Schema({
	title:String,
	desc:String,
	imgURL:String,
	createdAt:String,
	likes:Number
});

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/newsfeed');
// mongoose.connect('mongodb://apurv121196:n12khan17@ds135680.mlab.com:35680/mydb');

module.exports = mongoose.model('newsfeed',newsSchema);