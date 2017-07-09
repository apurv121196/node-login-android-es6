const mongoose = require('mongoose');
'use strict';

const user = require('../models/user');

exports.add=(city,id) => {
	user.findOneAndUpdate({city:city,category:"municipal"},{$push:{"complaintId":id}},(err,done) => {
		if(err) reject({status:500,message:"Error h bhiya !"});
		else resolve({status:200,message:"Done ho gya bhiya !"});
	});
}