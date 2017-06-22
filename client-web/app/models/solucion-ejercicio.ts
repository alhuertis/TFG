
export class SolucionEjercicio{

    public _id:String; 
    public calificacion: number;
    public msgCalificacion: String;
    public respuesta: String;
    public msgProfesor: String;
    public notaProfesor: number;
    
    
    constructor(){
        this._id="";
        this.calificacion=-1;
        this.respuesta="";
        this.msgCalificacion="";
        this.msgProfesor="";
        this.notaProfesor=-1;
    }
}