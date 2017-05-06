'use strict'

var express = require('express');
var DiccionarioController =  require('../controllers/diccionario');
var api = express.Router();


api.get('/saveDiccionario', DiccionarioController.saveDiccionario);
api.get('/getDiccionario', DiccionarioController.getDiccionario);


module.exports = api;