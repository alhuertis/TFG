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
var PanelGestionUsuariosComponent = (function () {
    function PanelGestionUsuariosComponent(_authenticationService) {
        this._authenticationService = _authenticationService;
        this.salir = new core_1.EventEmitter();
        // pager object
        this.pager = {};
        this.users = [];
        this.msg = "";
        this.modalRegistro = false;
        this.modalUsuario = false;
        this.visibleAnimate = false;
        this.userInfo = new user_1.User();
        this.modalPass = false;
        this.nuevaPass = "";
        this.repeatNuevaPass = "";
    }
    PanelGestionUsuariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authenticationService.getAllUsers().subscribe(function (result) {
            _this.users = result.usuarios;
            _this.setPage(1);
        });
    };
    PanelGestionUsuariosComponent.prototype.cerrarModal = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalRegistro = false; }, 300);
        this.msg = "";
    };
    PanelGestionUsuariosComponent.prototype.cerrarModalInfo = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalUsuario = false; }, 300);
        this.msg = "";
    };
    PanelGestionUsuariosComponent.prototype.verUsuario = function (usuario) {
        var _this = this;
        this.userInfo = usuario;
        setTimeout(function () { return _this.visibleAnimate = true; }, 200);
        this.modalUsuario = true;
    };
    PanelGestionUsuariosComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._authenticationService.getPager(this.users.length, page);
        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    PanelGestionUsuariosComponent.prototype.abrirModalPass = function () {
        var _this = this;
        setTimeout(function () { return _this.visibleAnimate = true; }, 200);
        this.modalPass = true;
    };
    PanelGestionUsuariosComponent.prototype.cerrarModalPass = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalPass = false; }, 300);
    };
    PanelGestionUsuariosComponent.prototype.cambiarPass = function () {
        if (this.nuevaPass != "" && this.nuevaPass == this.repeatNuevaPass) {
            alert("Son iguales");
        }
        else {
            alert("No son iguales");
        }
    };
    PanelGestionUsuariosComponent.prototype.exit = function () {
        this.salir.emit();
    };
    return PanelGestionUsuariosComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PanelGestionUsuariosComponent.prototype, "salir", void 0);
PanelGestionUsuariosComponent = __decorate([
    core_1.Component({
        selector: 'panel-gestion-usuarios',
        templateUrl: 'app/views/panel-gestion-usuarios.html',
        providers: [authentication_service_1.AuthenticationService]
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], PanelGestionUsuariosComponent);
exports.PanelGestionUsuariosComponent = PanelGestionUsuariosComponent;
//# sourceMappingURL=panel-gestion-usuarios.component.js.map