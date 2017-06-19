import {Ficha} from '../models/ficha';
import {SolucionEjercicio} from '../models/solucion-ejercicio';

export class Solucion{

    public _id: String;
    public id_actividad: any={};
    public id_alumno: String;
    public ejercicios:SolucionEjercicio[] /*String[]*/;
    public calificaciones: number[];
    public msgCalificaciones: String[];
    public respuestas: String[];
    public notaFinal: number;
    public nivel: String;
    public terminado: Boolean;
    public profesor: String;
    public ultima_modificacion: Date;
    
    
    constructor(){
        this._id="";
        this.terminado=false;
        this.calificaciones=new Array();
        this.respuestas=new Array();
        this.msgCalificaciones=new Array();
        this.id_actividad=null;
        this.id_alumno=null;
        this.nivel="";
        this.notaFinal=0;
        this.profesor="";
        this.ejercicios= new Array();
        this.ultima_modificacion= null;
    }
}