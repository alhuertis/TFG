//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Profesor= require('../models/profesor');
var User= require('../models/user')


//Recuperar una actividad
function getProfesor(req, res){

	var profesorId= req.params.id_profesor;

	Profesor.findById(profesorId, function(err, profesor){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}
		else{

			if(!profesor){
				res.status(404).send({message:'No hay ejercicio'});	
			}
			else{
				res.status(200).send({profesor});
			}
		}
	});	
}

function saveProfesor(req, res){
	var profesor = new Profesor();
	var params = req.body;
    profesor._id= params._id;
	profesor.nombre = params.nombre;
	profesor.apellidos = params.apellidos;
	profesor.dni = params.dni;
	profesor.email = params.email;
	profesor.fecha_nacimiento = params.fecha_nacimiento;
	profesor.institucion_educativa= params.institucion_educativa;
	
	profesor.save((err, profesorStored)=>{
		if(err){
			res.status(500).send({message:'Error al guardar la actividad'});
			console.log("Error al guardar");
		}
		else{
			res.status(200).send({respuesta: 'ok'});
			console.log("Guardado");
		}
	});


}
function getProfesores(req, res){

	User.find({role: 'profesor'}).sort('-_id').exec((err, profesores)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!profesores){
				console.log('No hay profesores');
				res.status(404).send({message:'No hay profesores'});
			}
			else{
				console.log(profesores);
				res.status(200).send({profesores});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function updateProfesor(req, res) {
	var profesorId = req.params.id;
	var update = req.body;

	Profesor.findByIdAndUpdate(profesorId, update, (err, profesorUpdated) => {

		if (err)
			res.status(500).send({message: "Error al actualizar el profesor"});
		else 
			res.status(200).send({profesorUpdated});
	});
}

function deleteProfesor(req, res) {

	var profesorId = req.params.id;

	Profesor.findById(profesorId, function(err, profesor) {

		if (err)
			res.status(500).send({message: "Error en mongo al borrar el profesor"});
		if(!profesor)
			res.status(404).send({message:'No existe el profesor'});	
		else 
			profesor.remove(err => {
				if(err)
					res.status(500).send({message:'Error al borrar la profesor'});
				else
					res.status(200).send({message:'Profesor borrado correctamente'});
			})
	});
}




//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getProfesor,
	getProfesores,
	saveProfesor,
    deleteProfesor,
    updateProfesor

}