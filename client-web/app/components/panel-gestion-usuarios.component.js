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
        this.userUpdate = new user_1.User();
        this.errorMessage = "";
        this.message = "";
        this.modalMessage = false;
        this.modalModificar = false;
        this.modalEliminar = false;
        this.posUsuario = null;
        this.userBuscar = new user_1.User();
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
    PanelGestionUsuariosComponent.prototype.abrirModalPass = function (user) {
        var _this = this;
        this.userUpdate = user;
        setTimeout(function () { return _this.visibleAnimate = true; }, 200);
        this.modalPass = true;
    };
    PanelGestionUsuariosComponent.prototype.cerrarModalPass = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalPass = false; }, 300);
    };
    PanelGestionUsuariosComponent.prototype.cambiarPass = function () {
        var _this = this;
        if (this.nuevaPass != "" && this.nuevaPass == this.repeatNuevaPass) {
            this.userUpdate.password = this.nuevaPass;
            this._authenticationService.updateUserPass(this.userUpdate).subscribe(function (result) {
                if (result.respuesta == 'ok') {
                    _this.cerrarModalPass();
                    _this.message = "La contraseña ha sido actualizada correctamente";
                    _this.modalMessage = true;
                    setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                }
                else {
                    _this.cerrarModalPass();
                    _this.message = "Se ha producido un error actualizando la contraseña";
                    _this.modalMessage = true;
                    setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la peticio al servidor para cambier la contraseña');
                }
            });
        }
        else {
            this.message = "Las dos contraseñas deben coincidir";
            this.modalMessage = true;
            setTimeout(function () { return _this.visibleAnimate = true; }, 300);
        }
    };
    PanelGestionUsuariosComponent.prototype.cerrarModalMessage = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalMessage = false; }, 300);
        this.message = "";
    };
    PanelGestionUsuariosComponent.prototype.abrirModalModificar = function (user) {
        var _this = this;
        this.userUpdate = user;
        setTimeout(function () { return _this.visibleAnimate = true; }, 200);
        this.modalModificar = true;
    };
    PanelGestionUsuariosComponent.prototype.cerrarModalModificar = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalModificar = false; }, 300);
    };
    PanelGestionUsuariosComponent.prototype.modificarUsuario = function () {
        var _this = this;
        this._authenticationService.updateUser(this.userUpdate).subscribe(function (result) {
            if (result.respuesta == 'ok') {
                _this.cerrarModalModificar();
                _this.message = "Usuario actualizado correctamente";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
            }
            else {
                _this.cerrarModalModificar();
                _this.message = "Se ha producido un error actualizando los datos del usuario";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticio al servidor para modificar los datos de usario');
            }
        });
    };
    PanelGestionUsuariosComponent.prototype.abrirModalEliminar = function (user, i) {
        var _this = this;
        this.userUpdate = user;
        this.msg = "¿Desea eliminar a" + this.userUpdate.nombre + " " + this.userUpdate.apellidos + "?";
        setTimeout(function () { return _this.visibleAnimate = true; }, 200);
        this.modalEliminar = true;
    };
    PanelGestionUsuariosComponent.prototype.cerrarModalEliminar = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalEliminar = false; }, 300);
    };
    PanelGestionUsuariosComponent.prototype.eliminarUsuario = function () {
        var _this = this;
        if (this.userUpdate.role != 'admin') {
            this._authenticationService.borrarUsuario(this.userUpdate).subscribe(function (result) {
                if (result.respuesta == 'ok') {
                    _this.cerrarModalEliminar();
                    _this.message = "Usuario eliminado correctamente";
                    _this.modalMessage = true;
                    setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                    for (var i = 0; i < _this.users.length; i++) {
                        if (_this.userUpdate._id == _this.users[i]._id) {
                            _this.users.splice(i, 1);
                        }
                    }
                    _this.pagedItems.splice(_this.posUsuario, 1);
                }
                else {
                    _this.cerrarModalEliminar();
                    _this.message = "Se ha producido un error eliminando el usuario";
                    _this.modalMessage = true;
                    setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la peticio al servidor al borrar el usuario');
                }
            });
        }
        else {
            this.cerrarModalEliminar();
            this.message = "No puede borrar un administrador del sistema";
            this.modalMessage = true;
            setTimeout(function () { return _this.visibleAnimate = true; }, 300);
        }
    };
    PanelGestionUsuariosComponent.prototype.buscarUsuarios = function () {
        var _this = this;
        this._authenticationService.buscarUsuario(this.userBuscar).subscribe(function (result) {
            if (result.respuesta == 'ok') {
                _this.users = result.usuarios;
                if (_this.users.length)
                    _this.setPage(1);
                else {
                    _this.message = "No se han encontrado usuarios";
                    _this.modalMessage = true;
                    setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                }
            }
            else {
                _this.message = "Se ha producido un error en la busqueda de usuarios";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion al servidor al buscar usuarios');
            }
        });
    };
    PanelGestionUsuariosComponent.prototype.actualizarDatos = function () {
        var _this = this;
        this.userBuscar = new user_1.User();
        this._authenticationService.getAllUsers().subscribe(function (result) {
            _this.users = result.usuarios;
            _this.setPage(1);
        });
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