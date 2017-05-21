//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//Nos permite recoger respues ajax y esas cosas
import {Observable} from 'rxjs/Observable';
//Importamos el modelo del cliente
import {Solucion} from '../models/solucion';

import * as _ from 'underscore';

//Ponemos esto antes de exportar la clase para que sea injectable
@Injectable()
export class SolucionService{
	//va a tener la url de nuestro api rest
	public url: string;

	constructor(private _http: Http){
		//this.url= 'http://localhost:3678/api2/';
        this.url= 'http://'+window.location.hostname+':3678/apiSolucion/';
	}

    saveSolucion(solucion : Solucion){
        let json = JSON.stringify(solucion);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url+'solucion', params, {headers: headers}).map(res=> res.json());
    }
    
    updateSolucion(solucion : Solucion){
        let json = JSON.stringify(solucion);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

		return this._http.put(this.url+'solucion/'+solucion._id, params, {headers: headers}).map(res=> res.json());
    }

	getSoluciones(){
		return this._http.get(this.url+'soluciones').map(res => res.json());
	}

	getSolucion(id: string){
		return this._http.get(this.url+'solucion/'+id).map(res => res.json());
	}

    getTerminadasById(model: any){
        
		let params= {_id: model};

		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-terminadasId', params, {headers: headers}).map(res => res.json());

    }

    getTerminadasByIdNB(model: any){
        
		let params= {_id: model};

		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-terminadasIdNB', params, {headers: headers}).map(res => res.json());

    }

     getTerminadasByIdNM(model: any){
        
		let params= {_id: model};

		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-terminadasIdNM', params, {headers: headers}).map(res => res.json());

    }

     getTerminadasByIdNA(model: any){
        
		let params= {_id: model};

		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-terminadasIdNA', params, {headers: headers}).map(res => res.json());

    }

    getSinTerminarById(model: any){

        let params= {_id: model};
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-sinTerminarId', params, {headers: headers}).map(res => res.json());

    }


    getSinTerminarByIdNB(model: any){

        let params= {_id: model};
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-sinTerminarIdNB', params, {headers: headers}).map(res => res.json());

    }


    getSinTerminarByIdNM(model: any){

        let params= {_id: model};
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-sinTerminarIdNM', params, {headers: headers}).map(res => res.json());

    }


    getSinTerminarByIdNA(model: any){

        let params= {_id: model};
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-sinTerminarIdNA', params, {headers: headers}).map(res => res.json());

    }

    getTerminadasByProfesor(id_alumno: any, id_profesor){

        let params= {_id: id_alumno, profesor: id_profesor};
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-terminadasByProfesor', params, {headers: headers}).map(res => res.json());

    }

    getSinTerminarByProfesor(id_alumno: any, id_profesor){

        let params= {_id: id_alumno, profesor: id_profesor};
		let headers= new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'soluciones-sinTerminarByProfesor', params, {headers: headers}).map(res => res.json());

    }

    

    

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
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