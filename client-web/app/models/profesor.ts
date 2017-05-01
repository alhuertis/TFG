export class Profesor{

	constructor(
        public _id: String,
        public nombre: String,
        public apellidos: String,
        public dni: String,
        public fecha_creacion: Date,
        public institucion_educativa: String,
        public email: String,
	){
        this._id="";
        this.apellidos="";
        this.email="";
        this.fecha_creacion=null;
        this.institucion_educativa="";
        this.nombre="";
        this.dni="";
    }
}