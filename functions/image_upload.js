'use strict';
const fs = require('fs');
const dirname = "/home/swachh-bharat/file-upload";


exports.uploadImage = (req) => 
	new Promise((resolve, reject) => {
		console.log(JSON.stringify(req.file));
		// console.log('inside '+util.inspect(myObject, false, null));
		var file = __dirname + '/' + req.file.filename;
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
      resolve({status:200,message:'Uploaded Successfully !'});
    }
  });
	});

exports.retrieveImage = req => 
	new Promise((resolve,reject) => {
		const file = req.params.file;
		console.log('inside retrieve !');
		fs.readFileSync(__dirname+"/"+file)
			.then(img => resolve({status:200,message:"Fetched Image !"}))
			.catch(err => reject({status:500,message:"Error reading file !"}));
	});