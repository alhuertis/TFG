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
    public nuevaPass: String;
    public repeatNuevaPass: String;

	// pager object
    pager: any = {};
    // paged items
    public pagedItems: User[];

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

    abrirModalPass(){
		setTimeout(() => this.visibleAnimate = true,200);
		this.modalPass= true;
    }

    cerrarModalPass(){
        this.visibleAnimate=false;
		setTimeout(() => this.modalPass = false, 300);
    }

    cambiarPass(){
        if(this.nuevaPass != "" && this.nuevaPass == this.repeatNuevaPass){
            alert("Son iguales");
        }else{
            alert("No son iguales");
        }

    }

    exit(){
        this.salir.emit();
    }
   
}