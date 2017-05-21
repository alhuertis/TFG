//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {SolucionService} from '../services/solucion.service';
import {ProfesorService} from '../services/profesor.service';
import {Actividad} from '../models/actividad';
import {Profesor} from '../models/profesor';
import {User} from '../models/user';
import {Solucion} from '../models/solucion';
import {TruncatePipe} from './truncate-pipe.component';

import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-alumno',
	templateUrl: 'app/views/panel-alumno.html',
	providers: [ActividadService, ProfesorService, SolucionService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/menu-profesor.css'],
}) 

export class  PanelAlumnoComponent implements OnInit{

	public user: User;

	public title: string;
	public profesores: Profesor[];
	public actividades: Actividad[];
	public disponibles: Actividad[];
	public disponiblesNBajo: Actividad[];
	public disponiblesNMedio: Actividad[];
	public disponiblesNAlto: Actividad[];
	public propuestas: Actividad[];
	public propuestasByApertura: Actividad[];
	public propuestasByCierre: Actividad[];

	public actividadesResueltas: Solucion[];
	public actividadesResueltasNB: Solucion[];
	public actividadesResueltasNM: Solucion[];
	public actividadesResueltasNA: Solucion[];
	public actividadesSinResolver: Solucion[];
	public actividadesSinResolverNB: Solucion[];
	public actividadesSinResolverNM: Solucion[];
	public actividadesSinResolverNA: Solucion[];
	
	public datosAMostrar: String;

	public errorMessage: string;

	// pager object (paginador)
    pager: any = {};
	pagerSolucion: any = {};
	//Las que se muestran
	public actividadesAMostrar: Actividad[];
	public solucionesAMostrar: Solucion[];
    // Las que se muestran (paginadas)
    public pagedActividades: Actividad[];
	public pagedSoluciones: Solucion[];
	public mostrarActividades: Boolean;
	public mostrarSoluciones: Boolean;

	

	
	

	constructor(
			private _actividadService: ActividadService,
			private _profesorService: ProfesorService,
			private _solucionService: SolucionService

	){
		this.user= JSON.parse(localStorage.getItem('currentUser')).user;
		this.title= "Panel de alumno";
		this.actividades=[];
		this.profesores=[];
		this.disponibles=new Array<Actividad>();
		this.disponiblesNBajo=new Array<Actividad>();
		this.disponiblesNMedio=new Array<Actividad>();
		this.disponiblesNAlto=new Array<Actividad>();
		this.propuestas=new Array<Actividad>();
		this.propuestasByApertura=new Array<Actividad>();
		this.propuestasByCierre=new Array<Actividad>();
		this.actividadesResueltas=[];
		this.actividadesResueltasNB=[];
		this.actividadesResueltasNM=[];
		this.actividadesResueltasNA=[];
		this.actividadesSinResolver=[];
		this.actividadesSinResolverNB=[];
		this.actividadesSinResolverNM=[];
		this.actividadesSinResolverNA=[];
		this.actividadesAMostrar=[];
		this.datosAMostrar= new String();
		this.mostrarActividades=false;
		this.mostrarSoluciones=false;
		
	}


