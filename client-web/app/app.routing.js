"use strict";
var router_1 = require("@angular/router");
//Aqui vamos a importar todos los componentes que necesitemos
var panel_profesor_component_1 = require("./components/panel-profesor.component");
var ejercicio_add_component_1 = require("./components/ejercicio-add.component");
var appRoutes = [
    //{path: '', component: FavoritosListComponent},
    //{path:'marcador/:id', component: FavoritoDetailComponent},
    //{path:'crear-marcador', component: PanelProfesorComponent},
    { path: 'profesor', component: panel_profesor_component_1.PanelProfesorComponent,
        children: [
            { path: 'crear-ejercicio', component: ejercicio_add_component_1.EjercicioAddComponent }
        ]
    },
    //Esto es cuando da error(404), y le decimos que nos lleve a la de listar favoritos.
    { path: '**', component: panel_profesor_component_1.PanelProfesorComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map