//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit, Input} from '@angular/core';
import{NgForm} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {Actividad} from '../models/actividad';
import {Ejercicio} from '../models/ejercicio';
import {Ficha} from '../models/ficha';
import {Solucion} from '../models/solucion';
import {SolucionEjercicio} from '../models/solucion-ejercicio';
import {User} from '../models/user';

declare var $:any;
import * as _ from 'underscore';

@Component({

	selector: 'resolver-actividad',
	templateUrl: 'app/views/resolver-actividad.html',
	providers: [ActividadService, SolucionService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/styles.css'],
}) 

export class  ResolverActividadComponent implements OnInit{

    id_actividad: string; //Le pasamos el id de actividad a esta variable
    id_solucion: string;
    user: User; //Captura el usuario actual en localStorage

    actividad: Ejercicio[];
    infoActividad: Actividad;
    ejercicio: Ejercicio;
    ejerSel: number;
    anterior: Boolean;
    siguiente: Boolean;
    fraseSplit: String[];
    respuesta: String;
    calificaciones: number[];
    msgCalificacion: String;
    progreso: number;
    calificacionFinal: number;
    
    //Fichas
    monovalente: Ficha;
    bivalente: Ficha;
    trivalente: Ficha;
    amarilla: Ficha;
    azul: Ficha;
    naranja: Ficha;
    roja: Ficha;
    verde: Ficha;

    //Atributos de frase
    argumentos: number;
    verbo: string;
    faseVerbo: Boolean;
    verboMarcado: Boolean;
    srcDraggedPentagono: String;

    //solucion: Array<Solucion>;
    solucion: Solucion;
    resueltos: number; //Para saber el numero de ejers que se han resulto
    terminado: Boolean; //Se ha terminado la actividad

    //Para mensajes de error
    errorMessage: String;

    //Modales
    visibleAnimate: Boolean;
    modalSalir: Boolean;
    modalDiccionario: Boolean;
    modalAyuda: Boolean;
    msgSalir: String;

 
	
	

	constructor(
			private _actividadService: ActividadService,
            private _solucionService: SolucionService, 
            private route:  ActivatedRoute,
            private _router: Router

	){  
        
        let parametros:any = this.route.snapshot.params['id_actividad'];
        parametros= parametros.split('-');
        this.id_actividad= parametros[0];

        if(parametros.length > 1)
            this.id_solucion= parametros[1];
        else
            this.id_solucion="";

        this.actividad=[];
        this.user= JSON.parse(localStorage.getItem('currentUser')).user;
        /*this.actividad=
        [
            {   
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 1",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Traducir la siguiente frase al español",
                "fraseATraducir": "Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
                "solucionPLatin": "",
                "marcado": false 
            },
            {   
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 2",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Traducir toda la frase",
                "fraseATraducir": "Magister sapientiam amat",
                "solucionFLogico": "Nominativo(magister), Acusativo(sapientiam),Verbo(amat)",
                "solucionFPatron": "maestro + ama + sabiduria",
                "solucionPEspanol": "El maestro ama la sabiduría",
                "solucionPLatin": "",
                "marcado": false 
            },
            {   
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 3",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Aprende latin con este ejercicio",
                "fraseATraducir": "Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
                "solucionPLatin": "",
                "marcado": false 
            },
            {   
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 4",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Traduce lo que puedas",
                "fraseATraducir": "Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
                "solucionPLatin": "",
                "marcado": false 
            }
        ];*/

        this.ejercicio= new Ejercicio("","","","",null,"","",null,null,"","","","","","",false);
        this.ejerSel=0;
        
       
        this.calificaciones=[];
        this.solucion=new Solucion();
        this.respuesta="";
        this.msgCalificacion="";
        this.progreso=0;
        this.calificacionFinal=0;
        this.monovalente=new Ficha(false,"0px", "0px");
        this.bivalente= new Ficha(false,"0px", "0px");
        this.trivalente= new Ficha(false,"0px", "0px");
        this.amarilla= new Ficha(false,"", "");
        this.azul= new Ficha(false,"", "");
        this.naranja= new Ficha(false,"", "");
        this.roja= new Ficha(false,"", "");
        this.verde= new Ficha(false,"", "");
        this.argumentos=0;
        this.faseVerbo=false;
        
        this.verboMarcado=false;
        this.srcDraggedPentagono="adios";
        this.resueltos=0;

        this.terminado=false;
        

	
	}


	ngOnInit(){

        this._actividadService.cargarActividad(this.id_actividad).subscribe(
			result =>{
				this.actividad= result.actividad.ejercicios;
                this.infoActividad= result.actividad;
				if(!this.actividad){
					alert('Error en el servidor');
				}else{
                    this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
                    this.verbo= this.extraerVerbo();
                    this.anterior=this.ejerSel >0 ;
                    this.siguiente=this.ejerSel < this.actividad.length -1;

                    for(var i = 0; i < this.actividad.length; i++){
                        this.solucion.ejercicios[i]= new SolucionEjercicio();
                    }
                }
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					alert(this.errorMessage);
				}
			}
		);

        if(this.id_solucion != ""){
            this._solucionService.getSolucion(this.id_solucion).subscribe(

                result=>{
                    this.solucion= result.solucion;
                    if(!this.solucion)
                        alert("No se han podidos cargar los datos de solucion anteriores");
                    else{
                        for(var i= 0; i< this.solucion.ejercicios.length; i++){
                            if(this.solucion.ejercicios[i].calificacion >= 0){
                                this.calificaciones[i]= this.solucion.ejercicios[i].calificacion;
                                this.resueltos++;
                            }
                        }
                        this.progreso= (this.resueltos * 100) / this.actividad.length;
                    }
                },

                error=>{
                    this.errorMessage= <any>error;
                    if(this.errorMessage != null){
                        alert(this.errorMessage);
                    }
                }
            );
        }
        
	}//fin ngOnInit

    extraerVerbo(){
        let args= this.actividad[this.ejerSel].solucionFLogico.split(",");
        this.argumentos= args.length-1;
        let verbo;
        for(let s of args){
            if(s.includes("Verbo")){
                verbo= s.substring(s.indexOf("Verbo(")+ "Verbo(".length, s.length-1);
                break;
            }
        }
    
        return verbo;
    }

    siguienteEjer(){
        this.ejerSel++;
        this.siguiente= this.ejerSel < this.actividad.length - 1;
        this.anterior=this.ejerSel > 0;
        this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta="";
        this.verboMarcado=false;
        this.verbo= this.extraerVerbo();
        this.faseVerbo=false;
        this.monovalente.activa=false;
        this.bivalente.activa=false;
        this.trivalente.activa=false;
        this.amarilla.activa=false;
        this.azul.activa=false;
        this.naranja.activa=false;
        this.roja.activa=false;
        this.verde.activa=false;
        $('span.acertada').removeClass("acertada");
        $('span.marcada').removeClass("marcada");
        $('.izquierda, .superior, .derecha').removeAttr("src");
        $('.izquierda, .superior, .derecha').css("display", "none");

        this.guardarSolucion();
    }

    anteriorEjer(){
        this.ejerSel--;
        this.anterior= this.ejerSel > 0;
        this.siguiente= this.ejerSel < this.actividad.length-1;
        this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta="";
        this.verbo= this.extraerVerbo();
        this.guardarSolucion();
    }

    calificar(){
        if(this.respuesta == this.actividad[this.ejerSel].solucionPEspanol){
            this.solucion.ejercicios[this.ejerSel].msgCalificacion="!!Enhorabuena¡¡ La respuesta es correcta";
            this.solucion.ejercicios[this.ejerSel].calificacion= 1;
        }else{
            let patron: String[];
            let res: String[];
            res= this.respuesta.split(" ");
            patron= this.actividad[this.ejerSel].solucionFPatron.split(" + ");

            res= _.intersection(res,patron);

           if(_.isEqual(patron, res)){
               this.solucion.ejercicios[this.ejerSel].msgCalificacion="La solución parece correcta porque las palabras están bien traducidas y se presentan en un orden correcto, pero debe comprobarla el profesor porque no coincide con la solución que ha propuesto";
               this.solucion.ejercicios[this.ejerSel].calificacion= 1;
           }
           else{
               

               if(res.length == patron.length){
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion="La solución tiene las palabras bien traducidas pero no se presentan en el orden correcto propuesto por el profesor. Esta solución debe comprobarla el profesor";
                    this.solucion.ejercicios[this.ejerSel].calificacion= 1/2;
               }
               else if(res.length > patron.length/2){
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion="Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                    this.solucion.ejercicios[this.ejerSel].calificacion= 1/4;
               }else{
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion="Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                    this.solucion.ejercicios[this.ejerSel].calificacion= 0;
               }
           }
        }
        this.solucion.ejercicios[this.ejerSel].respuesta= this.respuesta;
        this.solucion.ejercicios[this.ejerSel].notaProfesor= -1;
        this.solucion.ejercicios[this.ejerSel].msgProfesor="";
        this.resueltos++;
        this.progreso= (this.resueltos * 100) / this.actividad.length;

        if(this.progreso == 100){
            for(var i=0; i < this.solucion.ejercicios.length; i++){
                this.calificacionFinal+=this.solucion.ejercicios[i].calificacion;
            }
            this.solucion.notaFinal=this.calificacionFinal;
            this.terminado=true;
        }
        
    }


    clickMonovalente(event){

        if(this.argumentos > 1){
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }else{
            if(this.verboMarcado){
                this.faseVerbo=true;
                this.monovalente.activa=true;
            }else{
                if(this.monovalente.activa)
                    this.monovalente.activa=false;
                else
                    this.monovalente.activa=true;
            }    
        }
    }

    clickBivalente(event){

        if(this.argumentos != 2){
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }else{
             if(this.verboMarcado){
                this.faseVerbo=true;
                this.bivalente.activa=true;
                $('span.marcada').removeClass("marcada").addClass("acertada");
            }else{
                if(this.bivalente.activa)
                    this.bivalente.activa=false;
                else
                    this.bivalente.activa=true;
            }
        }
    }

    clickTrivalente(event){

         if(this.argumentos != 3){
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }else{
             if(this.verboMarcado){
                this.faseVerbo=true;
                this.trivalente.activa=true;
            }else{
                if(this.trivalente.activa)
                    this.trivalente.activa=false;
                else
                    this.trivalente.activa=true;
            }
        }
    }

    clickAmarilla(event){
        if(this.amarilla.activa)
            this.amarilla.activa=false;
        else{
            this.amarilla.activa=true;
            this.amarilla.top="0px";
            this.amarilla.left="0px";
        }
    }

    clickAzul(event){
        if(this.azul.activa)
            this.azul.activa=false;
        else{
            this.azul.activa=true;
            this.azul.top="20px";
            this.azul.left="30px";
        }
    }

    clickNaranja(event){
        if(this.naranja.activa)
            this.naranja.activa=false;
        else{
            this.naranja.activa=true;
            this.naranja.top="20px";
            this.naranja.left="30px";
        }
    }

    clickRoja(event){
        if(this.roja.activa)
            this.roja.activa=false;
        else{
            this.roja.activa=true;
            this.roja.top="20px";
            this.roja.left="30px";
        }
    }

    clickVerde(event){
        if(this.verde.activa)
            this.verde.activa=false;
        else{
            this.verde.activa=true;
            this.verde.top="20px";
            this.verde.left="30px";
        }
    }

    sacarFichas(event){
        if($(event.target).next().css("display") == "none"){
            $(event.target).next().css("display", "block").removeClass("fadeOut").addClass("animated fadeInLeft");    
        }else{
            $(event.target).next().removeClass("fadeInLeft").animate({
                "opacity": "0"
            },500);

            this.sleep(500).then(()=>{
                $(event.target).next().css("display", "none");
            });
        }
    }

    clickPalabra(event, palabra: String){

        if(this.verboMarcado && !this.faseVerbo){
            this.verboMarcado=false;
            $(event.target).removeClass("marcada");
        }else if(!this.faseVerbo){
            if(palabra == this.verbo){
                this.verboMarcado=true;
                alert("Es el verbo!");
                $(event.target).addClass("marcada");
            }
            else{
                alert("No es el verbo");
                $(event.target).removeClass("marcada");
            }
        }
    }

    dropVerbo(event: any, palabra: String){
        //alert(palabra + " " + event.dragData);
        if(this.faseVerbo)
            alert("Ya has encontrado el verbo. Ahora debes encajar una pieza y arrastar las palabras a ella.");
        else{

            if(palabra == this.verbo){
                alert("Has acertado, es el verbo");
                this.faseVerbo=true;

                if(this.argumentos==1 && event.dragData == "monovalente"){
                    this.monovalente.activa=true;
                }
                else if(this.argumentos==2 && event.dragData == "bivalente"){
                    this.bivalente.activa=true;
                    $(event.nativeEvent.target).addClass("marcada");
                }else if(this.argumentos==3 && event.dragData == "trivalente"){
                    this.bivalente.activa=true;
                }
                else{
                    alert("Pero no es la ficha adecuada");
                    this.faseVerbo=false;
                }
            }
            else{
                alert("No es el verbo");
                this.faseVerbo=false;
            }
        }
    }

    dragPentagono(event: any){

        //alert($(event.nativeEvent.target).attr("src"));
        
        this.srcDraggedPentagono=$(event.target).attr("src");
        
    }

    dropPentagono(event: any, posicion : String){
        var data= event.dragData;
        var sonFichas:Boolean= data == '-animado +definido' || data == '-animado -definido' || data == '+animado -humano' || data == '+animado +humano' || data == 'lugar';
        if(!sonFichas){ //Si lo que se arrastran son las palabras
            alert(data);

        }
        else{ //Si hacemos drop con las fichas
            if(posicion == 'izquierda'){
                if(data == '+animado +humano'){
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src",this.srcDraggedPentagono);
                }
                else{
                    alert("Esta ficha no se corresponde con el argumento nominativo, que debe ir colocado siempre en la izquierda");
                }

            }else{
                if(data == '+animado +humano'){
                    alert("Esta ficha corresponde al argumento nominativo y solo puede colocarse por la izquierda");
                }else{
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src",this.srcDraggedPentagono);
                }
            }
            
        }
    }

    quitaPentagono(event: any){
        $(event.target).children().removeAttr("src");
        $(event.target).children().css("display", "none");
    }


    sleep(ms = 0) {
    	return new Promise(r => setTimeout(r, ms));
	}

    
    //cuando terminas, guarda y sale
    guardarYSalir(){
        this.guardarSolucion();
        this._router.navigate(['/alumno']);

    }

    //guarda la solucion en cualquier momento
    guardarSolucion(){
        this.solucion.actividad= this.id_actividad;
        this.solucion.id_alumno= this.user._id;

        for (var i = 0; i < this.infoActividad.ejercicios.length; i++){
            this.solucion.ejercicios[i]._id= this.infoActividad.ejercicios[i];
        }

        this.solucion.terminado=this.terminado;
        this.solucion.nivel= this.infoActividad.nivel;
        this.solucion.profesor= this.infoActividad.id_profesor;

        if(this.solucion._id == ""){

            this._solucionService.saveSolucion(this.solucion).subscribe(
                result =>{
                    this.solucion._id= result;

                    if(this.solucion._id == ""){
                        alert('Error en el servidor guardando la solucion');
                    }else{
                        alert("Se ha guardado la actividad con id: " + this.solucion._id);
                    }
                },
                error => {
                    this.errorMessage= <any>error;

                    if(this.errorMessage != null){
                        alert(this.errorMessage);
                    }
                }
            );

        }
        else {
            this.solucion.ultima_modificacion= new Date();
            this._solucionService.updateSolucion(this.solucion).subscribe(
                result =>{
                    this.solucion._id= result;

                    if(this.solucion._id == ""){
                        alert('Error en el servidor actualizando la solucion');
                    }else{
                        alert("Se ha actualizado la actividad con id: " + this.solucion._id);
                    }
                },
                error => {
                    this.errorMessage= <any>error;

                    if(this.errorMessage != null){
                        alert(this.errorMessage);
                    }
                }
            );


        }
    }
    
    abrirModalSalir(){

        this.msgSalir="Estas a punto de salir.\nTus cambios serán guardados";
        this.modalSalir=true;
        setTimeout(() => this.visibleAnimate = true);
    }

    cancelarModalSalir(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalSalir = false, 300);
        this.msgSalir="";
    }

    cancelarModalDiccionario(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalDiccionario = false, 300);
    }

    cancelarModalAyuda(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalAyuda = false, 300);
    }

    abrirModalDiccionario(){
        this.modalDiccionario=true;
        setTimeout(() => this.visibleAnimate = true);
    }

    abrirModalAyuda(){
        this.modalAyuda=true;
        setTimeout(() => this.visibleAnimate = true);
    }
}