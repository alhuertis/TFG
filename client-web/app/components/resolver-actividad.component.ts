//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {Actividad} from '../models/actividad';
import {Ejercicio} from '../models/ejercicio';

declare var $:any;

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
	
	}


	ngOnInit(){


	}//fin ngOnInit

    siguienteEjer(){
        this.ejerSel++;
        this.siguiente= this.ejerSel < this.actividad.length - 1;
        this.anterior=this.ejerSel > 0;
    }

    anteriorEjer(){
        this.ejerSel--;
        this.anterior= this.ejerSel > 0;
        this.siguiente= this.ejerSel < this.actividad.length;
    }


}