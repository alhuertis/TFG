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
var ejercicio_service_1 = require("../services/ejercicio.service");
var ejercicio_1 = require("../models/ejercicio");
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var EjercicioAddComponent = (function () {
    function EjercicioAddComponent(_ejercicioService, _route, _router) {
        this._ejercicioService = _ejercicioService;
        this._route = _route;
        this._router = _router;
        this.niveles = ['Bajo', 'Medio', 'Avanzado'];
        this.tipos = [1, 2, 3, 4];
        this.titulo = "Crear ejercicio";
    }
    EjercicioAddComponent.prototype.ngOnInit = function () {
        //Lo ponemos asi para rellenarlo con el chuwidatabindin
        this.ejercicio = new ejercicio_1.Ejercicio("", "", "", "", null, "Antonio Sarasa", "UCM", new Date(), new Date(), "", "", "", "", "", "");
    };
    EjercicioAddComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.ejercicio);
        this._ejercicioService.addEjercicio(this.ejercicio).subscribe(function (response) {
            if (!response.ejercicio) {
                alert('Error en el servidor');
            }
            else {
                _this.ejercicio = response.ejercicio;
                _this._router.navigate(['/']);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion');
            }
        });
    };
    return EjercicioAddComponent;
}());
EjercicioAddComponent = __decorate([
    core_1.Component({
        selector: 'ejercicio-add',
        templateUrl: 'app/views/ejercicio-add.html',
        providers: [ejercicio_service_1.EjercicioService]
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService,
        router_1.ActivatedRoute,
        router_1.Router])
], EjercicioAddComponent);
exports.EjercicioAddComponent = EjercicioAddComponent;
//# sourceMappingURL=ejercicio-add.component.js.map