	ngOnInit(){


		this._solucionService.getTerminadasById(this.user._id).subscribe(

			result=>{
				this.actividadesResueltas= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._solucionService.getTerminadasByIdNB(this.user._id).subscribe(

			result=>{
				this.actividadesResueltasNB= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._solucionService.getTerminadasByIdNM(this.user._id).subscribe(

			result=>{
				this.actividadesResueltasNM= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._solucionService.getTerminadasByIdNA(this.user._id).subscribe(

			result=>{
				this.actividadesResueltasNA= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);


		this._solucionService.getSinTerminarById(this.user._id).subscribe(

			result=>{
				this.actividadesSinResolver= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._solucionService.getSinTerminarByIdNB(this.user._id).subscribe(

			result=>{
				this.actividadesSinResolverNB= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._solucionService.getSinTerminarByIdNM(this.user._id).subscribe(

			result=>{
				this.actividadesSinResolverNM= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._solucionService.getSinTerminarByIdNA(this.user._id).subscribe(

			result=>{
				this.actividadesSinResolverNA= result.soluciones;
			},

			error=>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);
		
		this._actividadService.getActividades().subscribe(
			result =>{
				console.log(result);
				this.actividades= result.actividades;

				if(!this.actividades){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		//Obtener profesores
		this._profesorService.getProfesores().subscribe(
			result =>{
				console.log(result);
				this.profesores= result.profesores;

				if(!this.profesores){
					alert('Error al obtener profesores');
				}
			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getDisponibles().subscribe(
			result =>{
				console.log(result);
				this.disponibles= result.actividades;

				if(!this.disponibles){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getDisponiblesNB().subscribe(
			result =>{
				console.log(result);
				this.disponiblesNBajo= result.actividades;

				if(!this.disponiblesNBajo){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getDisponiblesNM().subscribe(
			result =>{
				console.log(result);
				this.disponiblesNMedio= result.actividades;

				if(!this.disponiblesNMedio){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getDisponiblesNA().subscribe(
			result =>{
				console.log(result);
				this.disponiblesNAlto= result.actividades;

				if(!this.disponiblesNAlto){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getPropuestas().subscribe(
			result =>{
				console.log(result);
				this.propuestas= result.actividades;

				if(!this.propuestas){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getPropuestasByApertura().subscribe(
			result =>{
				console.log(result);
				this.propuestasByApertura= result.actividades;

				if(!this.propuestasByApertura){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
				}
			}
		);

		this._actividadService.getPropuestasByCierre().subscribe(
			result =>{
				console.log(result);
				this.propuestasByCierre= result.actividades;

				if(!this.propuestasByCierre){
					alert('Error en el servidor');
				}
			},
			error => {
				this.errorMessage= <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
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
	}//fin ngAfterViewInit

	seleccionaDatosActividades(datos: any, profesor: boolean, tipo: String){
		this.mostrarActividades=false;
		this.mostrarSoluciones=false;
		if(profesor){
			if(tipo == 'D'){
				this._actividadService.getByIdProfesorDisp(datos._id).subscribe(
					result =>{
						this.actividadesAMostrar= result.actividades;

						if(!this.actividadesAMostrar){
							alert('Error en el servidor');
						}else{
							if(this.actividadesAMostrar.length > 0){
								this.datosAMostrar= "Actividades disponibles de " + datos.nombre + " ("+ this.actividadesAMostrar.length+")";
								this.mostrarActividades=true;
								this.setPage(1);
							}
						}
					
					},
					error => {
						this.errorMessage= <any>error;
						if(this.errorMessage != null){
							console.log(this.errorMessage);
							alert(this.errorMessage);
						}
					}
				);
			}else if(tipo == 'P'){
				this._actividadService.getByIdProfesorProp(datos._id).subscribe(
					result =>{
						this.actividadesAMostrar= result.actividades;

						if(!this.actividadesAMostrar){
							alert('Error en el servidor');
						}else{
							if(this.actividadesAMostrar.length > 0){
								this.datosAMostrar= "Actividades propuestas de " + datos.nombre + " ("+ this.actividadesAMostrar.length+")";
								this.mostrarActividades=true;
								this.setPage(1);
							}
						}
					
					},
					error => {
						this.errorMessage= <any>error;
						if(this.errorMessage != null){
							console.log(this.errorMessage);
							alert(this.errorMessage);
						}
					}
				);
			}

		}else{
			switch(datos){
				case 'disponibles':
					this.actividadesAMostrar=this.disponibles;
					this.datosAMostrar= "Total disponibles";
					break;
				case 'disponibles nb':
					this.actividadesAMostrar=this.disponiblesNBajo;
					this.datosAMostrar= "Disponibles nivel bajo";
					break;
				case 'disponibles nm':
					this.actividadesAMostrar=this.disponiblesNMedio;
					this.datosAMostrar= "Disponibles nivel medio";
					break;
				case 'disponibles na':
					this.actividadesAMostrar=this.disponiblesNAlto;
					this.datosAMostrar= "Disponibles nivel avanzado";
					break;

				case 'propuestas':
					this.actividadesAMostrar=this.propuestas;
					this.datosAMostrar= "Actividades propuestas";
					break;

				case 'propuestas apertura':
					this.actividadesAMostrar=this.propuestasByApertura;
					this.datosAMostrar= "Actividades propuestas por orden de apertura";
					break;

				case 'propuestas cierre':
					this.actividadesAMostrar=this.propuestasByCierre;
					this.datosAMostrar= "Actividades propuestas por orden cierre";
					break;	
			}
			this.mostrarActividades=true;
			this.setPage(1);
		}
		
		
	}

	seleccionaDatosSoluciones(datos: any, profesor: boolean, tipo: String){
		this.mostrarActividades=false;
		this.mostrarSoluciones=false;

		if(profesor){

			if(tipo == 'R'){
				this._solucionService.getTerminadasByProfesor(this.user._id, datos._id).subscribe(
					result =>{
						this.solucionesAMostrar= result.soluciones;

						if(!this.solucionesAMostrar){
							alert('Error en el servidor');
						}else{
							if(this.solucionesAMostrar.length > 0){
								this.datosAMostrar= "Actividades resueltas de " + datos.nombre + " ("+ this.solucionesAMostrar.length+")";
								this.mostrarActividades=false;
								this.mostrarSoluciones=true;
								this.setPageSoluciones(1);
							}
						}
					
					},
					error => {
						this.errorMessage= <any>error;
						if(this.errorMessage != null){
							console.log(this.errorMessage);
							alert(this.errorMessage);
						}
					}
				);

			}else if(tipo == 'SR'){
				this._solucionService.getSinTerminarByProfesor(this.user._id, datos._id).subscribe(
					result =>{
						this.solucionesAMostrar= result.soluciones;

						if(!this.solucionesAMostrar){
							alert('Error en el servidor');
						}else{
							if(this.solucionesAMostrar.length > 0){
								this.datosAMostrar= "Actividades sin terminar de " + datos.nombre + " ("+ this.solucionesAMostrar.length+")";
								this.mostrarActividades=false;
								this.mostrarSoluciones=true;
								this.setPageSoluciones(1);
							}
						}
					
					},
					error => {
						this.errorMessage= <any>error;
						if(this.errorMessage != null){
							console.log(this.errorMessage);
							alert(this.errorMessage);
						}
					}
				);
			}
		}
		else{
			switch(datos){
				case 'resueltas':
					this.solucionesAMostrar=this.actividadesResueltas;
					this.datosAMostrar= "Mis actividades resueltas";
					break;

				case 'resueltasNB':
					this.solucionesAMostrar= this.actividadesResueltasNB;
					this.datosAMostrar= "Mis actividades resueltas (nivel bajo)";
					break;

				case 'resueltasNM':
					this.solucionesAMostrar= this.actividadesResueltasNM;
					this.datosAMostrar= "Mis actividades resueltas (nivel medio)";
					break;

				case 'resueltasNA':
					this.solucionesAMostrar= this.actividadesResueltasNA;
					this.datosAMostrar= "Mis actividades resueltas (nivel avanzado)";
					break;

				case 'sin-resolver':
					this.solucionesAMostrar= this.actividadesSinResolver;
					this.datosAMostrar= "Mis actividades resueltas (nivel avanzado)";
					break;

				case 'sin-resolverNB':
					this.solucionesAMostrar= this.actividadesSinResolverNB;
					this.datosAMostrar= "Mis actividades sin terminar (nivel avanzado)";
					break;

				case 'sin-resolverNM':
					this.solucionesAMostrar= this.actividadesSinResolverNM;
					this.datosAMostrar= "Mis actividades sin terminar (nivel avanzado)";
					break;

				case 'sin-resolverNA':
					this.solucionesAMostrar= this.actividadesSinResolverNA;
					this.datosAMostrar= "Mis actividades sin resolver (nivel avanzado)";
					break;

			}
			this.mostrarSoluciones=true;
			this.setPageSoluciones(1);
		}

	}

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._actividadService.getPager(this.actividadesAMostrar.length, page);
        // get current page of items
        this.pagedActividades = this.actividadesAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }

	setPageSoluciones(page: number) {
        if (page < 1 || page > this.pagerSolucion.totalPages) {
            return;
        }

        // get pager object from service
       	this.pagerSolucion = this._actividadService.getPager(this.solucionesAMostrar.length, page);
        // get current page of items
        this.pagedSoluciones = this.solucionesAMostrar.slice(this.pagerSolucion.startIndex, this.pagerSolucion.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }
}