import{Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';
import {Actividad} from '../models/actividad';
import {Solucion} from '../models/solucion';
import {CriteriaSolucion} from '../models/criteriaSolucion';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;


@Component({

	selector: 'panel-buscar-soluciones',
	templateUrl: 'app/views/panel-buscar-soluciones.html',
	providers: [EjercicioService, ActividadService,SolucionService, AuthenticationService]
}) 


export class  PanelBuscarSolucionesComponent implements OnInit{

    //@Input() prueba: string;
    @Output() salir= new EventEmitter();

    public errorMessage: string;

    public user: User;
    public soluciones: Solucion[];
    public actividades: Actividad[];
    public alumnos: User[];
    public busquedaByActividad: any;
    public busquedaByAlumnos: any[];
    public fecha_desde: Date;
    public fecha_hasta: Date;

    // pager object (paginador)
    pager: any = {};
	pagerSolucion: any = {};
    public pagedSoluciones: Solucion[];
    public mostrarSoluciones: Boolean;
    public msgBusqueda: string;
    public boolMsgBusqueda: Boolean;
    public verSolu: Boolean;
    public solucion: Solucion;



    constructor(
			private _ejercicioService: EjercicioService,
			private _actividadService: ActividadService,
			private _solucionService: SolucionService,
            private _authenticationService: AuthenticationService
	){
        this.errorMessage="";
        this.user= JSON.parse(localStorage.getItem('currentUser')).user; 
        this.actividades= new Array<Actividad>();
        this.mostrarSoluciones= false;
        this.alumnos= new Array<User>();
        this.busquedaByAlumnos= new Array();
        this.fecha_desde= null;
        this.fecha_hasta= null;
        this.soluciones=[];
        this.msgBusqueda="";
        this.boolMsgBusqueda=false;
        this.verSolu=false;
        this.solucion= new Solucion();


    }


    ngOnInit(){

        this._actividadService.getActsMiColeccion(this.user._id).subscribe(

            result =>{
                this.actividades= result.miColeccionAct;

				if(!this.actividades){
					alert('Error en el servidor');
				}
            },

            error=>{
                this.errorMessage= <any>error;

				if(this.errorMessage != null){
					alert('Error en la peticion de mi coleccion');
				}
            }
        );

        this._authenticationService.getListaUsers().subscribe(

            result=>{
                this.alumnos= result.usuarios;
            },

            error=>{
                this.errorMessage= <any>error;

				if(this.errorMessage != null){
					alert('Error en la peticion de mi coleccion');
				}
            }
        );

    }

    /*ngAfterViewInit(){
    }*/

    exit(){
        this.salir.emit();
    }


    addAlumno(alu : any){
        for(let i=0; i < this.alumnos.length; i++){
            if(this.alumnos[i]._id == alu){
                this.busquedaByAlumnos.push(this.alumnos[i]);
            }
        }

        this.busquedaByAlumnos = _.uniq(this.busquedaByAlumnos);
        

        
    }

    deleteAlumno(alu : any){
        for(let i=0; i < this.busquedaByAlumnos.length; i++){
            if(this.busquedaByAlumnos[i]._id == alu){
                this.busquedaByAlumnos.splice(i,1);
            }
        }

        $("#porAlumnos").val($("#porAlumnos option:first").val());

    }

    limpiarFiltro(){
        this.busquedaByActividad=null;
        this.busquedaByAlumnos=[];
        $("#porActividades").val($("#porActividades option:first").val());
        $("#porAlumnos").val($("#porAlumnos option:first").val());
        this.fecha_desde= null;
        this.fecha_hasta= null;
    }

    buscar(){
        var criteria= new CriteriaSolucion();

        if(this.busquedaByActividad != null){
            criteria.id_actividad= this.busquedaByActividad;
        }

        if(this.busquedaByAlumnos != null){
            criteria.ids_alumnos= this.busquedaByAlumnos;
        }

        if(this.fecha_desde != null){
            criteria.desde= this.fecha_desde;
        }

        if(this.fecha_hasta != null){
            criteria.hasta= this.fecha_hasta;
        }

        criteria.terminado=true;

        this._solucionService.getByCriteria(criteria).subscribe(

            result=>{
                this.soluciones= result.soluciones;

				if(!this.soluciones){
					alert('Error en el servidor');
				}else{
                    if(this.soluciones.length > 0){
                        this.setPageSoluciones(1);
                        this.mostrarSoluciones=true;
                        this.msgBusqueda="";
                        this.boolMsgBusqueda=false;
                    }else{
                        this.pagedSoluciones=[];
                        this.mostrarSoluciones=false;
                        this.msgBusqueda="No hay soluciones para este criterio de busqueda";
                        this.boolMsgBusqueda=true;
                    }
                
                }
            },

            error=>{
                 this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
            }
        );

    }

    verSolucion(solucion : Solucion){
        this.solucion= solucion;
        this.verSolu= true;
    }

    saliendoDeVerSolucion(){
        this.solucion= new Solucion();
        this.verSolu= false;
    }

    setPageSoluciones(page: number) {
        if (page < 1 || page > this.pagerSolucion.totalPages) {
            return;
        }

        // get pager object from service
       	this.pagerSolucion = this._actividadService.getPager(this.soluciones.length, page);
        // get current page of items
        this.pagedSoluciones = this.soluciones.slice(this.pagerSolucion.startIndex, this.pagerSolucion.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }


}