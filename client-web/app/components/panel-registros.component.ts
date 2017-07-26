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

	selector: 'panel-registros',
	templateUrl: 'app/views/panel-registros.html',
	providers: [AuthenticationService]
}) 

export class  PanelRegistrosComponent implements OnInit{

    @Output() salir= new EventEmitter();

	public users: User[];
	public userInfo: User;
	public msg: String;
	public modalRegistro: Boolean;
	public modalUsuario: Boolean;
	public visibleAnimate: Boolean;

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
	}

	ngOnInit(){

		this._authenticationService.getRegistros().subscribe(
			result =>{
				this.users= result.registros;
				this.setPage(1);
			}
		);
		
	}

	aprobarRegistro(usuario : User){

		this._authenticationService.borrarRegistro(usuario).subscribe(

			result=> {

				if(result.resultado == 'ko'){
					this.msg=result.message;
					setTimeout(() => this.visibleAnimate = true);
					this.modalRegistro= true;
					
				}
				else if(result.resultado == 'ok'){
					this._authenticationService.guardarUsuario(usuario).subscribe(

						result=>{
							this.msg=result.message;
							setTimeout(() => this.visibleAnimate = true);
							this.modalRegistro= true;
							

							for(let i=0; i < this.users.length; i++){
								if(this.users[i]._id == usuario._id){	
									this.users.splice(i,1);
									continue;
								}
							}

							for(let i=0; i < this.pagedItems.length; i++){
								if(this.pagedItems[i]._id == usuario._id){	
									this.pagedItems.splice(i,1);
									continue;
								}
							}
							if(this.pagedItems.length > 0)
								this.setPage(this.pager.currentPage);
							else
								this.setPage(this.pager.currentPage-1);
						},

						error=>{
							this.msg=result.message;
							setTimeout(() => this.visibleAnimate = true);
							this.modalRegistro= true;
						}
					);

				}

			},

			error=>{
				this.msg=error.message;
				setTimeout(() => this.visibleAnimate = true);
				this.modalRegistro= true;
			}
		);
	}

	desaprobarRegistro(usuario : User){

		this._authenticationService.borrarRegistro(usuario).subscribe(

			result=> {
				this.msg=result.message;
				setTimeout(() => this.visibleAnimate = true);
				this.modalRegistro= true;

				for(let i=0; i < this.users.length; i++){
					if(this.users[i]._id == usuario._id){	
						this.users.splice(i,1);
						continue;
					}
				}

				for(let i=0; i < this.pagedItems.length; i++){
					if(this.pagedItems[i]._id == usuario._id){	
						this.pagedItems.splice(i,1);
						continue;
					}
				}
				if(this.pagedItems.length > 0)
					this.setPage(this.pager.currentPage);
				else
					this.setPage(this.pager.currentPage-1);
			},

			error=>{
				this.msg=error.message;
				setTimeout(() => this.visibleAnimate = true);
				this.modalRegistro= true;
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
		setTimeout(() => this.visibleAnimate = true);
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

    exit(){
        this.salir.emit();
    }
   
}