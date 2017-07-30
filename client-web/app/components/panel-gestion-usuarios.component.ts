import{Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';

import {TruncatePipe} from './truncate-pipe.component';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-gestion-usuarios',
	templateUrl: 'app/views/panel-gestion-usuarios.html',
	providers: [AuthenticationService]
}) 

export class  PanelGestionUsuariosComponent implements OnInit{

    @Output() salir= new EventEmitter();

	public users: User[];
	public userInfo: User;
	public msg: String;
	public modalRegistro: Boolean;
	public modalUsuario: Boolean;
	public visibleAnimate: Boolean;
    public modalPass: Boolean;
    public nuevaPass: string;
    public repeatNuevaPass: string;
	public userUpdate: User;
	public modalMessage: Boolean;

	// pager object
    pager: any = {};
    // paged items
    public pagedItems: User[];

	public errorMessage: String;
	public message: String;

    constructor(
			private _authenticationService: AuthenticationService

	){

		this.users=[];
		this.msg="";
		this.modalRegistro=false;
		this.modalUsuario=false;
		this.visibleAnimate= false;
		this.userInfo=new User();
        this.modalPass= false;
        this.nuevaPass="";
        this.repeatNuevaPass="";
		this.userUpdate=null;
		this.errorMessage= "";
		this.message=  "";
		this.modalMessage= false;
	}

	ngOnInit(){

		this._authenticationService.getAllUsers().subscribe(
			result =>{
				this.users= result.usuarios;
				this.setPage(1);
			}
		);
		
	}

	

	cerrarModal(){
		this.visibleAnimate=false;
		setTimeout(() => this.modalRegistro = false, 300);
		this.msg="";
	}

	cerrarModalInfo(){
		this.visibleAnimate=false;
		setTimeout(() => this.modalUsuario = false, 300);
		this.msg="";
	}

	verUsuario(usuario: User){
		this.userInfo= usuario;
		setTimeout(() => this.visibleAnimate = true,200);
		this.modalUsuario= true;
	}

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._authenticationService.getPager(this.users.length, page);
        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    abrirModalPass(user: User){
		this.userUpdate= user;
		setTimeout(() => this.visibleAnimate = true,200);
		this.modalPass= true;
    }

    cerrarModalPass(){
        this.visibleAnimate=false;
		setTimeout(() => this.modalPass = false, 300);
    }

    cambiarPass(){
        if(this.nuevaPass != "" && this.nuevaPass == this.repeatNuevaPass){
			this.userUpdate.password= this.nuevaPass;
            this._authenticationService.updateUser(this.userUpdate).subscribe(

				result=>{
					if(result.respuesta == 'ok'){
						this.cerrarModalPass();
						this.message="La contraseña ha sido actualizada correctamente";
						this.modalMessage=true;
						setTimeout(() => this.visibleAnimate = true, 300);

					}else{
						this.cerrarModalPass();
						this.message="Se ha producido un error actualizando la contraseña";
						this.modalMessage=true;
						setTimeout(() => this.visibleAnimate = true, 300);
					}

				},
				error=>{
					this.errorMessage= <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert('Error en la peticio al servidor para cambier la contraseña');
					}
				}
			);
        }else{
			//aqui modal diciendo que deben ser iguales
            alert("No son iguales");
        }

    }

	cerrarModalMessage(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalMessage = false, 300);
		this.message="";
	}

    exit(){
        this.salir.emit();
    }
   
}