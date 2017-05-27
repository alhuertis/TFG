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
var SolucionService = (function () {
    function SolucionService(_http) {
        this._http = _http;
        //this.url= 'http://localhost:3678/api2/';
        this.url = 'http://' + window.location.hostname + ':3678/apiSolucion/';
    }
    SolucionService.prototype.saveSolucion = function (solucion) {
        var json = JSON.stringify(solucion);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'solucion', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.updateSolucion = function (solucion) {
        var json = JSON.stringify(solucion);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put(this.url + 'solucion/' + solucion._id, params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSoluciones = function () {
        return this._http.get(this.url + 'soluciones').map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSolucion = function (id) {
        return this._http.get(this.url + 'solucion/' + id).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getTerminadasById = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-terminadasId', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getTerminadasByIdNB = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-terminadasIdNB', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getTerminadasByIdNM = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-terminadasIdNM', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getTerminadasByIdNA = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-terminadasIdNA', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSinTerminarById = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-sinTerminarId', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSinTerminarByIdNB = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-sinTerminarIdNB', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSinTerminarByIdNM = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-sinTerminarIdNM', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSinTerminarByIdNA = function (model) {
        var params = { _id: model };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-sinTerminarIdNA', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getTerminadasByProfesor = function (id_alumno, id_profesor) {
        var params = { _id: id_alumno, profesor: id_profesor };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-terminadasByProfesor', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getSinTerminarByProfesor = function (id_alumno, id_profesor) {
        var params = { _id: id_alumno, profesor: id_profesor };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'soluciones-sinTerminarByProfesor', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.borrarEjercicio = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.put(this.url + 'soluciones-ejercicio/' + id, { headers: headers }).map(function (res) { return res.json(); });
    };
    SolucionService.prototype.getPager = function (totalItems, currentPage, pageSize) {
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
    return SolucionService;
}());
SolucionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SolucionService);
exports.SolucionService = SolucionService;
//# sourceMappingURL=solucion.service.js.map