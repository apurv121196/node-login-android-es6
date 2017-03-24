'use strict';
const fs = require('fs');
const dirname = "/home/swachh-bharat/file-upload";
exports.uploadImage = (req) => 
	new Promise((resolve, reject) => {
		const fstream;
		req.pipe(req.busboy);
		 req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
	});

exports.retrieveImage = req => 
	new Promise((resolve,reject) => {
		const file = req.params.file;
		fs.readFileSync(dirname+"/uploads/"+file)
			.then(img => resolve({status:200,message:"Fetched Image !","data":img}))
			.catch(err => reject({status:500,message:"Error reading file !"}));
	});