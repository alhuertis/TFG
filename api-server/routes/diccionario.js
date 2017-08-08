'use strict'

var express = require('express');
var DiccionarioController =  require('../controllers/diccionario');
var api = express.Router();


api.get('/getDiccionario', DiccionarioController.getDiccionario);
api.get('/getPalabra/:palabra', DiccionarioController.getPalabra);
api.post('/uploadDiccionario', DiccionarioController.uploadDiccionario);

module.exports = api;