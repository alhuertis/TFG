import{Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {User} from '../models/user';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;


@Component({

	selector: 'panel-buscar-soluciones',
	templateUrl: 'app/views/panel-buscar-soluciones.html',
	providers: [EjercicioService, ActividadService,SolucionService]
}) 


export class  PanelBuscarSolucionesComponent implements OnInit{

    //@Input() prueba: string;
    @Output() salir= new EventEmitter();

    constructor(
			private _ejercicioService: EjercicioService,
			private _actividadService: ActividadService,
			private _solucionService: SolucionService
	){}


    ngOnInit(){

    }

    exit(){
        this.salir.emit();
    }

}