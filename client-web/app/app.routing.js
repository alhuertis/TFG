"use strict";
var router_1 = require("@angular/router");
//Aqui vamos a importar todos los componentes que necesitemos
var panel_profesor_component_1 = require("./components/panel-profesor.component");
var panel_alumno_component_1 = require("./components/panel-alumno.component");
var ejercicio_add_component_1 = require("./components/ejercicio-add.component");
var resolver_actividad_component_1 = require("./components/resolver-actividad.component");
var login_component_1 = require("./components/login.component");
var authProfesor_guard_1 = require("./guards/authProfesor.guard");
var authAlumno_guard_1 = require("./guards/authAlumno.guard");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', redirectTo: 'profesor', pathMatch: 'full', canActivate: [authProfesor_guard_1.AuthGuardProfesor] },
    { path: 'profesor', component: panel_profesor_component_1.PanelProfesorComponent, canActivate: [authProfesor_guard_1.AuthGuardProfesor],
    },
    { path: 'crear-ejercicio', component: ejercicio_add_component_1.EjercicioAddComponent, canActivate: [authProfesor_guard_1.AuthGuardProfesor] },
    { path: 'alumno', component: panel_alumno_component_1.PanelAlumnoComponent, canActivate: [authAlumno_guard_1.AuthGuardAlumno],
        children: []
    },
    { path: 'resolver-actividad/:id_actividad', component: resolver_actividad_component_1.ResolverActividadComponent, canActivate: [authAlumno_guard_1.AuthGuardAlumno] },
    //Esto es cuando da error(404), y le decimos que nos lleve a la de listar favoritos.
    { path: '**', component: panel_profesor_component_1.PanelProfesorComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map