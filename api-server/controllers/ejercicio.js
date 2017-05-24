//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'
//mi comentario d emierda!!!!
var Ejercicio= require('../models/ejercicio')


//Recuperar un ejercicio
function getEjercicio(req, res){

	var ejercicioId= req.params.id;

	Ejercicio.findById(ejercicioId, function(err, ejercicio){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}
		else{

			if(!ejercicio){
				res.status(404).send({message:'No hay ejercicio'});	
			}
			else{
				res.status(200).send({ejercicio});
			}

		
		}
	});	
}

function getEjercicioNombre(req, res){

	var ejercicio= req.params.titulo;

	Ejercicio.find({titulo:{$regex : ".*"+ejercicio+".*"}}, function(err, ejercicio){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}
		else{

			if(!ejercicio){
				res.status(404).send({message:'No hay ejercicio'});	
			}
			else{
				res.status(200).send({ejercicio});
			}

		
		}
	});	
}

function getEjercicios(req, res){

	Ejercicio.find({}).sort('-_id').exec((err, ejercicios)=>{
		if(err){
			res.status(500).send({message:'Error al devolver los ejercicios'});
		}
		else{

			if(!ejercicios){
				res.status(404).send({message:'No hay ejercicios'});
			}
			else{
				res.status(200).send({ejercicios});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function getEjerciciosFecha(req, res){

console.log(req.body);
var fecha1= req.body.fecha1;
var fecha2= req.body.fecha2;
	Ejercicio.find({fechaCreacion:{$gte:fecha1, $lte:fecha2}}).sort('-_id').exec((err, ejercicios)=>{
		if(err){
			res.status(500).send({message:'Error al devolver los ejercicios'});
		}
		else{

			if(!ejercicios){
				res.status(404).send({message:'No hay ejercicios'});
			}
			else{
				res.status(200).send({ejercicios});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function saveEjercicio(req, res){
	var ejercicio= new Ejercicio();

	var params= req.body; //Recoge todos los parametros
	ejercicio.id_profesor= params.id_profesor;
	ejercicio.titulo= params.titulo;
	ejercicio.nivel= params.nivel;
	ejercicio.tipo= params.tipo;
	ejercicio.autor= params.autor;
	ejercicio.institucion_profesor= params.institucion_profesor;
	ejercicio.fechaCreacion= new Date();
	ejercicio.fechaModificacion= new Date();
	ejercicio.enunciado= params.enunciado;
	ejercicio.fraseATraducir= params.fraseATraducir;
	ejercicio.solucionFLogico= params.solucionFLogico;
	ejercicio.solucionFPatron= params.solucionFPatron;
	ejercicio.solucionPEspanol= params.solucionPEspanol;
	ejercicio.solucionPLatin= params.solucionPLatin;

	ejercicio.save((err, ejercicio) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el ejercicio'});
		}
		else{
			res.status(200).send({ejercicio});
		}

	});
}

function updateEjercicio(req, res){
	var ejercicioId= req.params.id;
	var update= req.body; //Recoge todos los parametros

	//Busca un objeto y lo actualiza
	//Recibe el id a actualizar, los datos nuevos y despues una función calback
	Ejercicio.findByIdAndUpdate(ejercicioId, update, (err, ejercicioUpdated) =>{

		if(err)
			res.status(500).send({message: 'Error al actualizar el ejercicio'});
		else
			res.status(200).send({mesagge: 'El ejercicio ha sido modificado',respuesta:'ok',ejercicioUpdated});
	});
	
}

function deleteEjercicio(req, res){

	var ejercicioId= req.params.id;

	Ejercicio.findById(ejercicioId, function(err, ejercicio){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}

		if(!ejercicio){
			res.status(404).send({message:'No hay ejercicio', respuesta: 'ko'});	
		}
		else
			ejercicio.remove(err =>{

			if(err)
				res.status(500).send({message:'Error al borrar el ejercicio', respuesta: 'ko'});
			else
				res.status(200).send({message:'Ejercicio borrado correctamente', respuesta:'ok'});
		})



	});
}

function getEjersMiColeccion(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor}).exec(function(err, miColeccion){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id'});
		}
		else{

			if(!miColeccion){
				res.status(404).send({message:'No hay ejers de tu coleccion'});	
			}
			else{
				res.status(200).send({miColeccion});
			}
		}
	});	
}


function getEjersMiColeccionNivelA(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Avanzado"}).exec(function(err, miColeccionNivelA){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel avanzado'});
		}
		else{

			if(!miColeccionNivelA){
				res.status(404).send({message:'No hay ejers de tu coleccion con nivel Avanzado'});	
			}
			else{
				res.status(200).send({miColeccionNivelA});
			}
		}
	});	
}

function getEjersMiColeccionNivelM(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Medio"}).exec(function(err, miColeccionNivelM){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel medio'});
		}
		else{

			if(!miColeccionNivelM){
				res.status(404).send({message:'No hay ejers de tu coleccion con nivel Medio'});	
			}
			else{
				res.status(200).send({miColeccionNivelM});
			}
		}
	});	
}

function getEjersMiColeccionNivelB(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Bajo"}).exec(function(err, miColeccionNivelB){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel bajo'});
		}
		else{

			if(!miColeccionNivelB){
				res.status(404).send({message:'No hay ejers de tu coleccion con nivel Bajo'});	
			}
			else{
				res.status(200).send({miColeccionNivelB});
			}
		}
	});	
}


