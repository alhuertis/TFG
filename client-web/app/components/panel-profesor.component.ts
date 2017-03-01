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
	public ejercicios: Ejercicio[];
	public loading: boolean;
	public errorMessage: string;
	public nEjercicios: number;

	
	

	constructor(
			private _ejercicioService: EjercicioService

	){
		this.title= "Panel de profesores";
		
	}


	ngOnInit(){


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



		console.log('panel-profesor cargado!!');
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

		);
	}//fin ngOnInit


	public numEjercicios(){
		return this.ejercicios.length;
	}
}
