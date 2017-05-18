import {Ficha} from '../models/ficha';

export class Solucion{

    public _id: String;
    public id_actividad: String;
    public id_alumno: String;
    public id_ejercicios: String[];
    public calificaciones: number[];
    public msgCalificaciones: String[];
    public respuestas: String[];
    public notaFinal: number;
    public terminado: Boolean;
    
    
    constructor(){
        this._id="";
        this.terminado=false;
        this.calificaciones=new Array();;
        this.respuestas=new Array();
        this.msgCalificaciones=new Array();
        this.id_actividad=null;
        this.id_alumno=null;
        this.notaFinal=0;
    }
}