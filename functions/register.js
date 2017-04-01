'use strict';
 
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
exports.registerUser = (name, email, password) => 
 
    new Promise((resolve,reject) => {
 		const imgId = mongoose.Types.ObjectId();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new user({
 
            name: name,
            email: email,
            img:"",
            hashed_password: hash,
            created_at: new Date()
        });
 
        newUser.save()
 
        .then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))
 
        .catch(err => {
 
            if (err.code == 11000) {
 
                reject({ status: 409, message: 'User Already Registered !' });
 
            } else {
 
                reject({ status: 500, message: 'Internal Server Error !' });
            }
        });
    });