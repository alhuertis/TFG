// Importar Component desde el núcleo de Angular
import {Component} from '@angular/core';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'cabecera-profesor',
    templateUrl:'app/views/cabecera-profesor.html',
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CabeceraProfesorComponent{ 

    titulo: String;
    user: String;

	constructor(){
        this.titulo= "Panel de profesor";
        this.user= "Antonio Sarasa";

	}

}