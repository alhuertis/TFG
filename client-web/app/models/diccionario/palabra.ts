import { Significado } from "./significado";
export class Palabra{

	constructor(
        public id: String,
        public lema: String,
        public categoria: String,
        public significados: Significado[],
	){
        this.id="";
        this.lema="";
        this.categoria="";
        this.significados=null;
    }
}