import {Ficha} from '../models/ficha';

export class Solucion{

    public _id: String;
    public id_actividad: any={};
    public id_alumno: String;
    public id_ejercicios: String[];
    public calificaciones: number[];
    public msgCalificaciones: String[];
    public respuestas: String[];
    public notaFinal: number;
    public nivel: String;
    public terminado: Boolean;
    public profesor: String;
    
    
    constructor(){
        this._id="";
        this.terminado=false;
        this.calificaciones=new Array();;
        this.respuestas=new Array();
        this.msgCalificaciones=new Array();
        this.id_actividad=null;
        this.id_alumno=null;
        this.nivel="";
        this.notaFinal=0;
        this.profesor="";
    }
}