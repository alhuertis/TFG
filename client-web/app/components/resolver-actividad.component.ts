//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {Actividad} from '../models/actividad';

declare var $:any;

@Component({

	selector: 'resolver-actividad',
	templateUrl: 'app/views/resolver-actividad.html',
	providers: [ActividadService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/styles.css'],
}) 

export class  ResolverActividadComponent implements OnInit{


	
	

	constructor(
			private _actividadService: ActividadService

	){
		
	}


	ngOnInit(){
		);
	}//fin ngOnInit


}