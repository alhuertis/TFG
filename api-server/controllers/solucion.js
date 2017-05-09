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


//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getSolucion,

}