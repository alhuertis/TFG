export class Actividad{

	constructor(
		//El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
		// _id: String,
        public id_profesor: String,
        public profesor: String,
        public fecha_creacion: Date,
        public nivel: String,
        public ejercicios: String[]
	){}
}