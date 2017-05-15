//Aqui va a ir toda la configuracion de rutas
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Aqui vamos a importar todos los componentes que necesitemos
import {PanelAdminComponent} from './components/panel-admin.component';
import {PanelProfesorComponent} from './components/panel-profesor.component';
import {PanelAlumnoComponent} from './components/panel-alumno.component';
import {EjercicioAddComponent} from './components/ejercicio-add.component';
import {CabeceraProfesorComponent} from './components/cabecera-profesor.component';
import {ResolverActividadComponent} from './components/resolver-actividad.component';
import {LoginComponent} from './components/login.component';
import {AuthGuardProfesor} from './guards/authProfesor.guard';
import {AuthGuardAlumno} from './guards/authAlumno.guard';
import {AuthGuardAdmin} from './guards/authAdmin.guard';

const appRoutes: Routes = [

	{ path: 'login', component: LoginComponent },

	{path:'', redirectTo:'profesor', pathMatch:'full', canActivate: [AuthGuardProfesor]},

	{path: 'admin', component: PanelAdminComponent,canActivate: [AuthGuardAdmin]},

	{path: 'profesor', component: PanelProfesorComponent,canActivate: [AuthGuardProfesor],
		/*children:[
				{path:'cabecera-profesor', component: CabeceraProfesorComponent},
			]*/
	},		
	{path:'crear-ejercicio', component: EjercicioAddComponent,canActivate: [AuthGuardProfesor]},

	{path: 'alumno', component: PanelAlumnoComponent,canActivate: [AuthGuardAlumno],
		children:[
			//{path:'', redirectTo:'alumno', pathMatch:'full'}
			//{path:'crear-ejercicio', component: EjercicioAddComponent},
			//{path:'mostrar-ejercicios', component: EjercicioMostrarComponent}
		]	
	},
	{path:'resolver-actividad/:id_actividad', component: ResolverActividadComponent,canActivate: [AuthGuardAlumno]},
	
	//Esto es cuando da error(404), y le decimos que nos lleve a la de listar favoritos.
	{path:'**', component: PanelProfesorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders= RouterModule.forRoot(appRoutes);