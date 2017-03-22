//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ActividadService} from '../services/actividad.service';
import {Actividad} from '../models/actividad';

declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-alumno',
	templateUrl: 'app/views/panel-alumno.html',
	providers: [ActividadService], //Necesitamos esto para poder usar los metodos
	styleUrls: ['../../assets/css/menu-profesor.css'],
}) 

export class  PanelAlumnoComponent implements OnInit{

	public title: string;
	public actividades: Actividad[];
	public actividadesNB: Actividad[];
	public actividadesNM: Actividad[];
	public actividadesNA: Actividad[];
	public loading: boolean;
	public errorMessage: string;
	public nActividades: number;
	public nBajos: number;
	public nMedios: number;
	public nAvanzados: number;

	
	

	constructor(
			private _actividadService: ActividadService

	){
		this.title= "Panel de alumno";
		this.actividades=[];
		this.nActividades=0;
		
	}


	ngOnInit(){

		//Obtencion de datos
		/*this._actividadService.getActividades().subscribe(
			result =>{
				console.log(result);
				this.actividades= result.actividades;

				if(!this.actividades){
					alert('Error en el servidor');
				}
				else{
					this.loading=false;
					this.nActividades= this.actividades.length;
				
				}

			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert(this.errorMessage);
					alert('Error todo tocho');
				}
			}*/

		//);
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


	public numActividades(){
		return this.actividades.length;
	}
}