import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.service';
import {User} from '../models/user';
 
@Component({
    //moduleId: module.id,
    selector: 'login',
    templateUrl: 'app/views/login.html',
    providers: [AuthenticationService]
})
 
export class LoginComponent implements OnInit {
    modelLogin: any = {};
    modelRegistro: any= {};
    loading = false;
    error = '';
    user: User;
    registro: Boolean;
    modalRegistro: Boolean;
    visibleAnimate: Boolean;
    screenHeight = screen.height + "px";

    msg: String;
 
    constructor( private router: Router, private authenticationService: AuthenticationService) {
            
        this.registro=false;
        this.msg="";
        this.modalRegistro=false;
        this.visibleAnimate= false;
    }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.modelLogin.alias, this.modelLogin.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.user= JSON.parse(localStorage.getItem('currentUser')).user;

                    if(this.user.role == 'admin'){
                        this.router.navigate(['/admin']);
                    }
                    else if(this.user.role == 'profesor')
                        this.router.navigate(['/profesor']);
                    else if(this.user.role == 'alumno')
                        this.router.navigate(['/alumno']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    mostrarRegistro(mostrar :Boolean){
        this.registro= mostrar;
    }

    registrar(){
        this.loading = true;
        this.authenticationService.registro(this.modelRegistro).subscribe(
            result => {
                this.msg=result.message;
                this.modalRegistro=true;
                setTimeout(() => this.visibleAnimate = true);
                this.loading = false;
            },
            
            error =>{
                this.msg=error.message;
                this.modalRegistro=true;
                setTimeout(() => this.visibleAnimate = true);
                this.loading = false;
            }
            
            );
    }

    cerrarModal(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalRegistro = false, 300);
        this.msg="";
    }
}