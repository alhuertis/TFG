//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {Ejercicio} from '../models/ejercicio';

//los decoradores no tienen punto y coma
@Component({

	selector: 'ejercicio-mostrar',
	templateUrl: 'app/views/ejercicio-mostrar.html',
	providers: [EjercicioService] //Necesitamos esto para poder usar los metodos

}) 

export class  EjercicioMostrarComponent implements OnInit{

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
	}

	public numEjercicios(){
		return this.ejercicios.length;
	}
}