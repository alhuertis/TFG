//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {ProfesorService} from '../services/profesor.service';
import {Actividad} from '../models/actividad';
import {Profesor} from '../models/profesor';
import {TruncatePipe} from './truncate-pipe.component';

import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-alumno',
	templateUrl: 'app/views/panel-alumno.html',
	providers: [ActividadService, ProfesorService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/menu-profesor.css'],
}) 

export class  PanelAlumnoComponent implements OnInit{

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
	public actividadesAMostrar: Actividad[];
	public datosAMostrar: String;

	public errorMessage: string;

	// pager object
    pager: any = {};
    // paged items
    public pagedItems: Actividad[];
	public mostrarLista: Boolean;

	

	
	

	constructor(
			private _actividadService: ActividadService,
			private _profesorService: ProfesorService

	){
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
		this.actividadesAMostrar=new Array<Actividad>();
		this.datosAMostrar= new String();
		this.mostrarLista=false;
		
	}


	ngOnInit(){

		//Obtencion de datos
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

	seleccionaDatos(datos: any, profesor: boolean, tipo: String){
		
		if(profesor){
			if(tipo == 'D'){
				this._actividadService.getByIdProfesorDisp(datos._id).subscribe(
					result =>{
						this.actividadesAMostrar= result.actividades;

						if(!this.actividadesAMostrar){
							alert('Error en el servidor');
						}else{
							this.datosAMostrar= "Actividades disponibles de " + datos.nombre + " ("+ this.actividadesAMostrar.length+")";
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
							this.datosAMostrar= "Actividades propuestas de " + datos.nombre + " ("+ this.actividadesAMostrar.length+")";
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
		}
		
		this.mostrarLista=true;
		this.setPage(1);
	}

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._actividadService.getPager(this.actividadesAMostrar.length, page);
        // get current page of items
        this.pagedItems = this.actividadesAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }
}