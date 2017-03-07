//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {EjercicioService} from '../services/ejercicio.service';
import {Ejercicio} from '../models/ejercicio';

//los decoradores no tienen punto y coma
@Component({

	selector: 'listado-ejers',
	templateUrl: 'app/views/profesor-listar-ejercicios.html',
	providers: [EjercicioService] //Necesitamos esto para poder usar los metodos

}) 

export class  ListadoProfesorComponent implements OnInit{
	
	//@Input listaEjers;
	@Input() saludo: string;
	public loading: boolean;
	public errorMessage: string;
	public nEjercicios: number;

	
	

	constructor(
			private _ejercicioService: EjercicioService,

	){
	
		
		
	}


	ngOnInit(){
	
	}


}