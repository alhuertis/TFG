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
var authentication_service_1 = require("../services/authentication.service");
var user_1 = require("../models/user");
//los decoradores no tienen punto y coma
var PanelAdminComponent = (function () {
    function PanelAdminComponent(_authenticationService) {
        this._authenticationService = _authenticationService;
        // pager object
        this.pager = {};
        this.users = [];
        this.msg = "";
        this.modalRegistro = false;
        this.modalUsuario = false;
        this.visibleAnimate = false;
        this.userInfo = new user_1.User();
    }
    PanelAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authenticationService.getRegistros().subscribe(function (result) {
            _this.users = result.registros;
            _this.setPage(1);
        });
    };
    PanelAdminComponent.prototype.aprobarRegistro = function (usuario) {
        var _this = this;
        this._authenticationService.borrarRegistro(usuario).subscribe(function (result) {
            if (result.resultado == 'ko') {
                _this.msg = result.message;
                setTimeout(function () { return _this.visibleAnimate = true; });
                _this.modalRegistro = true;
            }
            else if (result.resultado == 'ok') {
                _this._authenticationService.guardarUsuario(usuario).subscribe(function (result) {
                    _this.msg = result.message;
                    setTimeout(function () { return _this.visibleAnimate = true; });
                    _this.modalRegistro = true;
                    for (var i = 0; i < _this.users.length; i++) {
                        if (_this.users[i]._id == usuario._id) {
                            _this.users.splice(i, 1);
                            continue;
                        }
                    }
                    for (var i = 0; i < _this.pagedItems.length; i++) {
                        if (_this.pagedItems[i]._id == usuario._id) {
                            _this.pagedItems.splice(i, 1);
                            continue;
                        }
                    }
                    if (_this.pagedItems.length > 0)
                        _this.setPage(_this.pager.currentPage);
                    else
                        _this.setPage(_this.pager.currentPage - 1);
                }, function (error) {
                    _this.msg = result.message;
                    setTimeout(function () { return _this.visibleAnimate = true; });
                    _this.modalRegistro = true;
                });
            }
        }, function (error) {
            _this.msg = error.message;
            setTimeout(function () { return _this.visibleAnimate = true; });
            _this.modalRegistro = true;
        });
    };
    PanelAdminComponent.prototype.desaprobarRegistro = function (usuario) {
        var _this = this;
        this._authenticationService.borrarRegistro(usuario).subscribe(function (result) {
            _this.msg = result.message;
            setTimeout(function () { return _this.visibleAnimate = true; });
            _this.modalRegistro = true;
            for (var i = 0; i < _this.users.length; i++) {
                if (_this.users[i]._id == usuario._id) {
                    _this.users.splice(i, 1);
                    continue;
                }
            }
            for (var i = 0; i < _this.pagedItems.length; i++) {
                if (_this.pagedItems[i]._id == usuario._id) {
                    _this.pagedItems.splice(i, 1);
                    continue;
                }
            }
            if (_this.pagedItems.length > 0)
                _this.setPage(_this.pager.currentPage);
            else
                _this.setPage(_this.pager.currentPage - 1);
        }, function (error) {
            _this.msg = error.message;
            setTimeout(function () { return _this.visibleAnimate = true; });
            _this.modalRegistro = true;
        });
    };
    PanelAdminComponent.prototype.cerrarModal = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalRegistro = false; }, 300);
        this.msg = "";
    };
    PanelAdminComponent.prototype.cerrarModalInfo = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalUsuario = false; }, 300);
        this.msg = "";
    };
    PanelAdminComponent.prototype.verUsuario = function (usuario) {
        var _this = this;
        this.userInfo = usuario;
        setTimeout(function () { return _this.visibleAnimate = true; });
        this.modalUsuario = true;
    };
    PanelAdminComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._authenticationService.getPager(this.users.length, page);
        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return PanelAdminComponent;
}());
PanelAdminComponent = __decorate([
    core_1.Component({
        selector: 'panel-admin',
        templateUrl: 'app/views/panel-admin.html',
        providers: [authentication_service_1.AuthenticationService]
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], PanelAdminComponent);
exports.PanelAdminComponent = PanelAdminComponent;
//# sourceMappingURL=panel-admin.component.js.map