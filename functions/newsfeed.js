'use strict';
const news = require('../models/newsfeed');
const mongoose = require('mongoose');

exports.newsFeed = () => 
	new Promise((resolve, reject) => {
		news.find({})
		.then(khabar => {
			// console.log(khabar+'###');
			// console.log(khabar+'@#$%');
			khabar.sort(function(a, b){
				console.log('#@$%########');
    var keyA = new Date(a.createdAt),
        keyB = new Date(b.createdAt);
    // Compare the 2 dates
    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    return 0;
});
			// console.log(khabar);
			// .then(khabre => {
			// 	console.log(khabre+'@#$%');
			resolve({status:200,result:khabar.slice(0,101)});
			// })
			// .catch(err => reject({status:500,message:"Sorting Error !"}));
		})
		.catch(err => reject({status:500,message:"Internal Server Error !"}));
	});
	


exports.postNewsFeed = (title,desc,imgURL,req) => 
	new Promise((resolve, reject) => {
		console.log(title,desc);

		const id = mongoose.Types.ObjectId();

		const newNews = new news({
		title:title,
		desc:desc,
		imgURL:'news'+id,
		createdAt:new Date(),
		likes:0
	});


	newNews.save()
 
        .then(() => {
        	req.id=imgId;
        	img_upload.uploadImage(req)
				.then(result => res.status(result.status).json({message:result.message}))
				.catch(err => res.status(err.status).json({message:err.message}));
        	resolve({ status: 201, message: 'News Uploaded Sucessfully !' })
    	})
 
        .catch(err => {
 
            if (err.code == 11000) {
 
                reject({ status: 409, message: 'News Already Registered !' });
 
            } else {
 
                reject({ status: 500, message: 'Internal Server Error !' });
            }
        });
	});
	

