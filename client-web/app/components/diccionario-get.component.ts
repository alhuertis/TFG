//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {DiccionarioService} from '../services/diccionario.service';


import {TruncatePipe} from './truncate-pipe.component';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'diccionario-get',
	templateUrl: 'app/views/panel-profesor.html',
	providers: [DiccionarioService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/menu-profesor.css'],
}) 

export class  PanelProfesorComponent implements OnInit{

	
	// pager object
    pager: any = {};
    public errorMessage: string;

	constructor(
			private _diccionarioService: DiccionarioService

	){
		
		
	}


	ngOnInit(){
		//Obtencion de datos
		this._diccionarioService.getDiccionario().subscribe(
			result =>{
				console.log(result);
				/*this.ejercicios= result.ejercicios;

				if(!this.ejercicios){
					alert('Error en el servidor');
				}
				else{
					this.loading=false;
					this.nEjercicios= this.ejercicios.length;
					/*this.ejersAMostrar= this.ejercicios;
					this.datosAMostrar="Todos los ejercicios";
					this.mostrarLista=true;*/
            //}

			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion');
				}
			}

		); //fin getEjercicios (Todos)

		

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





	sleep(ms = 0) {
    	return new Promise(r => setTimeout(r, ms));
	}


	
}