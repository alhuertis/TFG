//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {Ejercicio} from '../models/ejercicio';

declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-profesor',
	templateUrl: 'app/views/panel-profesor.html',
	providers: [EjercicioService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/menu-profesor.css'],
}) 

export class  PanelProfesorComponent implements OnInit{

	public title: string;
	public user: string;
	public id_profesor: string;
	public ejercicios: Ejercicio[];
	public loading: boolean;
	public errorMessage: string;
	public mostrarLista: boolean;
	public ejersAMostrar: Ejercicio[];
	public datosAMostrar: string;

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


	constructor(
			private _ejercicioService: EjercicioService

	){
		this.title= "Panel de profesores";
		this.user="Antonio Sarasa";
		this.id_profesor= "000001";
		this.mostrarLista=true;
		this.datosAMostrar="";
		
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
					branch.children().children().slideToggle(200);
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

	public seleccionaDatos(datos){
		switch(datos){
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


		}

		this.mostrarLista=true;

		
	}


}
