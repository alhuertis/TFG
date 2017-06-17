import { Significado } from "./significado";
import { Argumento } from "./argumento";

export class SignificadoVerbo extends Significado {

	constructor(
        public significado: String,
        public numeroArgumentos: String,
        public argumentos: Argumento[],
        public ejemplo: String,
	){
        super(significado);
        this.numeroArgumentos="";
        this.argumentos=null;
        this.ejemplo="";
    }
}