'use strict'
var DiccionarioController =  require('./controllers/diccionario');
//importamos mongoose
var mongoose= require('mongoose');

//importamos app.js que tiene toda la conf de expres...
var app= require('./app');

//Le vamos a decir por que puerto escuhar, podemos poner cualquiera. El segundo parametro es una funcion de callback
var port= process.env.PORT || 3678;

//Nos conectamos. Primer parametro es la url de mongo donde esta la base de datos. La segunda una funcion flecha que, cuando estemos conectados iniciemos el server de la aplicacion
/*mongoose.connect('mongodb://localhost:27017/tfg', (err,res)=>{*/

mongoose.connect('mongodb://TFGLatino:TFGLatino@127.0.0.1:27017/tfg?authSource=admin', (err,res)=>{ 

	if(err){
		throw err;
	}
	else{


		console.log('Conexion a Mongo correcta');
		DiccionarioController.saveDiccionario();

		app.listen(port, function(){
			console.log("API REST TFG funcionado en http://localhost:"+port);
		});
	}

 
});

