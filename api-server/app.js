//Toda la configuracion de express, de las rutas...
'use strict'


//Importamos express de otro
var api = require('./routes/ejercicio'); //carga todo lo que haya en el fichero de rutas
var api2= require('./routes/actividad');
<<<<<<< HEAD
var api3= require('./routes/diccionario');
=======
var apiProfesor= require('./routes/profesor');
>>>>>>> d9402544b3624ed31f9438c3fe684b0fe04257ee

var bodyParser= require('body-parser'); //Esto es un midelware que se carga antes de nuestro script
var express= require('express'); 

var app= express();//Con esto ya podemos trabajar con express

//configuramos el body-parser
app.use(bodyParser.urlencoded({extended:false})); //llama a otro metodo para que express lo reciba
app.use(bodyParser.json());

//Configuracion para el uso de cabeceras
app.use((req, res, next) =>{

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('ccess-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');

	//Esto es para que se salga de la funcion y siga
	next();
});

app.use('/api', api);//Lo cargamo dentro de express. El primer parametro es el prefijo que se va a usar para todas las rutas. El segundo es el objeto qyue se va a cargar: api
<<<<<<< HEAD
app.use('/api', api2);
app.use('/api', api3);//diccionario
=======
app.use('/api2', api2);
app.use('/apiProfesor', apiProfesor);
>>>>>>> d9402544b3624ed31f9438c3fe684b0fe04257ee
//Con esto permitimos que este modulo sea importado con require en otros modulos
module.exports= app;