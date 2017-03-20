export class Actividad{

	constructor(
		//El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
		 _id: String,
        profesor: String,
        fecha_creacion: Date,
        nivel: String,
       /* ejerciciosPropuestos: [{  
            //Campo de los ejercicios        
            id_profesor: String,
            titulo: String,
            nivel: String,
            tipo: Number,
            autor: String,
            institucion_profesor: String,
            fechaCreacion: Date,
            fechaModificacion: Date,
            enunciado: String,
            fraseATraducir: String,
            solucionFLogico: String,
            solucionFPatron: String,
            solucionPEspanol: String,
            solucionPLatin: String
        }]*/
	){}
}