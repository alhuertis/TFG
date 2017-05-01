//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {ProfesorService} from '../services/profesor.service';
import {Actividad} from '../models/actividad';
import {Profesor} from '../models/profesor';

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

	public errorMessage: string;

	

	
	

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

}