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
var router_1 = require("@angular/router");
var authentication_service_1 = require("../services/authentication.service");
var messages = require("../constants/messagesResources");
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.modelLogin = {};
        this.modelRegistro = {};
        this.loading = false;
        this.error = '';
        this.screenHeight = screen.height + "px";
        this.MS = messages;
        this.registro = false;
        this.msg = "";
        this.modalRegistro = false;
        this.visibleAnimate = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.modelLogin.usuario, this.modelLogin.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.user = JSON.parse(localStorage.getItem('currentUser')).user;
                if (_this.user.role == 'admin') {
                    _this.router.navigate(['/admin']);
                }
                else if (_this.user.role == 'profesor')
                    _this.router.navigate(['/profesor']);
                else if (_this.user.role == 'alumno')
                    _this.router.navigate(['/alumno']);
            }
            else {
                _this.error = _this.MS.LOGIN_INCORRECTO;
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.mostrarRegistro = function (mostrar) {
        this.registro = mostrar;
    };
    LoginComponent.prototype.registrar = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.registro(this.modelRegistro).subscribe(function (result) {
            _this.msg = result.message;
            _this.modalRegistro = true;
            setTimeout(function () { return _this.visibleAnimate = true; });
            _this.loading = false;
        }, function (error) {
            _this.msg = error.message;
            _this.modalRegistro = true;
            setTimeout(function () { return _this.visibleAnimate = true; });
            _this.loading = false;
        });
    };
    LoginComponent.prototype.cerrarModal = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalRegistro = false; }, 300);
        this.msg = "";
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'login',
        templateUrl: 'app/views/login.html',
        providers: [authentication_service_1.AuthenticationService]
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthenticationService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map