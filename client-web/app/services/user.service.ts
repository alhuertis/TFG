import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
 
@Injectable()
export class UserService {
    public url: string;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
            this.url= 'http://'+window.location.hostname+':3678/apiAuth/';
    }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get(this.url+'apiUsers/users', options)
            .map((response: Response) => response.json());
    }
}