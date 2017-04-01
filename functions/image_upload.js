'use strict';
const fs = require('fs');
const dirname = "/home/swachh-bharat/file-upload";
const user = require('../models/user');

exports.uploadImage = (req) => 
	new Promise((resolve, reject) => {
		console.log(JSON.stringify(req.file));
		// console.log('inside '+util.inspect(myObject, false, null));
		var file = __dirname + '/' + req.file.filename + '.jpg';
		console.log(file+'###');
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      // res.send(500);
      reject({status:500,message:'Error h bhiya !'});
    } else {
      // res.json({
      //   message: 'File uploaded successfully',
      //   filename: req.file.filename
      // });
      console.log('RENAME IS SUCCESS !');
      const id = req.params.id;
      user.find({email:id})
      	.then(users => {
      		let user = users[0];
      		user.img=req.file.filename+'.jpg';
      		return user.save();
      	})
      	.then(user => resolve({status:200, message: 'Image uploaded successfully !'}))
		.catch(err => reject({status:500, message: 'Internal Server Error !'}));
      // resolve({status:200,message:'Uploaded Successfully !'});
    }
  });
	});

exports.retrieveImage = req => 
	new Promise((resolve,reject) => {
		const file = req.params.file;
		console.log('inside retrieve !'+file);
		fs.readFileSync(__dirname+"/"+file)
			.then(img => resolve({status:200,message:"Fetched Image !"}))
			.catch(err => reject({status:500,message:"Error reading file !"}));
	});

exports.uploadJson = (req) => 
	new Promise((resolve, reject) => {
		console.log(JSON.stringify(req.file));
		// console.log('inside '+util.inspect(myObject, false, null));
		var file = __dirname + '/' + req.file.filename + '.json';
		console.log(file+'###');
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      // res.send(500);
      reject({status:500,message:'Error h bhiya !'});
    } else {
      // res.json({
      //   message: 'File uploaded successfully',
      //   filename: req.file.filename
      // });
      console.log('RENAME IS SUCCESS !');
      // const id = req.params.id;
      
      // resolve({status:200,message:'Uploaded Successfully !'});
    }
  });
	});