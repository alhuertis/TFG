import {Ficha} from '../models/ficha';
import {SolucionEjercicio} from '../models/solucion-ejercicio';

export class CriteriaSolucion{

    
    public id_actividad: any={};
    public ids_alumnos: String[];
    public desde: Date;
    public hasta: Date;

    public actividad: String;
    public modificacion_desde: Date;
    public modificacion_hasta: Date;
    public nota_desde: Number;
    public nota_hasta: Number;
    public nivel: String;
    public terminado: Boolean;
    public alumno: String;
    
    
    
    constructor(){
       
        this.id_actividad=null;
        this.ids_alumnos=null;
        this.desde=null;
        this.hasta=null;
        this.actividad= null;
        this.modificacion_desde= null;
        this.modificacion_hasta= null;
        this.nota_desde= null;
        this.nota_hasta= null;
        this.nivel= null;
        this.terminado= null;
        this.alumno= null;
      
    }
}