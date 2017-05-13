"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var ng2_drag_drop_1 = require("ng2-drag-drop");
var panel_profesor_component_1 = require("./components/panel-profesor.component");
var panel_alumno_component_1 = require("./components/panel-alumno.component");
var ejercicio_add_component_1 = require("./components/ejercicio-add.component");
var cabecera_profesor_component_1 = require("./components/cabecera-profesor.component");
var truncate_pipe_component_1 = require("./components/truncate-pipe.component");
var cabecera_alumno_component_1 = require("./components/cabecera-alumno.component");
var resolver_actividad_component_1 = require("./components/resolver-actividad.component");
var login_component_1 = require("./components/login.component");
var auth_guard_1 = require("./guards/auth.guard");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing,
            ng2_drag_drop_1.Ng2DragDropModule
        ],
        //Aqui cargamos todos los componentes que vamos a usar en la aplicacion.(Es un array).
        declarations: [
            app_component_1.AppComponent,
            panel_profesor_component_1.PanelProfesorComponent,
            ejercicio_add_component_1.EjercicioAddComponent,
            panel_alumno_component_1.PanelAlumnoComponent,
            cabecera_profesor_component_1.CabeceraProfesorComponent,
            truncate_pipe_component_1.TruncatePipe,
            cabecera_alumno_component_1.CabeceraAlumnoComponent,
            resolver_actividad_component_1.ResolverActividadComponent,
            login_component_1.LoginComponent
        ],
        providers: [app_routing_1.appRoutingProviders, auth_guard_1.AuthGuard],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map