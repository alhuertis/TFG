
export class CriteriaActividades{

    public user : String;
    public titulo: String;
    public nivel: String;
    public propuesta: Boolean;
    public visible: Boolean;
    public desde: Date;
    public hasta: Date;
    public fecha_propuesta: Date;
    
    
    
    constructor(){
        this.user="";
        this.titulo=null;
        this.nivel=null;
        this.desde=null;
        this.hasta=null;
        this.propuesta=null;
        this.visible=null;
        this.fecha_propuesta=null;
      
    }
}