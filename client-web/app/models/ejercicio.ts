export class Ejercicio{

	constructor(
		//El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
		public id_profesor: String,
		public _id: String,
		public titulo: string,
		public nivel: string,
		public tipo: number,
		public autor: string,
		public institucion_profesor: string,
		public fechaCreacion: Date,
		public fechaModificacion: Date,
		public enunciado: string,
		public fraseATraducir: string,
		public solucionFLogico: string,
		public solucionFPatron: string,
		public solucionPEspanol: string,
		public solucionPLatin: string
	){}
}