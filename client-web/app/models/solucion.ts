import {Ficha} from '../models/ficha';

export class Solucion{

    public _id: String;
    public id_actividad: String;
    public id_alumno: String;
    public nombreAlumno: String;
    public id_ejercicios: String[];
    public calificacion: number[];
    public msgCalificacion: String[];
    public respuesta: String[];
    public notaFinal: number;
    public terminado: Boolean;
    
    
    constructor(){
        this._id="";
        this.terminado=false;
        this.calificacion=new Array();;
        this.respuesta=new Array();
        this.msgCalificacion=new Array();
        this.id_actividad=null;
        this.id_alumno=null;
        this.notaFinal=0;
        this.nombreAlumno=null;
    }
}