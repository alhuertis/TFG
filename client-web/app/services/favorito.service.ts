//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//Nos permite recoger respues ajax y esas cosas
import {Observable} from 'rxjs/Observable';
//Importamos el modelo del cliente
import {Favorito} from '../models/favorito';

//Ponemos esto antes de exportar la clase para que sea injectable
@Injectable()
export class FavoritoService{
	//va a tener la url de nuestro api rest
	public url: string;

	constructor(private _http: Http){
		this.url= 'http://localhost:3678/api/';
	}

	getFavoritos(){
		return this._http.get(this.url+'favoritos').map(res => res.json());
	}

	getFavorito(id: string){
		console.log('Llamando a ' + this.url+'favorito/'+id);
		return this._http.get(this.url+'favorito/'+id).map(res => res.json());
	}

	addFavorito(favorito: Favorito){
		let json = JSON.stringify(favorito);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'favorito', params, {headers: headers}).map(res=> res.json());
	}
}