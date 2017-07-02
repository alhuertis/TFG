// Importar Component desde el núcleo de Angular
import {Component} from '@angular/core';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'cabecera-alumno',
    templateUrl:'app/views/cabecera-alumno.html',
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CabeceraAlumnoComponent{ 

    titulo: String;
    user: String;

	constructor(){
        this.titulo= "Panel de alumno";
        this.user= JSON.parse(localStorage.getItem('currentUser')).user;

	}

}