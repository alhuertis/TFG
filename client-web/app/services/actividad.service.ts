//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//Nos permite recoger respues ajax y esas cosas
import {Observable} from 'rxjs/Observable';
//Importamos el modelo del cliente
import {Actividad} from '../models/actividad';

import * as _ from 'underscore';

//Ponemos esto antes de exportar la clase para que sea injectable
@Injectable()
export class ActividadService{
	//va a tener la url de nuestro api rest
	public url: string;

	constructor(private _http: Http){
		this.url= 'http://localhost:3678/api2/';
	}

	getActividades(){
		return this._http.get(this.url+'actividades').map(res => res.json());
	}

	getActividad(id: string){
		console.log('Llamando a ' + this.url+'actividad/'+id);
		return this._http.get(this.url+'actividad/'+id).map(res => res.json());
	}

    getDisponibles(){
		return this._http.get(this.url+'actividad-disponibles').map(res => res.json());
	}

    getDisponiblesNB(){
		return this._http.get(this.url+'actividad-disponiblesNB').map(res => res.json());
	}

    getDisponiblesNM(){
		return this._http.get(this.url+'actividad-disponiblesNM').map(res => res.json());
	}

    getDisponiblesNA(){
		return this._http.get(this.url+'actividad-disponiblesNA').map(res => res.json());
	}

    addActividad(actividad: Actividad){
		let json = JSON.stringify(actividad);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'actividad', params, {headers: headers}).map(res=> res.json());
	}

   /* getPager(totalItems: number, currentPage: number = 1, pageSize: number = 4) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }*/


}