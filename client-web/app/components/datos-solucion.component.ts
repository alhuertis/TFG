import{Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {User} from '../models/user';
import {Actividad} from '../models/actividad';
import {Ejercicio} from '../models/ejercicio';
import {Solucion} from '../models/solucion';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;


@Component({

	selector: 'datos-solucion',
	templateUrl: 'app/views/datos-solucion.html',
	providers: [EjercicioService, ActividadService,SolucionService]
}) 


export class  DatosSolucionComponent implements OnInit{

    @Input() solucion: Solucion;
    @Output() salir= new EventEmitter();

    public errorMessage: string;

    public user: User;
    public ejercicios: Ejercicio[];
    public actividad: Actividad;
    public indice: number;
   
    // pager object (paginador)
    /*pager: any = {};
	pagerSolucion: any = {};*/
 



    constructor(
			private _ejercicioService: EjercicioService,
			private _actividadService: ActividadService,
			private _solucionService: SolucionService,
	){
        this.errorMessage="";
        this.user= JSON.parse(localStorage.getItem('currentUser')).user;
        this.actividad= new Actividad();
        this.indice=0; 
        


    }


    ngOnInit(){
        this._actividadService.cargarActividad(this.solucion.actividad._id).subscribe(

             result=>{
                this.actividad= result.actividad;
            },

            error=>{
                 this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de la actividad');
				}
            }

        );

    }

    /*ngAfterViewInit(){
    }*/

    exit(){
        this.salir.emit();
    }

    cambiaIndice(i : number){
        this.indice=i;
    }


    /*setPageSoluciones(page: number) {
        if (page < 1 || page > this.pagerSolucion.totalPages) {
            return;
        }

        // get pager object from service
       	this.pagerSolucion = this._actividadService.getPager(this.soluciones.length, page);
        // get current page of items
        this.pagedSoluciones = this.soluciones.slice(this.pagerSolucion.startIndex, this.pagerSolucion.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }*/


}