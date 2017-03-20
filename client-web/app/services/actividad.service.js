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
//Ponemos esto antes de exportar la clase para que sea injectable
var ActividadService = (function () {
    function ActividadService(_http) {
        this._http = _http;
        this.url = 'http://localhost:3678/api/';
    }
    ActividadService.prototype.getActividades = function () {
        return this._http.get(this.url + 'actividades').map(function (res) { return res.json(); });
    };
    ActividadService.prototype.getActividad = function (id) {
        console.log('Llamando a ' + this.url + 'actividad/' + id);
        return this._http.get(this.url + 'actividad/' + id).map(function (res) { return res.json(); });
    };
    ActividadService.prototype.addActividad = function (actividad) {
        var json = JSON.stringify(actividad);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'ejercicio', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return ActividadService;
}());
ActividadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ActividadService);
exports.ActividadService = ActividadService;
//# sourceMappingURL=actividad.service.js.map