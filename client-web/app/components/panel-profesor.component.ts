//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {Ejercicio} from '../models/ejercicio';
import {Actividad} from '../models/actividad';
import {User} from '../models/user';
import {CriteriaEjercicios} from '../models/criteriaEjercicios';
import {CriteriaActividades} from '../models/criteriaActividades';

import {TruncatePipe} from './truncate-pipe.component';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-profesor',
	templateUrl: 'app/views/panel-profesor.html',
	providers: [EjercicioService, ActividadService,SolucionService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/menu-profesor.css'],
}) 

export class  PanelProfesorComponent implements OnInit{

	public primeraVisita: Boolean;
	public title: string;
	public user: User;
	public id_profesor: string;
	public ejercicios: Ejercicio[];
	public loading: boolean;
	public errorMessage: string;
	public message: string;
	public mostrarListaEjers: boolean;
	public mostrarListaActs: boolean;
	public ejersAMostrar: Ejercicio[];
	//public actividades: Actividad[];

	//Para poder actualizar las vistas
	public datosSeleccionados: String;
	public tipoSeleccionado: String
	
	public datosAMostrar: string;
	public actsAMostrar: Actividad[];
	public actividad: Ejercicio[];
	public nuevaActividad: Actividad;
	public updateActividad: Actividad;
	public deleteAct: Actividad;
	
	// pager object
    pager: any = {};
    // paged items
    public pagedItemsEjers: Ejercicio[];
	public pagedItemsActs: Actividad[];

	//Totales
	public nEjercicios: number;

	//Mi coleccion
	public miColeccion: Ejercicio[];
	public nMiColeccion: number;
	public otrasColecciones: Ejercicio[];
	public nOtrasColecciones: number;

	//Niveles
	public miColeccionNivelA: Ejercicio[];
	public nMiColeccionNivelA: number;
	public miColeccionNivelM: Ejercicio[];
	public nMiColeccionNivelM: number;
	public miColeccionNivelB: Ejercicio[];
	public nMiColeccionNivelB: number;
	public otrasColeccionesNivelA: Ejercicio[];
	public nOtrasColeccionesNivelA: number;
	public otrasColeccionesNivelM: Ejercicio[];
	public nOtrasColeccionesNivelM: number;
	public otrasColeccionesNivelB: Ejercicio[];
	public nOtrasColeccionesNivelB: number;


	//Tipos
	public miColeccionTipo1: Ejercicio[];
	public nMiColeccionTipo1: number;
	public miColeccionTipo2: Ejercicio[];
	public nMiColeccionTipo2: number;
	public miColeccionTipo3: Ejercicio[];
	public nMiColeccionTipo3: number;
	public miColeccionTipo4: Ejercicio[];
	public nMiColeccionTipo4: number;
	public otrasColeccionesTipo1: Ejercicio[];
	public nOtrasColeccionesTipo1: number;
	public otrasColeccionesTipo2: Ejercicio[];
	public nOtrasColeccionesTipo2: number;
	public otrasColeccionesTipo3: Ejercicio[];
	public nOtrasColeccionesTipo3: number;
	public otrasColeccionesTipo4: Ejercicio[];
	public nOtrasColeccionesTipo4: number;

	//objeto update
	public ejerUpdate: any= {};

	//Estado modificando
	public modificando: Boolean;

	//Mi coleccion
	public miColeccionAct: Actividad[];
	public visibles: Actividad[];
	public invisibles: Actividad[];
	
	//Niveles
	public miColeccionNivelAAct: Actividad[];
	public miColeccionNivelMAct: Actividad[];
	public miColeccionNivelBAct: Actividad[];
	public visiblesNivelAAct: Actividad[];
	public visiblesNivelMAct: Actividad[];
	public visiblesNivelBAct: Actividad[];
	public invisiblesNivelAAct: Actividad[];
	public invisiblesNivelMAct: Actividad[];
	public invisiblesNivelBAct: Actividad[];
	
	//Modales
  	public modalEjercicio: Boolean;
	public modalActividad: Boolean;
	public modalVerActividad: Boolean;
	public modalBorrarEjercicio: Boolean;
	public modalModEjer: Boolean;
	public modalMessage: Boolean;
  	private visibleAnimate: Boolean;
	public modalUpdateActividad: Boolean;
	public modalDeleteActividad: Boolean;
	public ejerAbrir: Ejercicio;
	public actAbrir: Actividad;
	public ejerBorrar: Ejercicio;
	public modalBuscarEjer: Boolean;
	public modalBuscarActs: Boolean;

	//Modificar ejer panel
	public niveles= ['Bajo', 'Medio', 'Avanzado'];
	public tipos=[1,2,3,4];
	public valoresLogico: String[]=[];
	public tipoLogico: string="";
	public valorLogico: string="";

