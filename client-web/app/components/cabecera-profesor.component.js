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
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
var CabeceraProfesorComponent = (function () {
    function CabeceraProfesorComponent() {
        this.titulo = "Panel de profesor";
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
    }
    return CabeceraProfesorComponent;
}());
CabeceraProfesorComponent = __decorate([
    core_1.Component({
        selector: 'cabecera-profesor',
        templateUrl: 'app/views/cabecera-profesor.html',
    }),
    __metadata("design:paramtypes", [])
], CabeceraProfesorComponent);
exports.CabeceraProfesorComponent = CabeceraProfesorComponent;
//# sourceMappingURL=cabecera-profesor.component.js.map