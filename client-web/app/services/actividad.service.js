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
var ActividadService = (function () {
    function ActividadService(_http) {
        this._http = _http;
        //this.url= 'http://localhost:3678/api2/';
        this.url = 'http://' + window.location.hostname + ':3678/api2/';
    }
    ActividadService.prototype.getActividades = function () {
        return this._http.get(this.url + 'actividades').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActividad = function (id) {
        return this._http.get(this.url + 'actividad/' + id).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.cargarActividad = function (id) {
        return this._http.get(this.url + 'cargarActividad/' + id).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.borrarEjercicio = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put(this.url + 'actividad-ejercicio/' + id, { headers: headers }).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.deleteActividad = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.delete(this.url + 'actividad/' + id, { headers: headers }).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getDisponibles = function () {
        return this._http.get(this.url + 'actividad-disponibles').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getPropuestas = function () {
        return this._http.get(this.url + 'actividad-propuestas').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getPropuestasByApertura = function () {
        return this._http.get(this.url + 'actividad-propuestasByApertura').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getPropuestasByCierre = function () {
        return this._http.get(this.url + 'actividad-propuestasByCierre').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getDisponiblesNB = function () {
        return this._http.get(this.url + 'actividad-disponiblesNB').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getDisponiblesNM = function () {
        return this._http.get(this.url + 'actividad-disponiblesNM').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getDisponiblesNA = function () {
        return this._http.get(this.url + 'actividad-disponiblesNA').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getByIdProfesorDisp = function (id) {
        return this._http.get(this.url + 'actividad-idProfesorDisp/' + id).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getByIdProfesorProp = function (id) {
        return this._http.get(this.url + 'actividad-idProfesorProp/' + id).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.addActividad = function (actividad) {
        var json = JSON.stringify(actividad);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'actividad', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.updateActividad = function (actividad) {
        var json = JSON.stringify(actividad);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put(this.url + 'actividad/' + actividad._id, params, { headers: headers }).map(function (res) { return res.json(); });
    };
    //Profesores
    ActividadService.prototype.getActsMiColeccion = function (id_profesor) {
        return this._http.get(this.url + 'actividad-miColeccion/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsMiColeccionNivelA = function (id_profesor) {
        return this._http.get(this.url + 'actividad-miColeccionNivelA/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsMiColeccionNivelM = function (id_profesor) {
        return this._http.get(this.url + 'actividad-miColeccionNivelM/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsMiColeccionNivelB = function (id_profesor) {
        return this._http.get(this.url + 'actividad-miColeccionNivelB/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsVisibles = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actVisibles/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsVisiblesNivelA = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actVisiblesnivelA/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsVisiblesNivelM = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actVisiblesnivelM/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsVisiblesNivelB = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actVisiblesnivelB/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsNoVisibles = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actNoVisibles/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsNoVisiblesNivelA = function (id_profesor) {
        return this._http.get(this.url + 'actividad-ActNoVisiblesNivelA/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsNoVisiblesNivelM = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actNoVisiblesNivelM/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsNoVisiblesNivelB = function (id_profesor) {
        return this._http.get(this.url + 'actividad-actNoVisiblesNivelB/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsOtrasColecciones = function (id_profesor) {
        return this._http.get(this.url + 'actividad-otrasColecciones/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsOtrasColeccionesNivelA = function (id_profesor) {
        return this._http.get(this.url + 'actividad-otrasColeccionesNivelA/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsOtrasColeccionesNivelM = function (id_profesor) {
        return this._http.get(this.url + 'actividad-otrasColeccionesNivelM/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActsOtrasColeccionesNivelB = function (id_profesor) {
        return this._http.get(this.url + 'actividad-otrasColeccionesNivelB/' + id_profesor).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getByCriteria = function (criteria) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'actividades-byCriteria', criteria, { headers: headers }).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.borrarColeccion = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'borrarColeccion', { headers: headers }).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
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
    return ActividadService;
}());
ActividadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ActividadService);
exports.ActividadService = ActividadService;
//# sourceMappingURL=actividad.service.js.map