	//Boleanos para vistas
	public buscarSoluciones: boolean;

	public criteriaEjercicios: CriteriaEjercicios;
	public criteriaActividades: CriteriaActividades;
	


	constructor(
			private _ejercicioService: EjercicioService,
			private _actividadService: ActividadService,
			private _solucionService: SolucionService

	){
		this.primeraVisita= true;
		this.title= "Panel de profesores";
		//this.user="Antonio Sarasa";
		this.user= JSON.parse(localStorage.getItem('currentUser')).user; 
		///this.id_profesor= "00001";
		this.id_profesor= this.user._id;
		//this.user="Antonio Sarasa";
		//this.id_profesor= "000001";
		this.mostrarListaEjers=false;
		this.mostrarListaActs=false;
		this.datosAMostrar="";
		this.actividad=[];
		this.miColeccionAct=new Array<Actividad>();
		this.miColeccionNivelAAct=new Array<Actividad>();
		this.miColeccionNivelMAct=new Array<Actividad>();
		this.miColeccionNivelBAct=new Array<Actividad>();
		this.visibles=new Array<Actividad>();
		this.visiblesNivelAAct=new Array<Actividad>();
		this.visiblesNivelMAct=new Array<Actividad>();
		this.visiblesNivelBAct=new Array<Actividad>();
		this.invisibles=new Array<Actividad>();
		this.invisiblesNivelAAct=new Array<Actividad>();
		this.invisiblesNivelMAct=new Array<Actividad>();
		this.invisiblesNivelBAct=new Array<Actividad>();

		this.actsAMostrar=[];
		this.datosSeleccionados="";
		this.tipoSeleccionado="";
		//this.actividad=[];
		this.modalEjercicio=false;
		this.modalActividad=false;
		this.modalMessage=false;
		this.visibleAnimate=false;
		
		this.updateActividad= new Actividad();
		this.deleteAct= new Actividad();

		this.message="";

		this.buscarSoluciones=false;
		this.criteriaEjercicios= new CriteriaEjercicios();
		this.modalBuscarEjer=false;
		this.criteriaActividades= new CriteriaActividades();
		
	}


	ngOnInit(){
		//Obtencion de datos
		this._ejercicioService.getEjercicios().subscribe(
			result =>{
				console.log(result);
				this.ejercicios= result.ejercicios;

				if(!this.ejercicios){
					alert('Error en el servidor');
				}
				else{
					this.loading=false;
					this.nEjercicios= this.ejercicios.length;
					if(this.primeraVisita){
						this.ejersAMostrar= this.ejercicios;
						this.seleccionaDatos('ejercicios', 'ejercicios', 1);
					}
					/*this.ejersAMostrar= this.ejercicios;
					this.datosAMostrar="Todos los ejercicios";
					this.mostrarLista=true;*/
				}

			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion');
				}
			}

		); //fin getEjercicios (Todos)

