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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var _ = require("underscore");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.url = 'http://' + window.location.hostname + ':3678/apiAuth/';
    }
    AuthenticationService.prototype.login = function (alias, password) {
        var _this = this;
        var json = JSON.stringify({ alias: alias, password: password });
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + 'auth/login', params, { headers: headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            var user = response.json() && response.json().user;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.registro = function (model) {
        var json = JSON.stringify(model);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + 'auth/registro', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.guardarUsuario = function (model) {
        var json = JSON.stringify(model);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + 'auth/guardarUsuario', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.borrarRegistro = function (model) {
        var json = JSON.stringify(model);
        var params = json;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url + 'auth/borrarRegistro', params, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.getRegistros = function () {
        return this.http.get(this.url + 'auth/registros').map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.getPager = function (totalItems, currentPage, pageSize) {
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
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map