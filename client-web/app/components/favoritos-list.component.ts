//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {FavoritoService} from '../services/favorito.service';
import {Favorito} from '../models/favorito';

//los decoradores no tienen punto y coma
@Component({

	selector: 'favoritos-list',
	templateUrl: 'app/views/favoritos-list.html',
	providers: [FavoritoService] //Necesitamos esto para poder usar los metodos

}) 

export class  FavoritosListComponent implements OnInit{

	public title: string;
	public favoritos: Favorito[];
	public errorMessage: string;
	public loading: boolean;
	
	

	constructor(
			private _favoritoService: FavoritoService

	){
		this.title= "Listado de marcadores";
		this.loading=true;
		
	}


	ngOnInit(){
		console.log('FavoritosListComponent cargado!!');
		this._favoritoService.getFavoritos().subscribe(
			result =>{
				console.log(result);
				this.favoritos= result.favoritos;

				if(!this.favoritos){
					alert('Error en el servidor');
				}
				else{
					this.loading=false;
				}

			},
			error => {
				this.errorMessage= <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert('Error en la peticion');
				}
			}

		);
	}
}
