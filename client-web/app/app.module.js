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
//import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
var angular2_material_datepicker_1 = require("angular2-material-datepicker");
var ng2_file_upload_1 = require("ng2-file-upload");
var panel_admin_component_1 = require("./components/panel-admin.component");
var panel_registros_component_1 = require("./components/panel-registros.component");
var panel_gestion_usuarios_component_1 = require("./components/panel-gestion-usuarios.component");
var panel_profesor_component_1 = require("./components/panel-profesor.component");
var panel_alumno_component_1 = require("./components/panel-alumno.component");
var ejercicio_add_component_1 = require("./components/ejercicio-add.component");
var cabecera_profesor_component_1 = require("./components/cabecera-profesor.component");
var buscar_soluciones_component_1 = require("./components/buscar-soluciones.component");
var datos_solucion_component_1 = require("./components/datos-solucion.component");
var truncate_pipe_component_1 = require("./components/truncate-pipe.component");
var cabecera_alumno_component_1 = require("./components/cabecera-alumno.component");
var cabecera_admin_component_1 = require("./components/cabecera-admin.component");
var resolver_actividad_component_1 = require("./components/resolver-actividad.component");
var login_component_1 = require("./components/login.component");
var authProfesor_guard_1 = require("./guards/authProfesor.guard");
var authAlumno_guard_1 = require("./guards/authAlumno.guard");
var authAdmin_guard_1 = require("./guards/authAdmin.guard");
//import * as $ from 'jquery';
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
            ng2_drag_drop_1.Ng2DragDropModule,
            //DatePickerModule,
            //NKDatetimeModule,
            angular2_material_datepicker_1.DatepickerModule
        ],
        //Aqui cargamos todos los componentes que vamos a usar en la aplicacion.(Es un array).
        declarations: [
            app_component_1.AppComponent,
            panel_admin_component_1.PanelAdminComponent,
            panel_registros_component_1.PanelRegistrosComponent,
            panel_gestion_usuarios_component_1.PanelGestionUsuariosComponent,
            panel_profesor_component_1.PanelProfesorComponent,
            ejercicio_add_component_1.EjercicioAddComponent,
            panel_alumno_component_1.PanelAlumnoComponent,
            cabecera_profesor_component_1.CabeceraProfesorComponent,
            buscar_soluciones_component_1.PanelBuscarSolucionesComponent,
            truncate_pipe_component_1.TruncatePipe,
            cabecera_alumno_component_1.CabeceraAlumnoComponent,
            cabecera_admin_component_1.CabeceraAdminComponent,
            resolver_actividad_component_1.ResolverActividadComponent,
            login_component_1.LoginComponent,
            datos_solucion_component_1.DatosSolucionComponent,
            ng2_file_upload_1.FileSelectDirective
        ],
        providers: [app_routing_1.appRoutingProviders, authProfesor_guard_1.AuthGuardProfesor, authAlumno_guard_1.AuthGuardAlumno, authAdmin_guard_1.AuthGuardAdmin],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map