export class Favorito{

	constructor(
		//El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
		public _id: string,
		public title: string,
		public description: string,
		public url: string
	){}
}