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
var EjercicioMostrarComponent = (function () {
    function EjercicioMostrarComponent(_ejercicioService) {
        this._ejercicioService = _ejercicioService;
        this.title = "Panel de profesores";
    }
    EjercicioMostrarComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('panel-profesor cargado!!');
        this._ejercicioService.getEjercicios().subscribe(function (result) {
            console.log(result);
            _this.ejercicios = result.ejercicios;
            if (!_this.ejercicios) {
                alert('Error en el servidor');
            }
            else {
                _this.loading = false;
                _this.nEjercicios = _this.ejercicios.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion');
            }
        });
    };
    EjercicioMostrarComponent.prototype.numEjercicios = function () {
        return this.ejercicios.length;
    };
    return EjercicioMostrarComponent;
}());
EjercicioMostrarComponent = __decorate([
    core_1.Component({
        selector: 'ejercicio-mostrar',
        templateUrl: 'app/views/ejercicio-mostrar.html',
        providers: [ejercicio_service_1.EjercicioService] //Necesitamos esto para poder usar los metodos
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService])
], EjercicioMostrarComponent);
exports.EjercicioMostrarComponent = EjercicioMostrarComponent;
//# sourceMappingURL=ejercicio-mostrar.component.js.map