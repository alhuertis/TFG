//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//Nos permite recoger respues ajax y esas cosas
import {Observable} from 'rxjs/Observable';
//Importamos el modelo del cliente
import {Ejercicio} from '../models/ejercicio';

import * as _ from 'underscore';

//Ponemos esto antes de exportar la clase para que sea injectable
@Injectable()
export class EjercicioService{
	//va a tener la url de nuestro api rest
	public url: string;

	constructor(private _http: Http){
		//this.url= 'http://localhost:3678/api/';
		this.url= 'http://'+window.location.hostname+':3678/api/';
	}

	existeFichero(url : any){
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'existe', url, {headers: headers}).map(res => res.json());
	}

	getEjercicios(){
		return this._http.get(this.url+'ejercicios').map(res => res.json());
	}

	getEjerciciosFecha(fecha1: Date, fecha2: Date){ 

			
		let params= {"fecha1":JSON.stringify(fecha1),
					"fecha2": JSON.stringify(fecha2)};

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'ejercicios', params, {headers: headers}).map(res=> res.json());
	}

	getEjercicio(id: string){
		return this._http.get(this.url+'ejercicio/'+id).map(res => res.json());
	}

	getEjerciciosTitulo(titulo: string){
		
		return this._http.get(this.url+'ejercicioTitulo/'+titulo).map(res => res.json());
	}

	getEjerciciosByIds(ids: any){
		
		let params= {ids: ids};
		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'ejercicios-byIds', params, {headers: headers}).map(res=> res.json());
	}

	addEjercicio(ejercicio: Ejercicio){
		let json = JSON.stringify(ejercicio);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'ejercicio', params, {headers: headers}).map(res=> res.json());
	}

	borrarEjercicio(id: String){
		return this._http.delete(this.url+'ejercicio/'+id).map(res => res.json());
	}

	updateEjercicio(model: any){
		let json = JSON.stringify(model);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.put(this.url+'ejercicio/'+model._id, params, {headers: headers}).map(res=> res.json());
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
	//Otras colecciones
	getEjersOtrasColecciones(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColecciones/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesNivelA(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesNivelA/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesNivelM(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesNivelM/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesNivelB(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesNivelB/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesTipo1(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesTipo1/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesTipo2(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesTipo2/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesTipo3(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesTipo3/'+id_profesor).map(res => res.json());
	}

	getEjersOtrasColeccionesTipo4(id_profesor: string){
		return this._http.get(this.url+'ejercicios/otrasColeccionesTipo4/'+id_profesor).map(res => res.json());
	}

	getByCriteria(criteria: any){
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'ejercicios-byCriteria', criteria, {headers: headers}).map(res => res.json());
    }

	getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
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
    }
}