'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = Schema({

    alias: String,
	nombre: String,
	apellidos: String,
    password: String,
	dni: String,
    email: String,
    fecha_nacimiento: Date,
    institucion_educativa: String,
    role: String,

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports= mongoose.model('User', UserSchema, 'users');