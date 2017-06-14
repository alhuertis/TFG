// Importar Component desde el núcleo de Angular
import {Component} from '@angular/core';
import {User} from '../models/user';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'cabecera-profesor',
    templateUrl:'app/views/cabecera-profesor.html',
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CabeceraProfesorComponent{ 

    titulo: String;
    public user: User;

	constructor(){
        this.titulo= "Panel de profesor";
        this.user= JSON.parse(localStorage.getItem('currentUser')).user;
	}

}