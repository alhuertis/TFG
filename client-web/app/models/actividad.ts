export class Actividad{

	constructor(
		//El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
		public titulo: String,
        public id_profesor: String,
        public profesor: String,
        public fecha_creacion: Date,
        public nivel: String,
        public ejercicios: String[],
        public visible: Boolean,
        public propuesta: Boolean,
        public fecha_prop_fin: Date

	){}
}