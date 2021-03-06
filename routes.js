'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

var multer = require('multer');
const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');
const img_upload = require('./functions/image_upload');
const fun = require('./functions/fun');
const newsfeed = require('./functions/newsfeed');

module.exports = router => {
	var upload = multer({dest: './uploads/'});

	router.get('/',(req,res) => res.end('Welcome to AKSAK !'));
	router.post('/authenticate',(req,res) => {
		const credentials = auth(req);

		if(!credentials) {
			res.status(404).json({message: 'Invalid Request !'});
		} else {
			login.loginUser(credentials.name, credentials.pass)
			.then(result => {
				const token = jwt.sign(result,config.secret, { expiresIn: 1440});
				res.status(result.status).json({message: result.message, token: token});
			})
			.catch(err => res.status(err.status).json({message: err.message}));
		}
	});

	router.post('/users', (req,res) => {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		// console.log(name+" "+email+password);
		if(!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
			res.status(400).json({message: 'Invalid Request !'});
		} else {
			register.registerUser(name,email,password)
			.then(result => {
				console.log('1');
				res.setHeader('Location','/users/'+email);
				res.status(result.status).json({message: result.message});
			})
			.catch(err => res.status(err.status).json({message:err.message }));
		}
	});

	router.get('/users/:id', (req,res) => {
		console.log('AKSAK');
		console.log(req.headers['x-access-token'],'#$%');
		if(!checkToken(req)) {
			console.log('inside');
			profile.getProfile(req.params.id)
			.then(result => res.status(200).json(result))
			.catch(err => res.status(err.status).json({message: err.message}));
		} else {
			res.status(401).json({message: 'Invalid Token !'});
		}
	});

	router.put('/users/:id',(req,res) => {

		if(checkToken(req)) {
			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if(!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {
				res.status(400).json({message: 'Invalid Request !'});
			} else {
				password.changePassword(req.params.id,oldPassword,newPassword)
				.then(result => res.status(result.status).json({message: result.message}))
				.catch(err => res.status(err.status).json({message: err.message}));
			}
		} else {
			res.status(401).json({message: 'Invalid Token !'});
		}
	});

	router.post('/users/:id/password',(req,res) => {
		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;
		console.log(email+" "+token+newPassword+"\n");
		if(!token || !newPassword || !token.trim() || !newPassword.trim()) {
			console.log("#####");
			password.resetPasswordInit(email)
			.then(result => res.status(result.status).json({message: result.message}))
			.catch(err => res.status(err.status).json({message: err.message}));
		}else {
 
            password.resetPasswordFinish(email, token, newPassword)
 
            .then(result => res.status(result.status).json({ message: result.message }))
 
            .catch(err => res.status(err.status).json({ message: err.message }));
        }
	});

	router.post('/users/:id/upload', upload.single('file') ,(req,res) => {
		console.log('in');
		if(!checkToken(req)) {
			console.log("token checked !");
			img_upload.uploadImage(req)
				.then(result => res.status(result.status).json({message:result.message}))
				.catch(err => res.status(err.status).json({message:err.message}));
		} else{
			console.log("wrong Token !")
		}
		// console.log("Manjeet Bhiya !")
		// res.status(200).json({message:"Uploaded Successfully !"});
		// res.send("Done");
		// console.log('files:', req.file);
  //   console.log('body:', req.body);
	});

	router.get('/users/uploads/:file',(req,res) => {
		console.log('AAAAA');
		// if(!checkToken(req)) {
		// 	console.log('inside get !');
		// 	img_upload.retrieveImage(req)
		// 		.then(result => {
		// 			console.log('got RESULT !!!!!!!');
		// 			res.writeHead(200, {'Content-Type': 'image/jpg' });
		// 			res.end(result.data, 'binary');
		// 		})
		// 		.catch(err => res.status(err.status).json({message:err.message}));
		// }
		// else{
		// 	console.log("wrong Token !")
		// }
		// res.writeHead(200, {'Content-Type': 'image/jpg' });
		 res.sendfile('./app/functions/'+req.params.file);
		 // res.sendfile(req.params.file+'.json');
		// res.json();
	});

	router.get('/newsfeed',(req,res) => {
		if(!checkToken(req)) {
			console.log('inside news');
			newsfeed.newsFeed()
				.then(result => res.status(result.status).json(result.result))
				.catch(err => res.status(err.status).json({message:err.message}));
		}
	});

	router.post('/newsfeed',upload.single('file') ,(req,res) => {
		console.log(req.file+'######');
		if(!checkToken(req)) {

			newsfeed.postNewsFeed(req.body.title,req.body.desc,req)
				.then(result => res.status(result.status).json({result:result.message}))
				.catch(err => res.status(err.status).json({message:err.message}));
		}
	});

	router.get('/abcd',(req,res) => {
		console.log('abcd#!@#$');
		fun.func();
	});

	router.post('/users/uploads', upload.single('file') ,(req,res) => {
		console.log("in users/uploads");
		if(checkToken(req)) {
			console.log("token checked !");
			img_upload.uploadImage(req)
				.then(result => res.status(result.status).json({message:result.message}))
				.catch(err => res.status(err.status).json({message:err.message}));
		} else{
			console.log("wrong Token !")
		}
		// console.log("Manjeet Bhiya !")
		// res.status(200).json({message:"Uploaded Successfully !"});
		// res.send("Done");
		// console.log('files:', req.file);
  //   console.log('body:', req.body);
	});

	

	const checkToken = req => {
		const token = req.headers['x-access-token'];
		if(token) {
			try {
				var decoded = jwt.verify(token,config.secret);
				console.log(req.params.email+'   '+decoded.message);
				return decoded.message === req.params.id;
			} catch(err) {
				console.log("decoding error !");
				return false;
				
			}
		} else {
			console.log("no token !");
			return false;
			
		}
	}
}