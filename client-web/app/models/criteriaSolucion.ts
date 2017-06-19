import {Ficha} from '../models/ficha';
import {SolucionEjercicio} from '../models/solucion-ejercicio';

export class CriteriaSolucion{

    
    public id_actividad: any={};
    public ids_alumnos: String[];
    public desde: Date;
    public hasta: Date;
    
    
    
    constructor(){
       
        this.id_actividad=null;
        this.ids_alumnos=null;
        this.desde=null;
        this.hasta=null;
      
    }
}