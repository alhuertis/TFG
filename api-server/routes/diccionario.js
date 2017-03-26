'use strict'

var express = require('express');
var DiccionarioController =  require('../controllers/diccionario');
var api = express.Router();


api.get('/', DiccionarioController.saveDiccionario);
api.get('/get', DiccionarioController.getDiccionario);


module.exports = api;