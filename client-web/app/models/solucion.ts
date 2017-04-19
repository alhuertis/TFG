import {Ficha} from '../models/ficha';

export class Solucion{

    public id_actividad: String;
    public terminado: Boolean;
    public calificacion: number;
    public respuesta: String;
    public msgCalificacion: String;
    public monovalente: Ficha;
    public bivalente: Ficha;
    public trivalente: Ficha;
    public amarilla: Ficha;
    public azul: Ficha;
    public naranja: Ficha;
    public roja: Ficha;
    public verde: Ficha;

    constructor(){
        this.terminado=false;
        this.calificacion=null;
        this.respuesta="";
        this.msgCalificacion="";
    }
}