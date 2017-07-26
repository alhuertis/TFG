import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
import * as _ from 'underscore';

@Injectable()
export class AuthenticationService {
    public url: string;
    public token: string;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.url= 'http://'+window.location.hostname+':3678/apiAuth/';
    }
 
    login(usuario: string, password: string): Observable<boolean> {

        let json = JSON.stringify({ usuario: usuario, password: password });
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.url+'auth/login', params, {headers: headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let user= response.json() && response.json().user;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token}));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    registro(model : any){

        let json = JSON.stringify(model);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.url+'auth/registro', params, {headers: headers}).map(res => res.json());
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    guardarUsuario(model: any){
        let json = JSON.stringify(model);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.url+'auth/guardarUsuario', params, {headers: headers}).map(res => res.json());
    }

    borrarRegistro(model: any){
        let json = JSON.stringify(model);
		let params= json;

		let headers= new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.url+'auth/borrarRegistro', params, {headers: headers}).map(res => res.json());
    }

    getRegistros(){
        return this.http.get(this.url+'auth/registros').map(res => res.json());
    }

    getListaUsers(){
        return this.http.get(this.url+'auth/listaUsers').map(res => res.json());
    }

    getAllUsers(){
        return this.http.get(this.url+'auth/allUsers').map(res => res.json());
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