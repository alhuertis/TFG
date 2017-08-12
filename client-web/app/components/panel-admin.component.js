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
var ng2_file_upload_1 = require("ng2-file-upload");
var messages = require("../constants/messagesResources");
//los decoradores no tienen punto y coma
var PanelAdminComponent = (function () {
    function PanelAdminComponent(_authenticationService) {
        this._authenticationService = _authenticationService;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://' + window.location.hostname + ':3678/apiAuth//auth/upload' });
        this.uploaderAlum = new ng2_file_upload_1.FileUploader({ url: 'http://' + window.location.hostname + ':3678/apiAuth//auth/uploadAlum' });
        this.uploaderDicc = new ng2_file_upload_1.FileUploader({ url: 'http://' + window.location.hostname + ':3678/apiDiccionario/uploadDiccionario' });
        // pager object
        this.pager = {};
        this.MS = messages;
        this.registros = [];
        this.usuarios = [];
        this.msg = "";
        this.visibleAnimate = false;
        this.verRegistros = false;
        this.verUsuarios = false;
        this.modalPdf = false;
        this.modalPdfAlum = false;
        this.modalDiccionario = false;
    }
    PanelAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this.uploaderAlum.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this.uploaderDicc.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this._authenticationService.getRegistros().subscribe(function (result) {
            _this.registros = result.registros;
            //this.setPage(1);
        });
        this._authenticationService.getAllUsers().subscribe(function (result) {
            _this.usuarios = result.usuarios;
            //this.setPage(1);
        });
    };
    PanelAdminComponent.prototype.entrarRegistros = function () {
        this.verRegistros = true;
    };
    PanelAdminComponent.prototype.salirRegistros = function () {
        this.verRegistros = false;
        this.actualizaDatos();
    };
    PanelAdminComponent.prototype.entrarUsuarios = function () {
        this.verUsuarios = true;
    };
    PanelAdminComponent.prototype.salirUsuarios = function () {
        this.verUsuarios = false;
        this.actualizaDatos();
    };
    PanelAdminComponent.prototype.actualizaDatos = function () {
        var _this = this;
        this._authenticationService.getRegistros().subscribe(function (result) {
            _this.registros = result.registros;
            //this.setPage(1);
        });
        this._authenticationService.getAllUsers().subscribe(function (result) {
            _this.usuarios = result.usuarios;
            //this.setPage(1);
        });
    };
    PanelAdminComponent.prototype.abrirModalPdf = function () {
        var _this = this;
        //this.uploader = new FileUploader({url:'http://'+window.location.hostname+':3678/apiAuth//auth/upload'});
        this.modalPdf = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelAdminComponent.prototype.cerrarModalPdf = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalPdf = false; }, 300);
    };
    PanelAdminComponent.prototype.abrirModalPdfAlum = function () {
        var _this = this;
        this.modalPdfAlum = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelAdminComponent.prototype.cerrarModalPdfAlum = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalPdfAlum = false; }, 300);
    };
    PanelAdminComponent.prototype.abrirModalDiccionario = function () {
        var _this = this;
        this.modalDiccionario = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelAdminComponent.prototype.cerrarModalDiccionario = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalDiccionario = false; }, 300);
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