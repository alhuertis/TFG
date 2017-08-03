import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {Ng2DragDropModule} from "ng2-drag-drop";
import {DatePickerModule} from 'ng2-datepicker-bootstrap';
//import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { DatepickerModule } from 'angular2-material-datepicker';

import {PanelAdminComponent} from './components/panel-admin.component';
import {PanelRegistrosComponent} from './components/panel-registros.component';
import {PanelGestionUsuariosComponent} from './components/panel-gestion-usuarios.component'; 
import {PanelProfesorComponent} from './components/panel-profesor.component'; 
import {PanelAlumnoComponent} from './components/panel-alumno.component';
import {EjercicioAddComponent} from './components/ejercicio-add.component'; 
import {CabeceraProfesorComponent} from './components/cabecera-profesor.component';
import {PanelBuscarSolucionesComponent} from './components/buscar-soluciones.component';
import {DatosSolucionComponent} from './components/datos-solucion.component';  
import {TruncatePipe} from './components/truncate-pipe.component';
import {CabeceraAlumnoComponent} from './components/cabecera-alumno.component';
import {CabeceraAdminComponent} from './components/cabecera-admin.component';
import {ResolverActividadComponent} from './components/resolver-actividad.component';
import {LoginComponent} from './components/login.component';
import {AuthGuardProfesor} from './guards/authProfesor.guard';
import {AuthGuardAlumno} from './guards/authAlumno.guard';
import {AuthGuardAdmin} from './guards/authAdmin.guard';

//import * as $ from 'jquery';

@NgModule({
  imports: [ 
  			BrowserModule,
  			FormsModule,
  			HttpModule,
        routing,
        Ng2DragDropModule,
        //DatePickerModule,
        //NKDatetimeModule,
        DatepickerModule
        
       
         
  ],
  //Aqui cargamos todos los componentes que vamos a usar en la aplicacion.(Es un array).
  declarations: [ 
  			AppComponent,
        PanelAdminComponent,
        PanelRegistrosComponent,
        PanelGestionUsuariosComponent,
        PanelProfesorComponent,
        EjercicioAddComponent,
        PanelAlumnoComponent,
        CabeceraProfesorComponent,
        PanelBuscarSolucionesComponent,
        TruncatePipe,
        CabeceraAlumnoComponent,
        CabeceraAdminComponent,
        ResolverActividadComponent,
        LoginComponent,
        DatosSolucionComponent

   ],
  providers: [appRoutingProviders,AuthGuardProfesor,AuthGuardAlumno, AuthGuardAdmin],
  bootstrap:    [ AppComponent ]
})
 
export class AppModule { }