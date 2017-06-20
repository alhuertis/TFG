//Toda la configuracion de express, de las rutas...
'use strict'


//Importamos express de otro
var api = require('./routes/ejercicio'); //carga todo lo que haya en el fichero de rutas
var api2= require('./routes/actividad');
var apiProfesor= require('./routes/profesor');
var apiDiccionario= require('./routes/diccionario');
var apiSolucion= require('./routes/solucion');
var apiAuth= require('./routes/auth');

var bodyParser= require('body-parser'); //Esto es un midelware que se carga antes de nuestro script
var express= require('express'); 
var app= express();//Con esto ya podemos trabajar con express
var cors = require('cors');  
var authCtrl = require('./auth');  
var middleware = require('./middleware');

//configuramos el body-parser
app.use(bodyParser.urlencoded({extended:false})); //llama a otro metodo para que express lo reciba
app.use(bodyParser.json());

app.use(cors()); 

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
app.use('/api2', api2);
app.use('/apiProfesor', apiProfesor);
app.use('/apiDiccionario', apiDiccionario);
app.use('/apiSolucion', apiSolucion);
app.use('/apiAuth', apiAuth);
//Con esto permitimos que este modulo sea importado con require en otros modulos

module.exports= app;