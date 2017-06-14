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
var PanelBuscarSolucionesComponent = (function () {
    function PanelBuscarSolucionesComponent(_ejercicioService, _actividadService, _solucionService) {
        this._ejercicioService = _ejercicioService;
        this._actividadService = _actividadService;
        this._solucionService = _solucionService;
        //@Input() prueba: string;
        this.salir = new core_1.EventEmitter();
    }
    PanelBuscarSolucionesComponent.prototype.ngOnInit = function () {
    };
    PanelBuscarSolucionesComponent.prototype.exit = function () {
        this.salir.emit();
    };
    return PanelBuscarSolucionesComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PanelBuscarSolucionesComponent.prototype, "salir", void 0);
PanelBuscarSolucionesComponent = __decorate([
    core_1.Component({
        selector: 'panel-buscar-soluciones',
        templateUrl: 'app/views/panel-buscar-soluciones.html',
        providers: [ejercicio_service_1.EjercicioService, actividad_service_1.ActividadService, solucion_service_1.SolucionService]
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService,
        actividad_service_1.ActividadService,
        solucion_service_1.SolucionService])
], PanelBuscarSolucionesComponent);
exports.PanelBuscarSolucionesComponent = PanelBuscarSolucionesComponent;
//# sourceMappingURL=buscar-soluciones.component.js.map