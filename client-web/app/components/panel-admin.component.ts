import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';

import {TruncatePipe} from './truncate-pipe.component';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

	selector: 'panel-admin',
	templateUrl: 'app/views/panel-admin.html',
	providers: [AuthenticationService]
}) 

export class  PanelAdminComponent implements OnInit{

	public registros: User[];
	public usuarios: User[];
	public msg: String;
	public verRegistros:Boolean;
	public verUsuarios:Boolean;

	
	public visibleAnimate: Boolean;

	// pager object
    pager: any = {};
    // paged items
    public pagedItems: User[];

    constructor(
			private _authenticationService: AuthenticationService

	){

		this.registros=[];
		this.usuarios=[];
		this.msg="";
		
		this.visibleAnimate= false;
		this.verRegistros=false;
		this.verUsuarios=false;
	}

	ngOnInit(){

		this._authenticationService.getRegistros().subscribe(
			result =>{
				this.registros= result.registros;
				//this.setPage(1);
			}
		);

		this._authenticationService.getAllUsers().subscribe(
			result =>{
				this.usuarios= result.usuarios;
				//this.setPage(1);
			}
		);
		
	}

	entrarRegistros(){
		this.verRegistros=true;
	}

	salirRegistros(){
		this.verRegistros=false;
		this.actualizaDatos();
	}

	entrarUsuarios(){
		this.verUsuarios=true;
	}

	salirUsuarios(){
		this.verUsuarios=false;
		this.actualizaDatos();
	}

	actualizaDatos(){
		this._authenticationService.getRegistros().subscribe(
			result =>{
				this.registros= result.registros;
				//this.setPage(1);
			}
		);

		this._authenticationService.getAllUsers().subscribe(
			result =>{
				this.usuarios= result.usuarios;
				//this.setPage(1);
			}
		);
	}
	/*setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._authenticationService.getPager(this.users.length, page);
        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }*/
   
}