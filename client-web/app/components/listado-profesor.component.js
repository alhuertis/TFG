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
//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
var core_1 = require("@angular/core");
var ejercicio_service_1 = require("../services/ejercicio.service");
//los decoradores no tienen punto y coma
var ListadoProfesorComponent = (function () {
    function ListadoProfesorComponent(_ejercicioService) {
        this._ejercicioService = _ejercicioService;
    }
    ListadoProfesorComponent.prototype.ngOnInit = function () {
    };
    return ListadoProfesorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ListadoProfesorComponent.prototype, "listaEjers", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ListadoProfesorComponent.prototype, "mostrarLista", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListadoProfesorComponent.prototype, "titulo", void 0);
ListadoProfesorComponent = __decorate([
    core_1.Component({
        selector: 'listado-ejers',
        templateUrl: 'app/views/profesor-listar-ejercicios.html',
        providers: [ejercicio_service_1.EjercicioService] //Necesitamos esto para poder usar los metodos
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService])
], ListadoProfesorComponent);
exports.ListadoProfesorComponent = ListadoProfesorComponent;
//# sourceMappingURL=listado-profesor.component.js.map