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
//Es un objeto que nos permite injectar este servicio dentro de otras claes, sin hacer new.
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var _ = require("underscore");
//Ponemos esto antes de exportar la clase para que sea injectable
var EjercicioService = (function () {
    function EjercicioService(_http) {
        this._http = _http;
        //this.url= 'http://localhost:3678/api/';
        this.url = 'http://' + window.location.hostname + ':3678/api/';
    }
    EjercicioService.prototype.getEjercicios = function () {
        return this._http.get(this.url + 'ejercicios').map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjercicio = function (id) {
        console.log('Llamando a ' + this.url + 'ejercicio/' + id);
        return this._http.get(this.url + 'ejercicio/' + id).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.addEjercicio = function (ejercicio) {
        var json = JSON.stringify(ejercicio);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'ejercicio', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.borrarEjercicio = function (id) {
        return this._http.delete(this.url + 'ejercicio/' + id).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.updateEjercicio = function (model) {
        var json = JSON.stringify(model);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put(this.url + 'ejercicio/' + model._id, params, { headers: headers }).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccion = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccion/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionNivelA = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionNivelA/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionNivelM = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionNivelM/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionNivelB = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionNivelB/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionTipo1 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionTipo1/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionTipo2 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionTipo2/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionTipo3 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionTipo3/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersMiColeccionTipo4 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/miColeccionTipo4/' + id_profesor).map(function (res) { return res.json(); });
    };
    //Otras colecciones
    EjercicioService.prototype.getEjersOtrasColecciones = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColecciones/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesNivelA = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesNivelA/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesNivelM = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesNivelM/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesNivelB = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesNivelB/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesTipo1 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesTipo1/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesTipo2 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesTipo2/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesTipo3 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesTipo3/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getEjersOtrasColeccionesTipo4 = function (id_profesor) {
        return this._http.get(this.url + 'ejercicios/otrasColeccionesTipo4/' + id_profesor).map(function (res) { return res.json(); });
    };
    EjercicioService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 5; }
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            }
            else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
            else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    return EjercicioService;
}());
EjercicioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EjercicioService);
exports.EjercicioService = EjercicioService;
//# sourceMappingURL=ejercicio.service.js.map