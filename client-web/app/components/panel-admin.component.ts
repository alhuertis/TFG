import{Component, OnInit, ElementRef, Input, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Http, Response, Headers} from '@angular/http';


import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';

import {TruncatePipe} from './truncate-pipe.component';
import { FileUploader } from 'ng2-file-upload';

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
	public modalPdf: Boolean;
	public modalPdfAlum: Boolean;

	
	public visibleAnimate: Boolean;

	public uploader:FileUploader = new FileUploader({url:'http://'+window.location.hostname+':3678/apiAuth//auth/upload'});
	public uploaderAlum:FileUploader = new FileUploader({url:'http://'+window.location.hostname+':3678/apiAuth//auth/uploadAlum'});
	

	// pager object
    pager: any = {};
    // paged items
    public pagedItems: User[];

    constructor(
			private _authenticationService: AuthenticationService,

	){

		this.registros=[];
		this.usuarios=[];
		this.msg="";
		
		this.visibleAnimate= false;
		this.verRegistros=false;
		this.verUsuarios=false;
		this.modalPdf= false;
		this.modalPdfAlum= false;
		
	}

	ngOnInit(){
		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
		this.uploaderAlum.onAfterAddingFile = (file)=> { file.withCredentials = false; };
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

	abrirModalPdf(){
		//this.uploader = new FileUploader({url:'http://'+window.location.hostname+':3678/apiAuth//auth/upload'});
		this.modalPdf = true;
    	setTimeout(() => this.visibleAnimate = true);
	}

	cerrarModalPdf(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalPdf = false, 300);
	}

	abrirModalPdfAlum(){
		this.modalPdfAlum = true;
    	setTimeout(() => this.visibleAnimate = true);
	}

	cerrarModalPdfAlum(){
		this.visibleAnimate = false;
    	setTimeout(() => this.modalPdfAlum = false, 300);
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