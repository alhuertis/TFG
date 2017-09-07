//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit, Input} from '@angular/core';
import{NgForm} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {DiccionarioService} from '../services/diccionario.service';
import {Actividad} from '../models/actividad';
import {Ejercicio} from '../models/ejercicio';
import {Ficha} from '../models/ficha';
import {Solucion} from '../models/solucion';
import {SolucionEjercicio} from '../models/solucion-ejercicio';
import {User} from '../models/user';

declare var $:any;
import * as _ from 'underscore';

import * as messages from '../constants/messagesResources';

@Component({

	selector: 'resolver-actividad',
	templateUrl: 'app/views/resolver-actividad.html',
	providers: [ActividadService, SolucionService, DiccionarioService], //Necesitamos esto para poder usar los metodos
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
    fraseLematizadaSplit: String[];
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
    modalExplicacion: Boolean;

    //Diccionario 
    diccionario: {}[];
    caracterizacionesFichas: {};

    //Control de pentagonos y palabras usadas
    color: String;
    izquierda: {puesta, color, caracterizacion, emparejada};
    superior: {puesta, color, caracterizacion, emparejada};
    derecha: {puesta, color, caracterizacion, emparejada};
    palabrasAcertadas: Boolean[];
    busquedaPalabra: String;
    resultadoBusqueda: any;
    buscandoPalabra: Boolean;
    msgFichas: String[];
    
    MS : any = messages;
	
	

	constructor(
			private _actividadService: ActividadService,
            private _solucionService: SolucionService,
            private _diccionarioService: DiccionarioService, 
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
        this.diccionario=[];
        this.caracterizacionesFichas= {"amarilla":"-animado +definido", "azul":"-animado -definido", "marron":"+animado -humano", "roja":"+animado +humano", "verde":"lugar"};
        this.color="";
        this.izquierda= {"puesta":"false", "color":"", "caracterizacion":"", "emparejada":""};
        this.derecha={"puesta":"false", "color":"", "caracterizacion":"", "emparejada":""};
        this.superior={"puesta":"false", "color":"", "caracterizacion":"", "emparejada":""};
        this.palabrasAcertadas=[];
        this.busquedaPalabra="";

        this.ejercicio= new Ejercicio("","","","",null,"","",null,null,"","","","","","","",false, "");
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
        this.buscandoPalabra=false;
        this.resultadoBusqueda={};
        this.msgFichas=[];
        this.modalExplicacion=false;
        

	
	}


	ngOnInit(){

        this._diccionarioService.getDiccionario().subscribe(

            result =>{
                this.diccionario= result.diccionario;
                
                
            },

            error=>{
                this.errorMessage= <any>error;

				if(this.errorMessage != null){
					alert(this.errorMessage);
				}
            }
        );

        this._actividadService.cargarActividad(this.id_actividad).subscribe(
			result =>{
				this.actividad= result.actividad.ejercicios;
                this.infoActividad= result.actividad;
				if(!this.actividad){
					alert('Error en el servidor');
				}else{
                    this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
                    this.fraseLematizadaSplit= this.actividad[this.ejerSel].fraseLematizada.split(" ");
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
                    this.sleep(800).then(()=>{
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
                            if(this.progreso == 100)
                                this.terminado=true;
                        }
                    });
                    
                    
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
        if(this.siguiente){
            this.restaurarColoresPalabras();
            this.ejerSel++;
            this.siguiente= this.ejerSel < this.actividad.length - 1;
            this.anterior=this.ejerSel > 0;
            this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
            this.fraseLematizadaSplit= this.actividad[this.ejerSel].fraseLematizada.split(" ");
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

            if(this.resueltos > 0)
                this.guardarSolucion();
        }
    }

    anteriorEjer(){
        if(this.anterior){
            this.restaurarColoresPalabras();
            this.ejerSel--;
            this.anterior= this.ejerSel > 0;
            this.siguiente= this.ejerSel < this.actividad.length-1;
            this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
            this.fraseLematizadaSplit= this.actividad[this.ejerSel].fraseLematizada.split(" ");
            this.respuesta="";
            this.verbo= this.extraerVerbo();

            if(this.resueltos > 0)
                this.guardarSolucion();
        }
    }

    seleccionarEjer(n : number){
        this.restaurarColoresPalabras();
        this.ejerSel= n;
        this.anterior= this.ejerSel > 0;
        this.siguiente= this.ejerSel < this.actividad.length-1;
        this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.fraseLematizadaSplit= this.actividad[this.ejerSel].fraseLematizada.split(" ");
        this.respuesta="";
        this.verbo= this.extraerVerbo();

        if(this.resueltos > 0)
                this.guardarSolucion();
    }

    calificar(){
        this.borrarMsgFichas();
        if(this.respuesta == this.actividad[this.ejerSel].solucionPEspanol){
            this.solucion.ejercicios[this.ejerSel].msgCalificacion= this.MS.RESOLVER_RESPUESTA_CORRECTA;
            this.solucion.ejercicios[this.ejerSel].calificacion= 1;
        }else{
            let patron: String[];
            let res: String[];
            res= this.respuesta.split(" ");
            patron= this.actividad[this.ejerSel].solucionFPatron.split(" + ");

            res= _.intersection(res,patron);

           if(_.isEqual(patron, res)){
               this.solucion.ejercicios[this.ejerSel].msgCalificacion=this.MS.RESOLVER_RESPUESTA_NOTA_1;
               this.solucion.ejercicios[this.ejerSel].calificacion= 1;
           }
           else{
               

               if(res.length == patron.length){
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion= this.MS.RESOLVER_RESPUESTA_NOTA_1_2;
                    this.solucion.ejercicios[this.ejerSel].calificacion= 1/2;
               }
               else if(res.length > patron.length/2){
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion=this.MS.RESOLVER_RESPUESTA_NOTA_1_4;
                    this.solucion.ejercicios[this.ejerSel].calificacion= 1/4;
               }else{
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion=this.MS.RESOLVER_RESPUESTA_NOTA_0;
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
        this.guardarSolucion();
    }


    clickMonovalente(event){

        /*if(this.argumentos > 1){
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
        }*/
    }

    clickBivalente(event){

        /*if(this.argumentos != 2){
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
        }*/
    }

    clickTrivalente(event){

         /*if(this.argumentos != 3){
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
        }*/
    }

    clickAmarilla(event){
        /*if(this.amarilla.activa)
            this.amarilla.activa=false;
        else{
            this.amarilla.activa=true;
            this.amarilla.top="0px";
            this.amarilla.left="0px";
        }*/
    }

    clickAzul(event){
        /*if(this.azul.activa)
            this.azul.activa=false;
        else{
            this.azul.activa=true;
            this.azul.top="20px";
            this.azul.left="30px";
        }*/
    }

    clickNaranja(event){
        /*if(this.naranja.activa)
            this.naranja.activa=false;
        else{
            this.naranja.activa=true;
            this.naranja.top="20px";
            this.naranja.left="30px";
        }*/
    }

    clickRoja(event){
        /*if(this.roja.activa)
            this.roja.activa=false;
        else{
            this.roja.activa=true;
            this.roja.top="20px";
            this.roja.left="30px";
        }*/
    }

    clickVerde(event){
        /*if(this.verde.activa)
            this.verde.activa=false;
        else{
            this.verde.activa=true;
            this.verde.top="20px";
            this.verde.left="30px";
        }*/
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

       /* if(this.verboMarcado && !this.faseVerbo){
            this.verboMarcado=false;
            $(event.target).removeClass("marcada");
        }else if(!this.faseVerbo){
            if(palabra == this.verbo){
                this.verboMarcado=true;
                //alert("Es el verbo!");
                this.mostrarMsgFichas("Es el verbo!");
                $(event.target).addClass("marcada");
            }
            else{
                //alert("No es el verbo");
                this.mostrarMsgFichas("No es el verbo...");
                $(event.target).removeClass("marcada");
            }
        }*/
    }

    mostrarMsgFichas(msg : String){
        /*this.msgFichas=msg;
         this.sleep(4000).then(()=>{
            $(".respuesta-fichas").removeClass("fadeInRigth");
            $(".respuesta-fichas").addClass("fadeOutRight");
            this.sleep(1000).then(()=>{
                this.msgFichas="";
            });
            
        });*/
        this.msgFichas[this.msgFichas.length]=msg;
    }

    borraMsgFicha(i : number){
        this.msgFichas.splice(i,1);
    }

    borrarMsgFichas(){
        $(".respuesta-fichas").removeClass("fadeInRigth");
        $(".respuesta-fichas").addClass("fadeOutRight");
        this.sleep(1000).then(()=>{
            this.msgFichas=[];
        });
    }

    dropVerbo(event: any, palabra: String){
        //alert(palabra + " " + event.dragData);
        if(this.faseVerbo)
            //alert("Ya has encontrado el verbo. Ahora debes encajar una pieza y arrastar las palabras a ella.");
            this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_VERBO_1);
        else{

            if(palabra == this.verbo){
                //alert("Has acertado, es el verbo");
                this.faseVerbo=true;

                if(this.argumentos==1 && event.dragData == "monovalente"){
                    this.monovalente.activa=true;
                    $(event.nativeEvent.target).addClass("marcada flash");
                    this.borrarMsgFichas();
                }
                else if(this.argumentos==2 && event.dragData == "bivalente"){
                    this.bivalente.activa=true;
                    $(event.nativeEvent.target).addClass("marcada flash");
                    this.borrarMsgFichas();
                    
                }else if(this.argumentos==3 && event.dragData == "trivalente"){
                    this.trivalente.activa=true;
                    $(event.nativeEvent.target).addClass("marcada flash");
                    this.borrarMsgFichas();
                }
                else{
                    //alert("Pero no es la ficha adecuada");
                    this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_VERBO_2)
                    this.faseVerbo=false;
                }

                
            }
            else{
                //alert("No es el verbo");
                this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_VERBO_3)
                $(event.nativeEvent.target).addClass("shake");
                this.sleep(1000).then(()=>{
                    $(".frase-traducir").children().removeClass("shake");
                });
                this.faseVerbo=false;
            }
        }
    }


    dragPentagono(event: any, color: String){

        //alert($(event.nativeEvent.target).attr("src"));
        
        this.srcDraggedPentagono=$(event.target).attr("src");
        this.color=color;
        
    }

    dropPentagono(event: any, posicion : String){
        var data= event.dragData;
        var sonFichas:Boolean= data == '-animado +definido' || data == '-animado -definido' || data == '+animado -humano' || data == '+animado +humano' || data == 'lugar';
        if(!sonFichas){ //Si lo que se arrastran son las palabras
            
            let i=0;
            let dataLema: String=data;
            for(var p of this.fraseSplit){
                if(dataLema == p){
                    dataLema=this.fraseLematizadaSplit[i];
                    break;
                }
                i++;
            }

            var vari= _.findWhere(this.diccionario, {"lema": dataLema.toLowerCase()});
            if(vari != undefined){

                if(posicion == 'izquierda' && this.izquierda.caracterizacion == vari.significado[0].caracArgumental[0] ){
                    $("."+data).css("background", this.izquierda.color);
                    $("."+data).addClass("flash");
                    $(".izquierda").addClass("flash");

                }else if(posicion == 'superior' && this.superior.caracterizacion == vari.significado[0].caracArgumental[0] ){
                    $("."+data).css("background", this.superior.color);
                    $("."+data).addClass("flash");
                    $(".superior").addClass("flash");

                }else if(posicion == 'derecha' && this.derecha.caracterizacion == vari.significado[0].caracArgumental[0]){
                    $("."+data).css("background", this.derecha.color);
                    $("."+data).addClass("flash");
                    $(".derecha").addClass("flash");

                }else{
                    //alert("No se pueden emparejar");
                    $("."+data).addClass("shake");
                    this.sleep(1000).then(()=>{
                        $("."+data).removeClass("shake");
                    });
                }
                
            }
            else{
                //alert("No se encuentra en el diccionario");
                this.mostrarMsgFichas(this.MS.RESOLVER_DICCIONARIO_NO_VALIDA);
            }
            

        }
        else{ //Si hacemos drop con las fichas
            if(posicion == 'izquierda'){
                this.izquierda.color= this.color;
                this.izquierda.puesta= true;
                this.izquierda.caracterizacion= data;
            }else if(posicion == 'superior'){
                this.superior.color=this.color;
                this.superior.puesta= true;
                this.superior.caracterizacion= data;
            }else if(posicion == 'derecha'){
                this.derecha.color=this.color;
                this.derecha.puesta= true;
                this.derecha.caracterizacion= data;
            }

            if(posicion == 'izquierda'){
                if(data == '+animado +humano'){
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src",this.srcDraggedPentagono);
                }
                else{

                    //alert("Esta ficha no se corresponde con el argumento nominativo, que debe ir colocado siempre en la izquierda");
                    this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_FICHA_1);
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src",this.srcDraggedPentagono);
                    $(event.nativeEvent.target).children().addClass("fadeOut2");

                    this.sleep(1000).then(()=>{
                        $(event.nativeEvent.target).children().css("display", "none");
                        $(event.nativeEvent.target).children().removeAttr("src");
                        $(event.nativeEvent.target).children().removeClass("fadeOut2")
                    });
                    
                }

            }else{
                if(data == '+animado +humano'){
                    //alert("Esta ficha corresponde al argumento nominativo y solo puede colocarse por la izquierda");
                    this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_FICHA_2);
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src",this.srcDraggedPentagono);
                    $(event.nativeEvent.target).children().addClass("fadeOut2");

                    this.sleep(700).then(()=>{
                        $(event.nativeEvent.target).children().css("display", "none");
                        $(event.nativeEvent.target).children().removeAttr("src");
                        $(event.nativeEvent.target).children().removeClass("fadeOut2")
                    });
                }else{
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src",this.srcDraggedPentagono);
                }
            }
            
        }
    }

    buscarPalabra(){
        //Sustantivo, verbo, adverbio, conjuncion, Pronombre,Adjetivo

        this.buscandoPalabra=true;
        this.sleep(100).then(()=>{

            var encontrado:Boolean = false;
            var i:number = 0;
            while(!encontrado && i < this.diccionario.length){
                var o : any = this.diccionario[i];
                if(o.lema == this.busquedaPalabra.toLowerCase() || o.lema.indexOf(this.busquedaPalabra.toLowerCase()+",") != -1){
                    this.resultadoBusqueda= o;
                    encontrado=true;
                }
                i++;
            }
            if(!encontrado || this.busquedaPalabra==''){
                this.resultadoBusqueda={};
            } 
            this.buscandoPalabra=false;
        }); 
    }

    addBuscar(palabra : String){
        this.busquedaPalabra=palabra;
        this.buscarPalabra();
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
        this.solucion.nombre_alumno= this.user.nombre + " " + this.user.apellidos;

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
                        //alert('Error en el servidor guardando la solucion');
                        this.mostrarMsgFichas(this.MS.RESOLVER_ERROR_GUARDAR);
                    }else{
                        //alert("Se ha guardado la actividad con id: " + this.solucion._id);
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
                        //alert("Se ha actualizado la actividad con id: " + this.solucion._id);
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

        this.msgSalir=this.MS.RESOLVER_MSG_SALIR;
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

    restaurarColoresPalabras(){

        for(var p of this.fraseSplit){
            $("."+p).css("background", "none");
            $("."+p).removeClass("flash");
            $("."+p).removeClass("shake");
        }
    }

    abrirModalExplicacion(){
        this.modalExplicacion=true;
        setTimeout(() => this.visibleAnimate = true);
    }

    cancelarModalExplicacion(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalExplicacion = false, 300);
    }
}