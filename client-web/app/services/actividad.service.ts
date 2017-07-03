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
		//this.url= 'http://localhost:3678/api2/';
        this.url= 'http://'+window.location.hostname+':3678/api2/';
	}

	getActividades(){
		return this._http.get(this.url+'actividades').map(res => res.json());
	}

	getActividad(id: string){
		return this._http.get(this.url+'actividad/'+id).map(res => res.json());
	}

    cargarActividad(id: string){
		return this._http.get(this.url+'cargarActividad/'+id).map(res => res.json());
	}

	borrarEjercicio(id: String){
		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.put(this.url+'actividad-ejercicio/'+id, {headers: headers}).map(res=> res.json());
	}

	deleteActividad(id: String){
		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.delete(this.url+'actividad/'+id, {headers: headers}).map(res=> res.json());
	}

    getDisponibles(){
		return this._http.get(this.url+'actividad-disponibles').map(res => res.json());
	}

    getPropuestas(){
		return this._http.get(this.url+'actividad-propuestas').map(res => res.json());
	}

    getPropuestasByApertura(){
		return this._http.get(this.url+'actividad-propuestasByApertura').map(res => res.json());
	}

    getPropuestasByCierre(){
		return this._http.get(this.url+'actividad-propuestasByCierre').map(res => res.json());
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

    getByIdProfesorDisp(id: String){
		return this._http.get(this.url+'actividad-idProfesorDisp/'+id).map(res => res.json());
	}

    getByIdProfesorProp(id: String){
		return this._http.get(this.url+'actividad-idProfesorProp/'+id).map(res => res.json());
	}

    addActividad(actividad: Actividad){
		let json = JSON.stringify(actividad);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'actividad', params, {headers: headers}).map(res=> res.json());
	}

	 updateActividad(actividad: Actividad){
		let json = JSON.stringify(actividad);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.put(this.url+'actividad/' + actividad._id , params, {headers: headers}).map(res=> res.json());
	}

     //Profesores
    getActsMiColeccion(id_profesor: string){
		return this._http.get(this.url+'actividad-miColeccion/'+id_profesor).map(res => res.json());
	}

    getActsMiColeccionNivelA(id_profesor: string){
		return this._http.get(this.url+'actividad-miColeccionNivelA/'+id_profesor).map(res => res.json());
	}

    getActsMiColeccionNivelM(id_profesor: string){
		return this._http.get(this.url+'actividad-miColeccionNivelM/'+id_profesor).map(res => res.json());
	}

    getActsMiColeccionNivelB(id_profesor: string){
		return this._http.get(this.url+'actividad-miColeccionNivelB/'+id_profesor).map(res => res.json());
	}

    getActsVisibles(id_profesor: string){
		return this._http.get(this.url+'actividad-actVisibles/'+id_profesor).map(res => res.json());
	}

    getActsVisiblesNivelA(id_profesor: string){
		return this._http.get(this.url+'actividad-actVisiblesnivelA/'+id_profesor).map(res => res.json());
	}

    getActsVisiblesNivelM(id_profesor: string){
		return this._http.get(this.url+'actividad-actVisiblesnivelM/'+id_profesor).map(res => res.json());
	}

    getActsVisiblesNivelB(id_profesor: string){
		return this._http.get(this.url+'actividad-actVisiblesnivelB/'+id_profesor).map(res => res.json());
	}

    getActsNoVisibles(id_profesor: string){
		return this._http.get(this.url+'actividad-actNoVisibles/'+id_profesor).map(res => res.json());
	}

    getActsNoVisiblesNivelA(id_profesor: string){
		return this._http.get(this.url+'actividad-ActNoVisiblesNivelA/'+id_profesor).map(res => res.json());
	}

    getActsNoVisiblesNivelM(id_profesor: string){
		return this._http.get(this.url+'actividad-actNoVisiblesNivelM/'+id_profesor).map(res => res.json());
	}

    getActsNoVisiblesNivelB(id_profesor: string){
		return this._http.get(this.url+'actividad-actNoVisiblesNivelB/'+id_profesor).map(res => res.json());
	}

    getActsOtrasColecciones(id_profesor: string){
		return this._http.get(this.url+'actividad-otrasColecciones/'+id_profesor).map(res => res.json());
	}

    getActsOtrasColeccionesNivelA(id_profesor: string){
		return this._http.get(this.url+'actividad-otrasColeccionesNivelA/'+id_profesor).map(res => res.json());
	}

    getActsOtrasColeccionesNivelM(id_profesor: string){
		return this._http.get(this.url+'actividad-otrasColeccionesNivelM/'+id_profesor).map(res => res.json());
	}

    getActsOtrasColeccionesNivelB(id_profesor: string){
		return this._http.get(this.url+'actividad-otrasColeccionesNivelB/'+id_profesor).map(res => res.json());
	}

	getByCriteria(criteria: any){
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'actividades-byCriteria', criteria, {headers: headers}).map(res => res.json());
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