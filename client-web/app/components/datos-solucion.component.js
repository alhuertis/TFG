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
var core_1 = require("@angular/core");
var ejercicio_service_1 = require("../services/ejercicio.service");
var actividad_service_1 = require("../services/actividad.service");
var solucion_service_1 = require("../services/solucion.service");
var actividad_1 = require("../models/actividad");
var solucion_1 = require("../models/solucion");
var DatosSolucionComponent = (function () {
    // pager object (paginador)
    /*pager: any = {};
    pagerSolucion: any = {};*/
    function DatosSolucionComponent(_ejercicioService, _actividadService, _solucionService) {
        this._ejercicioService = _ejercicioService;
        this._actividadService = _actividadService;
        this._solucionService = _solucionService;
        this.salir = new core_1.EventEmitter();
        this.errorMessage = "";
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        this.actividad = new actividad_1.Actividad();
        this.indice = 0;
        this.editarVal = false;
        this.valoracion = "";
        this.msgRespuesta = "";
        this.editarNota = false;
        this.nota = null;
    }
    DatosSolucionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._actividadService.cargarActividad(this.solucion.actividad._id).subscribe(function (result) {
            _this.actividad = result.actividad;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de la actividad');
            }
        });
    };
    /*ngAfterViewInit(){
    }*/
    DatosSolucionComponent.prototype.exit = function () {
        this.salir.emit();
    };
    DatosSolucionComponent.prototype.cambiaIndice = function (i) {
        this.indice = i;
        this.cancelValoracion();
        this.editarNota = false;
        this.editarVal = false;
    };
    DatosSolucionComponent.prototype.escribirValoracion = function () {
        this.editarVal = true;
    };
    DatosSolucionComponent.prototype.cancelValoracion = function () {
        this.editarVal = false;
        this.valoracion = "";
    };
    DatosSolucionComponent.prototype.editarValoracion = function () {
        this.valoracion = this.solucion.ejercicios[this.indice].msgProfesor;
        this.editarVal = true;
    };
    DatosSolucionComponent.prototype.editaNota = function () {
        this.nota = this.solucion.ejercicios[this.indice].calificacion;
        this.editarNota = true;
    };
    DatosSolucionComponent.prototype.guardarValoracion = function () {
        var _this = this;
        this.solucion.ejercicios[this.indice].msgProfesor = this.valoracion;
        this._solucionService.updateSolucion(this.solucion).subscribe(function (result) {
            _this.editarVal = false;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                alert(_this.errorMessage);
            }
        });
    };
    DatosSolucionComponent.prototype.guardarNota = function () {
        var _this = this;
        this.solucion.ejercicios[this.indice].calificacion = this.nota;
        this.solucion.notaFinal = 0;
        for (var i = 0; i < this.solucion.ejercicios.length; i++) {
            this.solucion.notaFinal += this.solucion.ejercicios[i].calificacion;
        }
        this._solucionService.updateSolucion(this.solucion).subscribe(function (result) {
            _this.editarNota = false;
            _this.nota = null;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                alert(_this.errorMessage);
            }
        });
    };
    DatosSolucionComponent.prototype.cancelarNota = function () {
        this.editarNota = false;
        this.nota = null;
    };
    return DatosSolucionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", solucion_1.Solucion)
], DatosSolucionComponent.prototype, "solucion", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DatosSolucionComponent.prototype, "salir", void 0);
DatosSolucionComponent = __decorate([
    core_1.Component({
        selector: 'datos-solucion',
        templateUrl: 'app/views/datos-solucion.html',
        providers: [ejercicio_service_1.EjercicioService, actividad_service_1.ActividadService, solucion_service_1.SolucionService]
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService,
        actividad_service_1.ActividadService,
        solucion_service_1.SolucionService])
], DatosSolucionComponent);
exports.DatosSolucionComponent = DatosSolucionComponent;
//# sourceMappingURL=datos-solucion.component.js.map