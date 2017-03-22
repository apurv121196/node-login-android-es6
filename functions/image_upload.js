'use strict';

'use strict';

const fs = require('fs');
const dirname = "/home/swachh-bharat/file-upload";
exports.uploadImage = (req) => 
	new Promise((resolve, reject) => {

		console.log("debug !");
		const newPath = dirname + "/uploads/" + req.files.image.originalFilename;
		fs.readFile(req.files.image.path)
			.then(data => {
				fs.writeFile(newPath,data)
					.then(() => resolve({status:200,message:"Uploaded Successfully !"}))
					.catch(err => reject({status:500,message:"Internl server Error !"}));
			})
			.catch(err => reject({status:500,message:"Internal Server Error !"}));
	});

exports.retrieveImage = req => 
	new Promise((resolve,reject) => {
		const file = req.params.file;
		fs.readFileSync(dirname+"/uploads/"+file)
			.then(img => resolve({status:200,message:"Fetched Image !","data":img}))
			.catch(err => reject({status:500,message:"Error reading file !"}));
	});