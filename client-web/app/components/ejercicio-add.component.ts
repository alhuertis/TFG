// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';


import {EjercicioService} from '../services/ejercicio.service';
import {Ejercicio} from '../models/ejercicio';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'ejercicio-add',
    templateUrl:'app/views/ejercicio-add.html',
    providers: [EjercicioService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class EjercicioAddComponent implements OnInit{ 

	public ejercicio: Ejercicio;
	public errorMessage: string;
	public niveles= ['Bajo', 'Medio', 'Avanzado'];
	public tipos=[1,2,3,4];
	public user: string;

	public _id: string;
	public id_profesor: string;
	public titulo: string;
	public nivel: string;
	public tipo: number;
	public autor: string;
	public institucion_profesor: string;
	public fechaCreacion: Date;
	public fechaModificacion: Date;
	public enunciado: string;
	public fraseATraducir: string;
	public solucionFLogico: string;
	public solucionFPatron: string;
	public solucionPEspanol: string;
	public solucionPLatin: string;

	constructor(
		private _ejercicioService: EjercicioService,
		private _route: ActivatedRoute,
		private _router: Router
	){

		this.titulo= "Crear ejercicio";
		this.user="Antonio Sarasa";
		this.id_profesor= "000001"
		
	}

	ngOnInit(){

		//Lo ponemos asi para rellenarlo con el chuwidatabindin
		this.ejercicio= new Ejercicio("","","","",null,"Antonio Sarasa","UCM",new Date(),new Date(),"","","","","","");

	}

	public onSubmit(){
		console.log(this.ejercicio);
		this._ejercicioService.addEjercicio(this.ejercicio).subscribe(

			response =>{
				

				if(!response.ejercicio){
					alert('Error en el servidor')
				}
				else{

					this.ejercicio= response.ejercicio;
					this._router.navigate(['/']);
				}

			},

			error =>{
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion');
				}
			}
		);
	}// fin onSubmit



	

}