//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
/*import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {DiccionarioService} from '../services/diccionario.service';


import {TruncatePipe} from './truncate-pipe.component';

//Para usar undescore y jquery
import * as _ from 'underscore';
declare var $:any;

//los decoradores no tienen punto y coma
@Component({

    selector: 'diccionario-get',
    templateUrl: 'app/views/panel-profesor.html',
    providers: [DiccionarioService], //Necesitamos esto para poder usar los metodos
    styleUrls: ['../../assets/css/menu-profesor.css'],
})

export class  PanelProfesorComponent implements OnInit{

    
    // pager object
    pager: any = {};
    public errorMessage: string;

    constructor(
            private _diccionarioService: DiccionarioService

    ){
        
        
    }


    ngOnInit(){
        //Obtencion de datos
        this._diccionarioService.getDiccionario().subscribe(
            result =>{
                console.log(result);
                this.ejercicios= result.ejercicios;

                if(!this.ejercicios){
                    alert('Error en el servidor');
                }
                else{
                    this.loading=false;
                    this.nEjercicios= this.ejercicios.length;
                    /*this.ejersAMostrar= this.ejercicios;
                    this.datosAMostrar="Todos los ejercicios";
                    this.mostrarLista=true;
            //}

            },
            error => {
                this.errorMessage= <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la peticion');
                }
            }

        ); //fin getEjercicios (Todos)

        

    }//fin ngOnInit

    





    sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }


    
}*/ 
//# sourceMappingURL=diccionario-get.component.js.map