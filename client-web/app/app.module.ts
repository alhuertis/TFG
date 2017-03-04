import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import {PanelProfesorComponent} from './components/panel-profesor.component'; 
import {EjercicioAddComponent} from './components/ejercicio-add.component';
import {EjercicioMostrarComponent} from './components/ejercicio-mostrar.component'; 



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
        EjercicioMostrarComponent

   ],
  providers: [appRoutingProviders],
  bootstrap:    [ AppComponent ]
})
 
export class AppModule { }