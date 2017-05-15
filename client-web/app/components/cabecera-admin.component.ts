// Importar Component desde el núcleo de Angular
import {Component} from '@angular/core';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'cabecera-admin',
    templateUrl:'app/views/cabecera-admin.html',
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CabeceraAdminComponent{ 

    titulo: String;

	constructor(){
        this.titulo= "Panel de administracion";

	}

}