import {Ejercicio} from '../models/ejercicio';
export class Actividad{

    public _id: string;
    public titulo: string;
    public id_profesor: String;
    public profesor: String;
    public fecha_creacion: Date;
    public nivel: String;
    public ejercicios: any[];
    public visible: Boolean;
    public propuesta: Boolean;
    public fecha_prop_fin: Date;
    public marcado: boolean;
	constructor(){
        this.titulo="";
        this.id_profesor="";
        this.profesor="";
        this.fecha_creacion=null;
        this.nivel="";
        this.ejercicios=[];
        this.visible=false;
        this.propuesta=false;
        this.fecha_prop_fin=null;
        this.marcado=null;
    }
}