		this._ejercicioService.getEjersMiColeccion(this.id_profesor).subscribe(

			result => {
				this.miColeccion= result.miColeccion;

				if(!this.miColeccion){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccion= this.miColeccion.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);

		this._ejercicioService.getEjersMiColeccion(this.id_profesor).subscribe(

			result => {
				this.miColeccion= result.miColeccion;

				if(!this.miColeccion){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccion= this.miColeccion.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion

		this._ejercicioService.getEjersMiColeccionNivelA(this.id_profesor).subscribe(

			result => {
				this.miColeccionNivelA= result.miColeccionNivelA;

				if(!this.miColeccionNivelA){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionNivelA= this.miColeccionNivelA.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel Avanzado

		this._ejercicioService.getEjersMiColeccionNivelM(this.id_profesor).subscribe(

			result => {
				this.miColeccionNivelM= result.miColeccionNivelM;

				if(!this.miColeccionNivelM){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionNivelM= this.miColeccionNivelM.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel Medio

		this._ejercicioService.getEjersMiColeccionNivelB(this.id_profesor).subscribe(

			result => {
				this.miColeccionNivelB= result.miColeccionNivelB;

				if(!this.miColeccionNivelB){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionNivelB= this.miColeccionNivelB.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel bajo

		this._ejercicioService.getEjersMiColeccionTipo1(this.id_profesor).subscribe(

			result => {
				this.miColeccionTipo1= result.miColeccionTipo1;

				if(!this.miColeccionTipo1){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionTipo1= this.miColeccionTipo1.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 1

		this._ejercicioService.getEjersMiColeccionTipo2(this.id_profesor).subscribe(

			result => {
				this.miColeccionTipo2= result.miColeccionTipo2;

				if(!this.miColeccionTipo2){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionTipo2= this.miColeccionTipo2.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 2

		this._ejercicioService.getEjersMiColeccionTipo3(this.id_profesor).subscribe(

			result => {
				this.miColeccionTipo3= result.miColeccionTipo3;

				if(!this.miColeccionTipo3){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionTipo3= this.miColeccionTipo3.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 3

		this._ejercicioService.getEjersMiColeccionTipo4(this.id_profesor).subscribe(

			result => {
				this.miColeccionTipo4= result.miColeccionTipo4;

				if(!this.miColeccionTipo4){
					alert('Error en el servidor');
				}
				else{
					this.nMiColeccionTipo4= this.miColeccionTipo4.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 4

		//Otras colecciones
		this._ejercicioService.getEjersOtrasColecciones(this.id_profesor).subscribe(

			result => {
				this.otrasColecciones= result.otrasColecciones;

				if(!this.otrasColecciones){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColecciones= this.otrasColecciones.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);

		this._ejercicioService.getEjersOtrasColecciones(this.id_profesor).subscribe(

			result => {
				this.otrasColecciones= result.otrasColecciones;

				if(!this.otrasColecciones){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColecciones= this.otrasColecciones.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion

		this._ejercicioService.getEjersOtrasColeccionesNivelA(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesNivelA= result.otrasColeccionesNivelA;

				if(!this.otrasColeccionesNivelA){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesNivelA= this.otrasColeccionesNivelA.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel Avanzado

		this._ejercicioService.getEjersOtrasColeccionesNivelM(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesNivelM= result.otrasColeccionesNivelM;

				if(!this.otrasColeccionesNivelM){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesNivelM= this.otrasColeccionesNivelM.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel Medio

		this._ejercicioService.getEjersOtrasColeccionesNivelB(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesNivelB= result.otrasColeccionesNivelB;

				if(!this.otrasColeccionesNivelB){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesNivelB= this.otrasColeccionesNivelB.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel bajo

		this._ejercicioService.getEjersOtrasColeccionesTipo1(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesTipo1= result.otrasColeccionesTipo1;

				if(!this.otrasColeccionesTipo1){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesTipo1= this.otrasColeccionesTipo1.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 1

		this._ejercicioService.getEjersOtrasColeccionesTipo2(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesTipo2= result.otrasColeccionesTipo2;

				if(!this.otrasColeccionesTipo2){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesTipo2= this.otrasColeccionesTipo2.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 2

		this._ejercicioService.getEjersOtrasColeccionesTipo3(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesTipo3= result.otrasColeccionesTipo3;

				if(!this.otrasColeccionesTipo3){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesTipo3= this.otrasColeccionesTipo3.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 3

		this._ejercicioService.getEjersOtrasColeccionesTipo4(this.id_profesor).subscribe(

			result => {
				this.otrasColeccionesTipo4= result.otrasColeccionesTipo4;

				if(!this.otrasColeccionesTipo4){
					alert('Error en el servidor');
				}
				else{
					this.nOtrasColeccionesTipo4= this.otrasColeccionesTipo4.length;
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion tipo 4

		//Actividades
		

		this._actividadService.getActsMiColeccion(this.id_profesor).subscribe(

			result => {
				this.miColeccionAct= result.miColeccionAct;

				if(!this.miColeccionAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);

		this._actividadService.getActsMiColeccionNivelA(this.id_profesor).subscribe(

			result => {
				this.miColeccionNivelAAct= result.miColeccionNivelAAct;

				if(!this.miColeccionNivelAAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel Avanzado

		this._actividadService.getActsMiColeccionNivelM(this.id_profesor).subscribe(

			result => {
				this.miColeccionNivelMAct= result.miColeccionNivelMAct;

				if(!this.miColeccionNivelMAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);//fin getEjercicios de mi coleccion nivel Medio

		this._actividadService.getActsMiColeccionNivelB(this.id_profesor).subscribe(

			result => {
				this.miColeccionNivelBAct= result.miColeccionNivelBAct;
				if(!this.miColeccionNivelBAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);

		this._actividadService.getActsVisibles(this.id_profesor).subscribe(

			result => {
				this.visibles= result.visibles;

				if(!this.visibles){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de mi coleccion');
				}
			}
		);

		this._actividadService.getActsVisiblesNivelA(this.id_profesor).subscribe(

			result => {
				this.visiblesNivelAAct= result.visiblesNivelAAct;

				if(!this.visiblesNivelAAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de actividades visibles nivel alto');
				}
			}
		);

		this._actividadService.getActsVisiblesNivelM(this.id_profesor).subscribe(

			result => {
				this.visiblesNivelMAct= result.visiblesNivelMAct;

				if(!this.visiblesNivelMAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de actividades visibles nivel medio');
				}
			}
		);

		this._actividadService.getActsVisiblesNivelB(this.id_profesor).subscribe(

			result => {
				this.visiblesNivelBAct= result.visiblesNivelBAct;

				if(!this.visiblesNivelBAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de actividades visibles nivel bajo');
				}
			}
		);

		this._actividadService.getActsNoVisibles(this.id_profesor).subscribe(

			result => {
				this.invisibles= result.invisibles;

				if(!this.invisibles){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion actividades invisibles');
				}
			}
		);

		this._actividadService.getActsNoVisiblesNivelA(this.id_profesor).subscribe(

			result => {
				this.invisiblesNivelAAct= result.invisiblesNivelAAct;

				if(!this.invisiblesNivelAAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion actividades invisibles nivel alto');
				}
			}
		);

		this._actividadService.getActsNoVisiblesNivelM(this.id_profesor).subscribe(

			result => {
				this.invisiblesNivelMAct= result.invisiblesNivelMAct;

				if(!this.invisiblesNivelMAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion actividades invisibles nivel medio');
				}
			}
		);


		this._actividadService.getActsNoVisiblesNivelB(this.id_profesor).subscribe(

			result => {
				this.invisiblesNivelBAct= result.invisiblesNivelBAct;

				if(!this.invisiblesNivelBAct){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion actividades invisibles nivel bajo');
				}
			}
		);

		

	}//fin ngOnInit

	ngAfterViewInit(){
		//Este metodo se ejecuta tras cargar la vista. Usaremos aqui codigo jquery
		$.fn.extend({
			treed: function (o) {
			
				var openedClass = 'glyphicon-minus-sign';
				var closedClass = 'glyphicon-plus-sign';
				
				if (typeof o != 'undefined'){
					if (typeof o.openedClass != 'undefined'){
					openedClass = o.openedClass;
					}
					if (typeof o.closedClass != 'undefined'){
					closedClass = o.closedClass;
					}
				};
			
				//initialize each of the top levels
				var tree = $(this);
				tree.addClass("tree");
				tree.find('li').has("ul").each(function () {
					var branch = $(this); //li with children ul
					branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
					branch.addClass('branch');
					branch.on('click', function (e) {
						if (this == e.target) {
							var icon = $(this).children('i:first');
							icon.toggleClass(openedClass + " " + closedClass);
							$(this).children().children().slideToggle(200);
						}
					})
					branch.children().children().slideToggle(1);
				});
				//fire event from the dynamically added icon
				tree.find('.branch .indicator').each(function(){
					$(this).on('click', function () {
						$(this).closest('li').click();
					});
				});
				
				//fire event to open branch if the li contains an anchor instead of text
				tree.find('.branch>a').each(function () {
					$(this).on('click', function (e) {
						$(this).closest('li').click();
						e.preventDefault();
					});
				});
				
				//fire event to open branch if the li contains a button instead of text
				tree.find('.branch>button').each(function () {
					$(this).on('click', function (e) {
						$(this).closest('li').click();
						e.preventDefault();
					});
				});
			}
		});

		//Initialization of treeviews

		$('#tree1').treed();
		//$('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});
		//$('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});

		/*$('#tree1 li,#tree1 span, #tree1 i').on('mouseover', function(){
			$(this).children('.ojo').animate({
				opacity: "1",
				top:"2"
			}, 100, "linear");
		});

		$('#tree1 li').on('mouseout', function(){
			$(this).children('.ojo').animate({
				opacity: "0",
			}, 100, "linear");
		});*/

	}//fin ngAfterViewInit

	public seleccionaDatos(datos, tipo, page?){
		this.primeraVisita=false;
		this.datosSeleccionados=datos;
		this.tipoSeleccionado=tipo;

		this.mostrarListaActs=false;
		this.mostrarListaEjers=false;
		switch(datos){
			//Ejercicios
			case 'ejercicios': 
				this.ejersAMostrar= this.ejercicios;
				this.datosAMostrar="Todos los ejercicios";
				break;
			case 'mios': 
				this.ejersAMostrar= this.miColeccion;
				this.datosAMostrar="Mi Coleccion";
				break;
			case 'mios bajo': 
				this.ejersAMostrar= this.miColeccionNivelB;
				this.datosAMostrar="Mi Coleccion nivel bajo";
				break;
			case 'mios medio': 
				this.ejersAMostrar= this.miColeccionNivelM;
				this.datosAMostrar="Mi Coleccion nivel medio";
				break;
			case 'mios avanzado': 
				this.ejersAMostrar= this.miColeccionNivelA;
				this.datosAMostrar="Mi Coleccion nivel avanzado";
				break;
			case 'mios T1': 
				this.ejersAMostrar= this.miColeccionTipo1;
				this.datosAMostrar="Mi Coleccion ejercicios tipo 1";
				break;
			case 'mios T2': 
				this.ejersAMostrar= this.miColeccionTipo2;
				this.datosAMostrar="Mi Coleccion ejerciciostipo 2";
				break;
			case 'mios T3': 
				this.ejersAMostrar= this.miColeccionTipo3;
				this.datosAMostrar="Mi Coleccion ejercicios tipo 3";
				break;
			case 'mios T4': 
				this.ejersAMostrar= this.miColeccionTipo4;
				this.datosAMostrar="Mi Coleccion ejercicios tipo 4";
				break;
			case 'otros': 
				this.ejersAMostrar= this.otrasColecciones;
				this.datosAMostrar="Coleccion";
				break;
			case 'otros bajo': 
				this.ejersAMostrar= this.otrasColeccionesNivelB;
				this.datosAMostrar="Coleccion nivel bajo";
				break;
			case 'otros medio': 
				this.ejersAMostrar= this.otrasColeccionesNivelM;
				this.datosAMostrar="Coleccion nivel medio";
				break;
			case 'otros avanzado': 
				this.ejersAMostrar= this.otrasColeccionesNivelA;
				this.datosAMostrar="Coleccion nivel avanzado";
				break;
			case 'otros T1': 
				this.ejersAMostrar= this.otrasColeccionesTipo1;
				this.datosAMostrar="Coleccion ejercicios tipo 1";
				break;
			case 'otros T2': 
				this.ejersAMostrar= this.otrasColeccionesTipo2;
				this.datosAMostrar="Coleccion ejercicios tipo 2";
				break;
			case 'otros T3': 
				this.ejersAMostrar= this.otrasColeccionesTipo3;
				this.datosAMostrar="Coleccion ejercicios tipo 3";
				break;
			case 'otros T4': 
				this.ejersAMostrar= this.otrasColeccionesTipo4;
				this.datosAMostrar="Coleccion ejercicios tipo 4";
				break;
			//Actividades
			case 'mias': 
				this.actsAMostrar= this.miColeccionAct;
				this.datosAMostrar="Mi Coleccion actividades";
				break;
			case 'mias bajas': 
				this.actsAMostrar= this.miColeccionNivelBAct;
				this.datosAMostrar="Mi Coleccion actividades nivel bajo";
				break;
			case 'mias medias': 
				this.actsAMostrar= this.miColeccionNivelMAct;
				this.datosAMostrar="Mi Coleccion actividades nivel medio";
				break;
			case 'mias avanzadas': 
				this.actsAMostrar= this.miColeccionNivelAAct;
				this.datosAMostrar="Mi Coleccion actividades nivel avanzado";
				break;
			case 'visibles': 
				this.actsAMostrar= this.visibles;
				this.datosAMostrar="Visibles actividades";
				break;
			case 'visibles bajas': 
				this.actsAMostrar= this.visiblesNivelBAct;
				this.datosAMostrar="Visibles actividades nivel bajo";
				break;
			case 'visibles medias': 
				this.actsAMostrar= this.visiblesNivelMAct;
				this.datosAMostrar="Visibles actividades nivel medio";
				break;
			case 'visibles avanzadas': 
				this.actsAMostrar= this.visiblesNivelAAct;
				this.datosAMostrar="Visibles actividades nivel avanzado";
				break;
			case 'invisibles': 
				this.actsAMostrar= this.invisibles;
				this.datosAMostrar="No visibles actividades";
				break;
			case 'invisibles bajas': 
				this.actsAMostrar= this.invisiblesNivelBAct;
				this.datosAMostrar="No visibles actividades nivel bajo";
				break;
			case 'invisibles medias': 
				this.actsAMostrar= this.invisiblesNivelMAct;
				this.datosAMostrar="No visibles actividades nivel medio";
				break;
			case 'invisibles avanzadas': 
				this.actsAMostrar= this.invisiblesNivelAAct;
				this.datosAMostrar="No visibles actividades nivel avanzado";
				break;

		}

		if(tipo == 'ejercicios'){
			this.mostrarListaActs=false;
			this.mostrarListaEjers=true;
			if(page != 'undefined')
				this.setPageEjers(page);
			else
				this.setPageEjers(1);
		}else if(tipo == 'actividades'){
			this.mostrarListaEjers=false;
			this.mostrarListaActs=true;
			if(page != 'undefined')
				this.setPageActs(page);
			else
				this.setPageActs(1);
		}
		

		
	}


	setPageEjers(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._ejercicioService.getPager(this.ejersAMostrar.length, page);
        // get current page of items
        this.pagedItemsEjers = this.ejersAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }

	setPageActs(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._actividadService.getPager(this.actsAMostrar.length, page);
        // get current page of items
        this.pagedItemsActs = this.actsAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }

	addActividad(event, id: String){
		
		let indiceEj= _.findIndex(this.ejersAMostrar, {_id: id});
		if(event.target.checked){
			this.actividad[this.actividad.length]=this.ejersAMostrar[indiceEj];
			this.ejersAMostrar[indiceEj].marcado=true;
		}
		else{
			let indiceAct= _.findIndex(this.actividad, {_id: id});
			$('.listado-actividad li:eq('+indiceAct+')').removeClass("fadeInLeft").addClass("fadeOut");
			this.sleep(500).then(()=>{
				this.actividad.splice(indiceAct, 1);
				this.ejersAMostrar[indiceEj].marcado=false;
			});
		}
		
	}

	descartarEjer(event, id: String, i:any){
		$(event.target).parent().removeClass("aparecer").addClass("fadeOut");

		$(event.target).parent().next().addClass("subir");

		this.sleep(300).then(()=>{
			//let indiceAct= _.findIndex(this.actividad, {_id: id});
			this.actividad.splice(i, 1);

			let indiceEj=  _.findIndex(this.ejersAMostrar, {_id: id});
			if(indiceEj >= 0)
				this.ejersAMostrar[indiceEj].marcado=false;
			

			$(event.target).parent().next().removeClass("subir").addClass("aparecer");
		});
		
	}

	sleep(ms = 0) {
    	return new Promise(r => setTimeout(r, ms));
	}

	vaciarLista(){
		for(var item of this.actividad){
			item.marcado=false;
		}
		
		$('.listado-actividad li').removeClass("fadeInLeft").addClass("fadeOut");
		$('.listado-actividad li').removeClass("aparecer").addClass("fadeOut");
		this.sleep(500).then(()=>{
			this.actividad=[];
		});
	}

	crearActividad(){
		
		if(this.actividad.length > 0){
			let ids : String[];
			ids= new Array<String>();

			for(let ej of this.actividad)
				ids.push(ej._id);
			
			this.nuevaActividad =new Actividad();
			this.nuevaActividad.id_profesor=this.id_profesor;
			this.nuevaActividad.profesor= this.user.nombre + " " + this.user.apellidos;
			this.nuevaActividad.fecha_creacion= new Date();
			this.nuevaActividad.ejercicios=ids;
			this.nuevaActividad.visible=false;
			this.nuevaActividad.propuesta=false;
			this.modalActividad = true;
    		setTimeout(() => this.visibleAnimate = true);
		}else{
			this.message="Debe seleccionar al menos un ejercicio";
			this.modalMessage=true;
			setTimeout(() => this.visibleAnimate = true, 300);

		}

		
		
	}


	cancelarActividad(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalActividad = false, 300);

		this.nuevaActividad= null;
	}

	guardarActividad(){
	
		this._actividadService.addActividad(this.nuevaActividad).subscribe(
			result => {
				
				if(!result.respuesta){
					this.message="Error en el servidor creando la actividad";
					this.modalMessage=true;
					setTimeout(() => this.visibleAnimate = true, 300);
				}
				else{
					this.message="Se ha creado la actividad";
					this.modalMessage=true;
					setTimeout(() => this.visibleAnimate = true, 300);
					this.ngOnInit();
					this.vaciarLista();
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error al guardar actividad');
				}
			}
		);
		

		this.visibleAnimate = false;
    	setTimeout(() => this.modalActividad = false, 300);
		this.ngOnInit();
	}

	showEjercicio(ejercicio: Ejercicio){
    	this.modalEjercicio = true;
    	setTimeout(() => this.visibleAnimate = true);
		this.ejerAbrir=ejercicio;
  	}

	showActividad(actividad: Actividad){
		this.modalVerActividad = true;
		setTimeout(() => this.visibleAnimate = true);
		this.actAbrir=actividad;
  	}

  	hideEjercicio(){
    	this.visibleAnimate = false;
    	setTimeout(() => this.modalEjercicio = false, 300);
  	}

	hideActividad(){
		this.visibleAnimate = false;
		setTimeout(() => this.modalVerActividad = false, 300);
  	}

	abrirBorrarEjercicio(ejercicio: Ejercicio){
		this.ejerBorrar= ejercicio;
		this.modalBorrarEjercicio = true;
    	setTimeout(() => this.visibleAnimate = true);
	}

	borrarEjercicio(){
		this._ejercicioService.borrarEjercicio(this.ejerBorrar._id).subscribe(
			result=>{
				var id= this.ejerBorrar._id;
				if(result.respuesta == 'ok'){
					for(var i=0; i < this.pagedItemsEjers.length; i++){
						if(this.pagedItemsEjers[i]._id == this.ejerBorrar._id){
							this.pagedItemsEjers.splice(i,1);
						}
					}

					for(var i=0; i < this.ejersAMostrar.length; i++){
						if(this.ejersAMostrar[i]._id == this.ejerBorrar._id){
							this.ejersAMostrar.splice(i,1);
						}
					}
					this.cerrarBorrarEjercicio();
					this.ngOnInit();

					this._solucionService.borrarEjercicio(id).subscribe(
						result=>{
							if(result.respuesta =='ok'){
								this.ngOnInit();
							}
						},
						error=>{
							this.errorMessage= <any>error;

							if(this.errorMessage != null){
								console.log(this.errorMessage);
								alert('Error en la peticion de borrado del ejercicio en soluciones en el servidor');
							}
						}
					);

					this._actividadService.borrarEjercicio(id).subscribe(
						result=>{
							if(result.respuesta =='ok'){
								this.ngOnInit();
								this.seleccionaDatos(this.datosSeleccionados, this.tipoSeleccionado, this.pager.currentPage);
								this.message="El ejercicio ha sido eliminado";
								this.modalMessage=true;
								setTimeout(() => this.visibleAnimate = true, 300);
							}
						},
						error=>{
							this.errorMessage= <any>error;

							if(this.errorMessage != null){
								console.log(this.errorMessage);
								alert('Error en la peticion de borrado en el servidor');
							}
						}
					);


					

				}else{
					this.cerrarBorrarEjercicio();
					this.message=result.message;
					this.modalMessage=true;
					setTimeout(() => this.visibleAnimate = true, 300);
				}
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de borrado en el servidor');
				}

			}

		);
	}

	cerrarBorrarEjercicio(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalBorrarEjercicio = false, 300);
		this.ejerBorrar=null;
	}

	abrirModEjercicio(ejercicio: Ejercicio){
		this.ejerUpdate= ejercicio;
		this.modalModEjer = true;
    	setTimeout(() => this.visibleAnimate = true);
	}

	updateEjercicio(){
		this._ejercicioService.updateEjercicio(this.ejerUpdate).subscribe(

			result=>{
				if(result.respuesta == 'ok'){
					this.cerrarUpdateEjercicio();
					this.seleccionaDatos(this.datosSeleccionados, this.tipoSeleccionado, this.pager.currentPage);
					this.message="El ejercicio ha sido actualizado";
					this.modalMessage=true;
					setTimeout(() => this.visibleAnimate = true, 300);
					
				}
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de borrado en el servidor');
				}
			}

		);

	}

	cerrarUpdateEjercicio(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalModEjer = false, 300);
		this.ejerUpdate={};
	}

	cerrarModalMessage(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalMessage = false, 300);
		this.message="";
	}

	aplicaValoresLogicos(){
		let frase= this.ejerUpdate.fraseATraducir;
		this.valoresLogico = frase.split(" ");
	}

	addFLogico(){
		if(this.tipoLogico != "" && this.valorLogico != ""){
			if(this.ejerUpdate.solucionFLogico != "")
				this.ejerUpdate.solucionFLogico+=",";
			this.ejerUpdate.solucionFLogico+=this.tipoLogico + "(" + this.valorLogico + ")";
			this.tipoLogico="";
			this.valorLogico="";
		}
	}

	addSeparator(event: KeyboardEvent){
		let key = event.key;
		if(event.keyCode == 32) {
            this.ejerUpdate.solucionFPatron+=" +";
        }

	}

	cargarModificacion(actividad: Actividad){
		this.modificando=true;
		this.updateActividad= actividad;

		for(var act of this.pagedItemsActs){
			act.marcado=false;
		}
		actividad.marcado=true;
		
		for(var ej of actividad.ejercicios){
			this.actividad.push(ej);
		}


	}

	cancelarModificacionActividad(){
		for(var act of this.pagedItemsActs){
			act.marcado=false;
		}

		this.vaciarLista();

		$('.listado-actividad li').removeClass("fadeInLeft").addClass("fadeOut");
		this.sleep(500).then(()=>{
			this.actividad=[];
		});

		//this.updateActividad=new Actividad();
		this.modificando=false;
		
	}

	actualizarActividad(){
		if(this.actividad.length > 0){
			/*let ids : String[];
			ids= new Array<String>();

			for(let ej of this.actividad)
				ids.push(ej._id);*/

			this.updateActividad.ejercicios=this.actividad;

			this.modalUpdateActividad = true;
    		setTimeout(() => this.visibleAnimate = true);

		}

	}


	autorizarUpdateActividad(){
		//Implementar metodo
		this.cerrarUpdateActividad();
		this._actividadService.updateActividad(this.updateActividad).subscribe(
			result=>{
				if(result.respuesta == 'ok'){
					this.cancelarModificacionActividad();
					for(var a of this.actsAMostrar){
						if(a._id ==result.actividadUpdated._id)
							a= result.actividadUpdated;
					}
					this.updateActividad= result.actividadUpdated;
					this.message="La actividad ha sido actualizada";
					this.modalMessage=true;
					setTimeout(() => this.visibleAnimate = true, 300);
					this.seleccionaDatos(this.datosSeleccionados, this.tipoSeleccionado, this.pager.currentPage);
					
				}
			},
			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de borrado en el servidor');
				}
			}
		);

	}

	cerrarUpdateActividad(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalUpdateActividad = false, 300);

	}

	dropEjercicio(event, ejercicio:Ejercicio, i:number){
		let posDragado= event.dragData;
		//alert("Cambio el de la posicion " +posDragado + " a la posicion " + i);

		let aux= this.actividad[posDragado];
		this.actividad[posDragado]= ejercicio;
		this.actividad[i]= aux;
	}


	abrirBorrarActividad(actividad: Actividad){
		
		this.deleteAct= actividad;

		this.modalDeleteActividad = true;
		setTimeout(() => this.visibleAnimate = true);

	}

	cerrarDeleteActividad(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalDeleteActividad = false, 300);
	}

	deleteActividad(){

		this._actividadService.deleteActividad(this.deleteAct._id).subscribe(

			result=>{
				if(result.respuesta == 'ok'){
					var id= this.deleteAct._id;

					for(var i=0; i < this.pagedItemsActs.length; i++){
						if(this.pagedItemsActs[i]._id == this.deleteAct._id){
							this.pagedItemsActs.splice(i,1);
						}
					}

					for(var i=0; i < this.actsAMostrar.length; i++){
						if(this.actsAMostrar[i]._id == this.deleteAct._id){
							this.actsAMostrar.splice(i,1);
						}
					}

					this.cerrarDeleteActividad();
					this.ngOnInit();					
					this.deleteAct= new Actividad();
					
					this.message="La actividad ha sido eliminada";
					this.modalMessage=true;
					setTimeout(() => this.visibleAnimate = true, 300);
					this.seleccionaDatos(this.datosSeleccionados, this.tipoSeleccionado, this.pager.currentPage);

					//se borran las soluciones de dicha actividad si las hubiera
					this._solucionService.deleteSolucionByActividad(id).subscribe();
					
				}
			},
			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion de borrado en el servidor');
				}
			}
		);
	}

	verBusquedaSoluciones(){
		this.buscarSoluciones=true;
	}

	saliendoDeBuscarSoluciones(){
		this.buscarSoluciones=false;

	}

	abrirBuscarEjers(){
		this.modalBuscarEjer = true;
		setTimeout(() => this.visibleAnimate = true);
	}

	cerrarBuscarEjercicios(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalBuscarEjer = false, 300);
	}

	buscarEjercicios(){
        
        this._ejercicioService.getByCriteria(this.criteriaEjercicios).subscribe(

            result=>{

                this.ejersAMostrar= result.ejercicios;
				this.mostrarListaActs=false;
				this.mostrarListaEjers=true;
				if(this.ejersAMostrar.length > 0){
					this.datosAMostrar="Resultado de la busqueda";
					this.setPageEjers(1);
					this.modalBuscarEjer=false;
				}else{
					this.datosAMostrar="No se han encontrado resultados...";
					this.ejersAMostrar=[];
					this.pagedItemsEjers=[];
					this.setPageEjers(-1);
					//this.msgBusqueda="No hay soluciones para este criterio de busqueda";
					this.modalBuscarEjer=false;
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

	limpiarFiltroEjers(){
		this.criteriaEjercicios= new CriteriaEjercicios();
	}


	abrirBuscarActs(){
		this.modalBuscarActs = true;
		setTimeout(() => this.visibleAnimate = true);
	}

	cerrarBuscarActividades(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalBuscarActs = false, 300);
	}


	buscarActividades(){
        
        this._actividadService.getByCriteria(this.criteriaActividades).subscribe(

            result=>{

                this.actsAMostrar= result.actividades;
				this.mostrarListaEjers=false;
				this.mostrarListaActs=true;
				
				if(this.actsAMostrar.length > 0){
					this.datosAMostrar="Resultado de la busqueda";
					this.setPageActs(1);
					this.modalBuscarActs=false;
				}else{
					this.datosAMostrar="No se han encontrado resultados...";
					this.actsAMostrar=[];
					this.pagedItemsActs=[];
					this.setPageActs(-1);
					//this.msgBusqueda="No hay soluciones para este criterio de busqueda";
					this.modalBuscarActs=false;
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


	limpiarFiltroActs(){
		this.criteriaActividades= new CriteriaActividades();
	}

	ordenaEjerTitulo(){

		this.pagedItemsEjers= _.sortBy(this.pagedItemsEjers,"titulo");
	}

	ordenaEjerFecha(){
		this.pagedItemsEjers= _.sortBy(this.pagedItemsEjers,"fechaCreacion");
	}

	ordenaEjerNivel(){
		this.pagedItemsEjers= _.sortBy(this.pagedItemsEjers,"nivel");
	}

	ordenaEjerReverse(){
		this.pagedItemsEjers.reverse();

	}
	
}
