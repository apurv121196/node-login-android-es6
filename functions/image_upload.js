'use strict';
const fs = require('fs');
const dirname = "/home/swachh-bharat/file-upload";
const multer = require('multer');
var upload = multer({ dest: '/tmp/'});
exports.uploadImage = (req) => 
	new Promise((resolve, reject) => {
		var file = __dirname + '/' + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename
      });
    }
  });
	});

exports.retrieveImage = req => 
	new Promise((resolve,reject) => {
		const file = req.params.file;
		fs.readFileSync(dirname+"/uploads/"+file)
			.then(img => resolve({status:200,message:"Fetched Image !","data":img}))
			.catch(err => reject({status:500,message:"Error reading file !"}));
	});