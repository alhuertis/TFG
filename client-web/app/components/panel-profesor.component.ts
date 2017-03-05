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

	//Totales
	public nEjercicios: number;

	//Mi coleccion
	public miColeccion: Ejercicio[];
	public nMiColeccion: number;

	//Niveles
	public miColeccionNivelA: Ejercicio[];
	public nMiColeccionNivelA: number;
	public miColeccionNivelM: Ejercicio[];
	public nMiColeccionNivelM: number;
	public miColeccionNivelB: Ejercicio[];
	public nMiColeccionNivelB: number;

	//Tipos
	public miColeccionTipo1: Ejercicio[];
	public nMiColeccionTipo1: number;
	public miColeccionTipo2: Ejercicio[];
	public nMiColeccionTipo2: number;
	public miColeccionTipo3: Ejercicio[];
	public nMiColeccionTipo3: number;
	public miColeccionTipo4: Ejercicio[];
	public nMiColeccionTipo4: number;

	
	

	constructor(
			private _ejercicioService: EjercicioService

	){
		this.title= "Panel de profesores";
		this.user="Antonio Sarasa";
		this.id_profesor= "000001"
		
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
							$(this).children().children().toggle();
						}
					})
					branch.children().children().toggle();
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
		$('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});
		$('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});

	}//fin ngAfterViewInit


}
