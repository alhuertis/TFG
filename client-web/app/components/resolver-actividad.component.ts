//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import{NgForm} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {Actividad} from '../models/actividad';
import {Ejercicio} from '../models/ejercicio';

declare var $:any;
import * as _ from 'underscore';

@Component({

	selector: 'resolver-actividad',
	templateUrl: 'app/views/resolver-actividad.html',
	providers: [ActividadService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/styles.css'],
}) 

export class  ResolverActividadComponent implements OnInit{

    actividad: Ejercicio[];
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
	
	

	constructor(
			private _actividadService: ActividadService

	){

        this.actividad=
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
                "fraseATraducir": "Dei sacrificium accipiunt Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
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
        ];

        this.ejercicio= new Ejercicio("","","","",null,"","",null,null,"","","","","","",false);
        this.ejerSel=0;
        this.anterior=this.ejerSel >0 ;
        this.siguiente=this.ejerSel < this.actividad.length;
        this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.calificaciones=[];
        this.respuesta="";
        this.msgCalificacion="";
        this.progreso=0;
        this.calificacionFinal=0;
	
	}


	ngOnInit(){


	}//fin ngOnInit

    siguienteEjer(){
        this.ejerSel++;
        this.siguiente= this.ejerSel < this.actividad.length - 1;
        this.anterior=this.ejerSel > 0;
        this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta="";
    }

    anteriorEjer(){
        this.ejerSel--;
        this.anterior= this.ejerSel > 0;
        this.siguiente= this.ejerSel < this.actividad.length;
        this.fraseSplit= this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta="";
    }

    calificar(){

        if(this.respuesta == this.actividad[this.ejerSel].solucionPEspanol){
            this.msgCalificacion="!!Enhorabuena¡¡ La respues es correcta";
            this.calificaciones[this.ejerSel]= 1;
        }else{
            let patron: String[];
            let res: String[];
            res= this.respuesta.split(" ");
            patron= this.actividad[this.ejerSel].solucionFPatron.split(" + ");

            res= _.intersection(res,patron);

           if(_.isEqual(patron, res)){
               this.msgCalificacion="La solución parece correcta porque las palabras están bien traducidas y se presentan en un orden correcto, pero debe comprobarla el profesor porque no coincide con la solución que ha propuesto";
               this.calificaciones[this.ejerSel]= 1;
           }
           else{
               

               if(res.length == patron.length){
                   this.msgCalificacion="La solución tiene las palabras bien traducidas pero no se presentan en el orden correcto propuesto por el profesor. Esta solución debe comprobarla el profesor";
                   this.calificaciones[this.ejerSel]= 1/2;
               }
               else if(res.length > patron.length/2){
                   this.msgCalificacion="Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                   this.calificaciones[this.ejerSel]= 1/4;
               }else{
                   this.msgCalificacion="Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                   this.calificaciones[this.ejerSel]= 0;
               }
           }
        }

        this.progreso= (this.calificaciones.length * 100) / this.actividad.length;

        if(this.progreso == 100){
            for(var i=0; i < this.calificaciones.length; i++){
                this.calificacionFinal+=this.calificaciones[i];
            }
        }
        
    }


}