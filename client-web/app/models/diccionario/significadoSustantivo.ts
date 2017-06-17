import { Significado } from "./significado";

export class SignificadoSustantivo extends Significado {

	constructor(
        public significado: String,
        public caracArgumental: String[],
	){
        super(significado);
        this.caracArgumental=null;
    }
}