"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Importar Component desde el núcleo de Angular
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var actividad_service_1 = require("../services/actividad.service");
var ejercicio_service_1 = require("../services/ejercicio.service");
var solucion_service_1 = require("../services/solucion.service");
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var CabeceraAdminComponent = (function () {
    function CabeceraAdminComponent(router, actividadService, ejercicioService, solucionService) {
        this.router = router;
        this.actividadService = actividadService;
        this.ejercicioService = ejercicioService;
        this.solucionService = solucionService;
        this.titulo = "Panel de administracion";
        this.msg = "";
    }
    CabeceraAdminComponent.prototype.abrirModalResetBd = function () {
        var _this = this;
        this.modalResetBd = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    CabeceraAdminComponent.prototype.cerrarResetBd = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalResetBd = false; }, 300);
    };
    CabeceraAdminComponent.prototype.cerrarModalMessage = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalMessage = false; }, 300);
    };
    CabeceraAdminComponent.prototype.resetBd = function () {
        var _this = this;
        this.solucionService.borrarColeccion().subscribe(function (result) {
            /*alert("se ha borrado");
            this.cerrarResetBd();*/
            _this.actividadService.borrarColeccion().subscribe(function (result) {
                /*alert("se ha borrado");
                this.cerrarResetBd();*/
                _this.ejercicioService.borrarColeccion().subscribe(function (result) {
                    /*alert("se ha borrado");*/
                    _this.cerrarResetBd();
                    _this.msg = "Se han borrado las colecciones correctamente";
                    _this.modalMessage = true;
                    setTimeout(function () { return _this.visibleAnimate = true; });
                }, function (error) {
                    _this.msg = error.message;
                    _this.modalResetBd = true;
                    setTimeout(function () { return _this.visibleAnimate = true; });
                });
            }, function (error) {
                _this.msg = error.message;
                _this.modalResetBd = true;
                setTimeout(function () { return _this.visibleAnimate = true; });
            });
        }, function (error) {
            _this.msg = error.message;
            _this.modalResetBd = true;
            setTimeout(function () { return _this.visibleAnimate = true; });
        });
    };
    return CabeceraAdminComponent;
}());
CabeceraAdminComponent = __decorate([
    core_1.Component({
        selector: 'cabecera-admin',
        templateUrl: 'app/views/cabecera-admin.html',
        providers: [actividad_service_1.ActividadService, ejercicio_service_1.EjercicioService, solucion_service_1.SolucionService]
    }),
    __metadata("design:paramtypes", [router_1.Router, actividad_service_1.ActividadService, ejercicio_service_1.EjercicioService, solucion_service_1.SolucionService])
], CabeceraAdminComponent);
exports.CabeceraAdminComponent = CabeceraAdminComponent;
//# sourceMappingURL=cabecera-admin.component.js.map