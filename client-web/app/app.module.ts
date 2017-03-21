import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import {PanelProfesorComponent} from './components/panel-profesor.component'; 
import {PanelAlumnoComponent} from './components/panel-alumno.component';
import {EjercicioAddComponent} from './components/ejercicio-add.component'; 
import {CabeceraProfesorComponent} from './components/cabecera-profesor.component'; 
import {TruncatePipe} from './components/truncate-pipe.component';
import {CabeceraAlumnoComponent} from './components/cabecera-alumno.component';
import {ResolverActividadComponent} from './components/resolver-actividad.component';



CabeceraAlumnoComponent 



@NgModule({
  imports: [ 
  			BrowserModule, 
  			FormsModule,
  			HttpModule,
        routing 
  ],
  //Aqui cargamos todos los componentes que vamos a usar en la aplicacion.(Es un array).
  declarations: [ 
  			AppComponent,
        PanelProfesorComponent,
        EjercicioAddComponent,
        PanelAlumnoComponent,
        CabeceraProfesorComponent,
        TruncatePipe,
        CabeceraAlumnoComponent,
        ResolverActividadComponent

   ],
  providers: [appRoutingProviders],
  bootstrap:    [ AppComponent ]
})
 
export class AppModule { }