// Importar Component desde el núcleo de Angular
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ActividadService } from '../services/actividad.service';
import { EjercicioService } from '../services/ejercicio.service';
import { SolucionService } from '../services/solucion.service';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'cabecera-admin',
    templateUrl:'app/views/cabecera-admin.html',
    providers: [ActividadService, EjercicioService, SolucionService ]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class CabeceraAdminComponent{ 

    titulo: String;
    modalResetBd: Boolean;
    modalMessage: Boolean;
    visibleAnimate: Boolean;
    msg: String;

	constructor(private router: Router, private actividadService: ActividadService, private ejercicioService: EjercicioService, private solucionService: SolucionService){
        this.titulo= "Panel de administracion";
        this.msg="";
	}

    abrirModalResetBd(){
        this.modalResetBd=true;
        setTimeout(() => this.visibleAnimate = true);
    }

    cerrarResetBd(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalResetBd = false, 300);
    }

    cerrarModalMessage(){
        this.visibleAnimate=false;
        setTimeout(() => this.modalMessage = false, 300);
    }

    resetBd(){
        this.solucionService.borrarColeccion().subscribe(

            result=>{
                /*alert("se ha borrado");
                this.cerrarResetBd();*/
                this.actividadService.borrarColeccion().subscribe(

                    result=>{
                        /*alert("se ha borrado");
                        this.cerrarResetBd();*/
                        this.ejercicioService.borrarColeccion().subscribe(

                            result=>{
                                /*alert("se ha borrado");*/
                                this.cerrarResetBd();
                                this.msg="Se han borrado las colecciones correctamente";
                                this.modalMessage=true;
                                setTimeout(() => this.visibleAnimate = true);
                                
                            },
                            error=>{
                                this.msg=error.message;
                                this.modalResetBd=true;
                                setTimeout(() => this.visibleAnimate = true);
                            }
                        );
                        
                    },
                    error=>{
                        this.msg=error.message;
                        this.modalResetBd=true;
                        setTimeout(() => this.visibleAnimate = true);
                    }
                );
                
            },
            error=>{
                this.msg=error.message;
                this.modalResetBd=true;
                setTimeout(() => this.visibleAnimate = true);
            }
        );

    }

}