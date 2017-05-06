//Aqui va a ir toda la configuracion de rutas
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Aqui vamos a importar todos los componentes que necesitemos
import {PanelProfesorComponent} from './components/panel-profesor.component';
import {PanelAlumnoComponent} from './components/panel-alumno.component';
import {EjercicioAddComponent} from './components/ejercicio-add.component';
import {CabeceraProfesorComponent} from './components/cabecera-profesor.component';
import {ResolverActividadComponent} from './components/resolver-actividad.component';

const appRoutes: Routes = [

	//{path: '', component: FavoritosListComponent},
	//{path:'marcador/:id', component: FavoritoDetailComponent},
	//{path:'crear-marcador', component: PanelProfesorComponent},
	{path:'', redirectTo:'profesor', pathMatch:'full'},
	{path: 'profesor', component: PanelProfesorComponent,
		children:[
				{path:'cabecera-profesor', component: CabeceraProfesorComponent},
			]
	},		
	{path:'crear-ejercicio', component: EjercicioAddComponent},

	{path: 'alumno', component: PanelAlumnoComponent,
		children:[
			//{path:'', redirectTo:'alumno', pathMatch:'full'}
			//{path:'crear-ejercicio', component: EjercicioAddComponent},
			//{path:'mostrar-ejercicios', component: EjercicioMostrarComponent}
		]	
	},
	{path:'resolver-actividad/:id_actividad', component: ResolverActividadComponent},
	
	//Esto es cuando da error(404), y le decimos que nos lleve a la de listar favoritos.
	{path:'**', component: PanelProfesorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);