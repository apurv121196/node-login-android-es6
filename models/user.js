'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = mongoose.Schema({
	name: String,
	email:String,
	img:String,
	hashed_password:String,
	created_at:String,
	temp_password: String,
	temp_password_time:String
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login');
// mongoose.connect('mongodb://apurv121196:n12khan17@ds135680.mlab.com:35680/mydb');

module.exports = mongoose.model('user',userSchema);