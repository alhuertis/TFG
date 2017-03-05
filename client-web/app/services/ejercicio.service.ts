//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//Nos permite recoger respues ajax y esas cosas
import {Observable} from 'rxjs/Observable';
//Importamos el modelo del cliente
import {Ejercicio} from '../models/ejercicio';

//Ponemos esto antes de exportar la clase para que sea injectable
@Injectable()
export class EjercicioService{
	//va a tener la url de nuestro api rest
	public url: string;

	constructor(private _http: Http){
		this.url= 'http://localhost:3678/api/';
	}

	getEjercicios(){
		return this._http.get(this.url+'ejercicios').map(res => res.json());
	}

	getEjercicio(id: string){
		console.log('Llamando a ' + this.url+'ejercicio/'+id);
		return this._http.get(this.url+'ejercicio/'+id).map(res => res.json());
	}

	addEjercicio(ejercicio: Ejercicio){
		let json = JSON.stringify(ejercicio);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'ejercicio', params, {headers: headers}).map(res=> res.json());
	}

	getEjersMiColeccion(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccion/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionNivelA(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionNivelA/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionNivelM(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionNivelM/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionNivelB(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionNivelB/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionTipo1(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionTipo1/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionTipo2(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionTipo2/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionTipo3(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionTipo3/'+id_profesor).map(res => res.json());
	}

	getEjersMiColeccionTipo4(id_profesor: string){
		return this._http.get(this.url+'ejercicios/miColeccionTipo4/'+id_profesor).map(res => res.json());
	}
}