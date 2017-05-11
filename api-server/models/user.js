'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({

    username: String,
    password: String,
    email: String,
    name: String,

});

module.exports= mongoose.model('User', UserSchema, 'users');