//Aqui va a ir toda la configuracion de rutas
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Aqui vamos a importar todos los componentes que necesitemos
import {PanelProfesorComponent} from './components/panel-profesor.component';
import {EjercicioAddComponent} from './components/ejercicio-add.component';
import {FavoritosListComponent} from './components/favoritos-list.component';
import {FavoritoDetailComponent} from './components/favorito-detail.component';
import {FavoritoAddComponent} from './components/favorito-add.component';

const appRoutes: Routes = [

	//{path: '', component: FavoritosListComponent},
	{path: '', component: PanelProfesorComponent},
	{path:'marcador/:id', component: FavoritoDetailComponent},
	//{path:'crear-marcador', component: PanelProfesorComponent},
	{path:'crear-ejercicio', component: EjercicioAddComponent},

	//Esto es cuando da error(404), y le decimos que nos lleve a la de listar favoritos.
	{path:'**', component: FavoritosListComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);