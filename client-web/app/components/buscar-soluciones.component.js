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
var ejercicio_service_1 = require("../services/ejercicio.service");
var actividad_service_1 = require("../services/actividad.service");
var solucion_service_1 = require("../services/solucion.service");
var authentication_service_1 = require("../services/authentication.service");
var solucion_1 = require("../models/solucion");
var criteriaSolucion_1 = require("../models/criteriaSolucion");
//Para usar undescore y jquery
var _ = require("underscore");
var PanelBuscarSolucionesComponent = (function () {
    function PanelBuscarSolucionesComponent(_ejercicioService, _actividadService, _solucionService, _authenticationService) {
        this._ejercicioService = _ejercicioService;
        this._actividadService = _actividadService;
        this._solucionService = _solucionService;
        this._authenticationService = _authenticationService;
        //@Input() prueba: string;
        this.salir = new core_1.EventEmitter();
        // pager object (paginador)
        this.pager = {};
        this.pagerSolucion = {};
        this.errorMessage = "";
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        this.actividades = new Array();
        this.mostrarSoluciones = false;
        this.alumnos = new Array();
        this.busquedaByAlumnos = new Array();
        this.fecha_desde = null;
        this.fecha_hasta = null;
        this.soluciones = [];
        this.msgBusqueda = "";
        this.boolMsgBusqueda = false;
        this.verSolu = false;
        this.solucion = new solucion_1.Solucion();
    }
    PanelBuscarSolucionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._actividadService.getActsMiColeccion(this.user._id).subscribe(function (result) {
            _this.actividades = result.miColeccionAct;
            if (!_this.actividades) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._authenticationService.getListaUsers().subscribe(function (result) {
            _this.alumnos = result.usuarios;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                alert('Error en la peticion de mi coleccion');
            }
        });
    };
    /*ngAfterViewInit(){
    }*/
    PanelBuscarSolucionesComponent.prototype.exit = function () {
        this.salir.emit();
    };
    PanelBuscarSolucionesComponent.prototype.addAlumno = function (alu) {
        for (var i = 0; i < this.alumnos.length; i++) {
            if (this.alumnos[i]._id == alu) {
                this.busquedaByAlumnos.push(this.alumnos[i]);
            }
        }
        this.busquedaByAlumnos = _.uniq(this.busquedaByAlumnos);
    };
    PanelBuscarSolucionesComponent.prototype.deleteAlumno = function (alu) {
        for (var i = 0; i < this.busquedaByAlumnos.length; i++) {
            if (this.busquedaByAlumnos[i]._id == alu) {
                this.busquedaByAlumnos.splice(i, 1);
            }
        }
        $("#porAlumnos").val($("#porAlumnos option:first").val());
    };
    PanelBuscarSolucionesComponent.prototype.limpiarFiltro = function () {
        this.busquedaByActividad = null;
        this.busquedaByAlumnos = [];
        $("#porActividades").val($("#porActividades option:first").val());
        $("#porAlumnos").val($("#porAlumnos option:first").val());
        this.fecha_desde = null;
        this.fecha_hasta = null;
    };
    PanelBuscarSolucionesComponent.prototype.buscar = function () {
        var _this = this;
        var criteria = new criteriaSolucion_1.CriteriaSolucion();
        if (this.busquedaByActividad != null) {
            criteria.id_actividad = this.busquedaByActividad;
        }
        if (this.busquedaByAlumnos != null) {
            criteria.ids_alumnos = this.busquedaByAlumnos;
        }
        if (this.fecha_desde != null) {
            criteria.desde = this.fecha_desde;
        }
        if (this.fecha_hasta != null) {
            criteria.hasta = this.fecha_hasta;
        }
        criteria.terminado = true;
        this._solucionService.getByCriteria(criteria).subscribe(function (result) {
            _this.soluciones = result.soluciones;
            if (!_this.soluciones) {
                alert('Error en el servidor');
            }
            else {
                if (_this.soluciones.length > 0) {
                    _this.setPageSoluciones(1);
                    _this.mostrarSoluciones = true;
                    _this.msgBusqueda = "";
                    _this.boolMsgBusqueda = false;
                }
                else {
                    _this.pagedSoluciones = [];
                    _this.mostrarSoluciones = false;
                    _this.msgBusqueda = "No hay soluciones para este criterio de busqueda";
                    _this.boolMsgBusqueda = true;
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
    };
    PanelBuscarSolucionesComponent.prototype.verSolucion = function (solucion) {
        this.solucion = solucion;
        this.verSolu = true;
    };
    PanelBuscarSolucionesComponent.prototype.saliendoDeVerSolucion = function () {
        this.solucion = new solucion_1.Solucion();
        this.verSolu = false;
    };
    PanelBuscarSolucionesComponent.prototype.setPageSoluciones = function (page) {
        if (page < 1 || page > this.pagerSolucion.totalPages) {
            return;
        }
        // get pager object from service
        this.pagerSolucion = this._actividadService.getPager(this.soluciones.length, page);
        // get current page of items
        this.pagedSoluciones = this.soluciones.slice(this.pagerSolucion.startIndex, this.pagerSolucion.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    return PanelBuscarSolucionesComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PanelBuscarSolucionesComponent.prototype, "salir", void 0);
PanelBuscarSolucionesComponent = __decorate([
    core_1.Component({
        selector: 'panel-buscar-soluciones',
        templateUrl: 'app/views/panel-buscar-soluciones.html',
        providers: [ejercicio_service_1.EjercicioService, actividad_service_1.ActividadService, solucion_service_1.SolucionService, authentication_service_1.AuthenticationService]
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService,
        actividad_service_1.ActividadService,
        solucion_service_1.SolucionService,
        authentication_service_1.AuthenticationService])
], PanelBuscarSolucionesComponent);
exports.PanelBuscarSolucionesComponent = PanelBuscarSolucionesComponent;
//# sourceMappingURL=buscar-soluciones.component.js.map