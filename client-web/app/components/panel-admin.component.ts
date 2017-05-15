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

	public users: User[];

	// pager object
    pager: any = {};
    // paged items
    public pagedItems: User[];

    constructor(
			private _authenticationService: AuthenticationService

	){

		this.users=[];
	}

	ngOnInit(){

		this._authenticationService.getRegistros().subscribe(
			result =>{
				this.users= result.registros;
				this.setPage(1);
			}
		);
		
	}

	setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       	this.pager = this._authenticationService.getPager(this.users.length, page);
        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
	
		//alert(this.ejercicios.slice(1,5));
		
    }
   
}