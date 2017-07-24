// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';


import {EjercicioService} from '../services/ejercicio.service';
import {Ejercicio} from '../models/ejercicio';
import {User} from '../models/user';
 
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
	//public user: string;

	public user: User;

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

	public valoresLogico: String[];
	public tipoLogico: string;
	public valorLogico: string;

	public modalEjercicio: Boolean;
	public visibleAnimate: Boolean;

	constructor(
		private _ejercicioService: EjercicioService,
		private _route: ActivatedRoute,
		private _router: Router
	){

		this.titulo= "Crear ejercicio";
		//this.user="Antonio Sarasa";
		this.user= JSON.parse(localStorage.getItem('currentUser')).user;
		//this.id_profesor= "00001";
		this.id_profesor= this.user._id;
		this.tipoLogico="";
		this.valorLogico="";
		this.valoresLogico=[];
		this.modalEjercicio= false;
		this.visibleAnimate=false;
		
	}

	ngOnInit(){

		//Lo ponemos asi para rellenarlo con el chuwidatabindin
		this.ejercicio= new Ejercicio("",this.id_profesor,"","",1, this.user.nombre + " " + this.user.apellidos, this.user.institucion_educativa,new Date(),new Date(),"","","","","","","", false);
		
	}

	aplicaValoresLogicos(){
		let frase= this.ejercicio.fraseATraducir;
		this.valoresLogico = frase.split(" ");
	}

	addFLogico(){
		if(this.tipoLogico != "" && this.valorLogico != ""){
			if(this.ejercicio.solucionFLogico != "")
				this.ejercicio.solucionFLogico+=",";
			this.ejercicio.solucionFLogico+=this.tipoLogico + "(" + this.valorLogico + ")";
			this.tipoLogico="";
			this.valorLogico="";
		}
	}

	addSeparator(event: KeyboardEvent){
		let key = event.key;
		if(event.keyCode == 32) {
            this.ejercicio.solucionFPatron+="+ ";
        }

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
					//this._router.navigate(['/']);
					this.modalEjercicio = true;
					setTimeout(() => this.visibleAnimate = true);
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


	cerrarModalEjercicio(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalEjercicio = false, 300);
		this.ejercicio= new Ejercicio("",this.id_profesor,"","",1, this.user.nombre + " " + this.user.apellidos, this.user.institucion_educativa,new Date(),new Date(),"","","","","","","", false);
	}
	

}