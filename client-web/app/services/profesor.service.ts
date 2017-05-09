//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//Nos permite recoger respues ajax y esas cosas
import {Observable} from 'rxjs/Observable';
//Importamos el modelo del cliente
import {Profesor} from '../models/profesor';

import * as _ from 'underscore';

//Ponemos esto antes de exportar la clase para que sea injectable
@Injectable()
export class ProfesorService{
	//va a tener la url de nuestro api rest
	public url: string;

	constructor(private _http: Http){
		//this.url= 'http://localhost:3678/apiProfesor/';
		this.url = 'http://'+window.location.hostname+':3678/apiProfesor/';
	}

	getProfesores(){
		return this._http.get(this.url+'profesores').map(res => res.json());
	}

	getProfesor(_id: string){
		console.log('Llamando a ' + this.url+'profesor/'+_id);
		return this._http.get(this.url+'profesor/'+_id).map(res => res.json());
	}

}