function getEjersMiColeccionTipo1(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":1}).exec(function(err, miColeccionTipo1){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 1'});
		}
		else{

			if(!miColeccionTipo1){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 1'});	
			}
			else{
				res.status(200).send({miColeccionTipo1});
			}
		}
	});	
}

function getEjersMiColeccionTipo2(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":2}).exec(function(err, miColeccionTipo2){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 2'});
		}
		else{

			if(!miColeccionTipo2){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 2'});	
			}
			else{
				res.status(200).send({miColeccionTipo2});
			}
		}
	});	
}

function getEjersMiColeccionTipo3(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":3}).exec(function(err, miColeccionTipo3){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 3'});
		}
		else{

			if(!miColeccionTipo3){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 3'});	
			}
			else{
				res.status(200).send({miColeccionTipo3});
			}
		}
	});	
}

function getEjersMiColeccionTipo4(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":4}).exec(function(err, miColeccionTipo4){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 4'});
		}
		else{

			if(!miColeccionTipo4){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 4'});	
			}
			else{
				res.status(200).send({miColeccionTipo4});
			}
		}
	});	
}

//Otras colecciones
function getEjersOtrasColecciones(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}}).exec(function(err, otrasColecciones){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id'});
		}
		else{

			if(!otrasColecciones){
				res.status(404).send({message:'No hay ejers de otras colecciones'});	
			}
			else{
				res.status(200).send({otrasColecciones});
			}
		}
	});	
}


function getEjersOtrasColeccionesNivelA(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "nivel":"Avanzado"}).exec(function(err, otrasColeccionesNivelA){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel avanzado'});
		}
		else{

			if(!otrasColeccionesNivelA){
				res.status(404).send({message:'No hay ejers de otras colecciones con nivel Avanzado'});	
			}
			else{
				res.status(200).send({otrasColeccionesNivelA});
			}
		}
	});	
}

function getEjersOtrasColeccionesNivelM(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "nivel":"Medio"}).exec(function(err, otrasColeccionesNivelM){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel medio'});
		}
		else{

			if(!otrasColeccionesNivelM){
				res.status(404).send({message:'No hay ejers de otras colecciones con nivel Medio'});	
			}
			else{
				res.status(200).send({otrasColeccionesNivelM});
			}
		}
	});	
}

function getEjersOtrasColeccionesNivelB(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "nivel":"Bajo"}).exec(function(err, otrasColeccionesNivelB){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel bajo'});
		}
		else{

			if(!otrasColeccionesNivelB){
				res.status(404).send({message:'No hay ejers de otras colecciones con nivel Bajo'});	
			}
			else{
				res.status(200).send({otrasColeccionesNivelB});
			}
		}
	});	
}


function getEjersOtrasColeccionesTipo1(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "tipo":1}).exec(function(err, otrasColeccionesTipo1){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 1'});
		}
		else{

			if(!otrasColeccionesTipo1){
				res.status(404).send({message:'No hay ejers de otras colecciones de tipo 1'});	
			}
			else{
				res.status(200).send({otrasColeccionesTipo1});
			}
		}
	});	
}

function getEjersOtrasColeccionesTipo2(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "tipo":2}).exec(function(err, otrasColeccionesTipo2){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 2'});
		}
		else{

			if(!otrasColeccionesTipo2){
				res.status(404).send({message:'No hay ejers de otras colecciones de tipo 2'});	
			}
			else{
				res.status(200).send({otrasColeccionesTipo2});
			}
		}
	});	
}

function getEjersOtrasColeccionesTipo3(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "tipo":3}).exec(function(err, otrasColeccionesTipo3){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 3'});
		}
		else{

			if(!otrasColeccionesTipo3){
				res.status(404).send({message:'No hay ejers de otras colecciones de tipo 3'});	
			}
			else{
				res.status(200).send({otrasColeccionesTipo3});
			}
		}
	});	
}

function getEjersOtrasColeccionesTipo4(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":{$ne: id_profesor}, "tipo":4}).exec(function(err, otrasColeccionesTipo4){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 4'});
		}
		else{

			if(!otrasColeccionesTipo4){
				res.status(404).send({message:'No hay ejers de otras colecciones de tipo 4'});	
			}
			else{
				res.status(200).send({otrasColeccionesTipo4});
			}
		}
	});	
}

//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getEjercicio,
	getEjercicios,
	getEjercicioNombre,
	getEjerciciosFecha,
	saveEjercicio,
	updateEjercicio,
	deleteEjercicio,
	getEjersMiColeccion,
	getEjersMiColeccionNivelA,
	getEjersMiColeccionNivelM,
	getEjersMiColeccionNivelB,
	getEjersMiColeccionTipo1,
	getEjersMiColeccionTipo2,
	getEjersMiColeccionTipo3,
	getEjersMiColeccionTipo4,
	getEjersOtrasColecciones,
	getEjersOtrasColeccionesNivelA,
	getEjersOtrasColeccionesNivelM,
	getEjersOtrasColeccionesNivelB,
	getEjersOtrasColeccionesTipo1,
	getEjersOtrasColeccionesTipo2,
	getEjersOtrasColeccionesTipo3,
	getEjersOtrasColeccionesTipo4,


}