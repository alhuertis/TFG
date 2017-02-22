//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var FavoritoController = require('../controllers/favorito');

//Cargamos el router de express
var api= express.Router();


api.get('/prueba/:nombre?', FavoritoController.prueba); //Con esto puedo dirigir al controlador cuando llamemos a prueba.
api.get('/favorito/:id', FavoritoController.getFavorito); //Con esto puedo dirigir al controlador cuando llamemos a favrito.
api.get('/favoritos', FavoritoController.getFavoritos);
api.post('/favorito', FavoritoController.saveFavorito);
api.put('/favorito/:id', FavoritoController.updateFavorito);
api.delete('/favorito/:id', FavoritoController.deleteFavorito);

module.exports= api;