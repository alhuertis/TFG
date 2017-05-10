//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Solucion= require('../models/solucion')


function getSolucion(req, res){

	var solucionId= req.params.id;

	Solucion.findById(solucionId, function(err, solucion){

		if(err){
			res.status(500).send({message:'Error al devolver la solucion'});
		}
		else{

			if(!solucion){
				res.status(404).send({message:'No hay salucion'});	
			}
			else{
				res.status(200).send({solucion});
			}
		}
	});	
}


function saveSolucion(req, res){
	var solucion = new Solucion();
	var params = req.body;
	solucion.id_actividad="59122899cdf9af1fbc43eccf";
	solucion.notaFinal= params.notaFinal;
	solucion.nombreAlumno="Alberto";
	//solucion.id_alumno="59122899cdf9af1fbc43rccf"; (cuando tengamos id de usario se podra meter)
	solucion.id_ejercicios=["5912281bcdf9af1fbc43eccd","59122879cdf9af1fbc43ecce"];
	solucion.calificacion=[2,4];
	solucion.msgCalificacion=["sadsad","fgdfgs"];
	solucion.respuesta=["sadsad","fgdfgs"];
	solucion.terminado= false;

	console.log("Soluciooooonnn: " + solucion.notaFinal);

	solucion.save((err, solucionStored)=>{
		if(err){
			res.status(500).send({message:'Error al guardar la solucion'});
			console.log("Error al guardar");
		}
		else{
			res.status(200).send(solucionStored._id);
			console.log("Guardado");
		}
	});


}
function getSoluciones(req, res){

	Solucion.find({}).sort('-_id').exec((err, soluciones)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las soluciones'});
		}
		else{

			if(!soluciones){
				res.status(404).send({message:'No hay soluciones'});
			}
			else{
				res.status(200).send({soluciones});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}


//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getSolucion,
	getSoluciones,
	saveSolucion,

}