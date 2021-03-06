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
//OnInit es como un constructor pero para meter logica. Los constructores solo inicializan variables
var core_1 = require("@angular/core");
var actividad_service_1 = require("../services/actividad.service");
var solucion_service_1 = require("../services/solucion.service");
var ejercicio_service_1 = require("../services/ejercicio.service");
var profesor_service_1 = require("../services/profesor.service");
var criteriaActividades_1 = require("../models/criteriaActividades");
var criteriaSolucion_1 = require("../models/criteriaSolucion");
var _ = require("underscore");
//los decoradores no tienen punto y coma
var PanelAlumnoComponent = (function () {
    function PanelAlumnoComponent(_actividadService, _profesorService, _solucionService, _ejercicioService) {
        this._actividadService = _actividadService;
        this._profesorService = _profesorService;
        this._solucionService = _solucionService;
        this._ejercicioService = _ejercicioService;
        // pager object (paginador)
        this.pager = {};
        this.pagerSolucion = {};
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        this.title = "Panel de alumno";
        this.actividades = [];
        this.profesores = [];
        this.disponibles = new Array();
        this.disponiblesNInicial = new Array();
        this.disponiblesNMedio = new Array();
        this.disponiblesNAlto = new Array();
        this.propuestas = new Array();
        this.propuestasByApertura = new Array();
        this.propuestasByCierre = new Array();
        this.actividadesResueltas = [];
        this.actividadesResueltasNB = [];
        this.actividadesResueltasNM = [];
        this.actividadesResueltasNA = [];
        this.actividadesSinResolver = [];
        this.actividadesSinResolverNB = [];
        this.actividadesSinResolverNM = [];
        this.actividadesSinResolverNA = [];
        this.actividadesAMostrar = [];
        this.datosAMostrar = new String();
        this.mostrarActividades = false;
        this.mostrarSoluciones = false;
        this.verSolu = false;
        this.solucion = null;
        this.visibleAnimate = false;
        this.modalBuscarActs = false;
        this.criteriaActividades = new criteriaActividades_1.CriteriaActividades();
        this.criteriaActividades.visible = true;
        this.modalBuscarSol = false;
        this.criteriaSolucion = new criteriaSolucion_1.CriteriaSolucion();
    }
    PanelAlumnoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._ejercicioService.existeFichero({ url: '../client-web/assets/guias/guia-alumno.pdf' }).subscribe(function (result) {
            _this.existeGuia = result.existe;
        }, function (error) { });
        this._solucionService.getTerminadasById(this.user._id).subscribe(function (result) {
            _this.actividadesResueltas = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getTerminadasByIdNB(this.user._id).subscribe(function (result) {
            _this.actividadesResueltasNB = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getTerminadasByIdNM(this.user._id).subscribe(function (result) {
            _this.actividadesResueltasNM = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getTerminadasByIdNA(this.user._id).subscribe(function (result) {
            _this.actividadesResueltasNA = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getSinTerminarById(this.user._id).subscribe(function (result) {
            _this.actividadesSinResolver = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getSinTerminarByIdNB(this.user._id).subscribe(function (result) {
            _this.actividadesSinResolverNB = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getSinTerminarByIdNM(this.user._id).subscribe(function (result) {
            _this.actividadesSinResolverNM = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._solucionService.getSinTerminarByIdNA(this.user._id).subscribe(function (result) {
            _this.actividadesSinResolverNA = result.soluciones;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getActividades().subscribe(function (result) {
            console.log(result);
            _this.actividades = result.actividades;
            if (!_this.actividades) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        //Obtener profesores
        this._profesorService.getProfesores().subscribe(function (result) {
            console.log(result);
            _this.profesores = result.profesores;
            if (!_this.profesores) {
                alert('Error al obtener profesores');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getDisponibles().subscribe(function (result) {
            console.log(result);
            _this.disponibles = result.actividades;
            if (!_this.disponibles) {
                alert('Error en el servidor');
            }
            else {
                _this.actividadesAMostrar = _this.actividades;
                _this.seleccionaDatosActividades('disponibles', false, '');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getDisponiblesNB().subscribe(function (result) {
            console.log(result);
            _this.disponiblesNInicial = result.actividades;
            if (!_this.disponiblesNInicial) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getDisponiblesNM().subscribe(function (result) {
            console.log(result);
            _this.disponiblesNMedio = result.actividades;
            if (!_this.disponiblesNMedio) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getDisponiblesNA().subscribe(function (result) {
            console.log(result);
            _this.disponiblesNAlto = result.actividades;
            if (!_this.disponiblesNAlto) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getPropuestas().subscribe(function (result) {
            console.log(result);
            _this.propuestas = result.actividades;
            if (!_this.propuestas) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getPropuestasByApertura().subscribe(function (result) {
            console.log(result);
            _this.propuestasByApertura = result.actividades;
            if (!_this.propuestasByApertura) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getPropuestasByCierre().subscribe(function (result) {
            console.log(result);
            _this.propuestasByCierre = result.actividades;
            if (!_this.propuestasByCierre) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
    }; //fin ngOnInit
    PanelAlumnoComponent.prototype.ngAfterViewInit = function () {
        //Este metodo se ejecuta tras cargar la vista. Usaremos aqui codigo jquery
        $.fn.extend({
            treed: function (o) {
                var openedClass = 'glyphicon-minus-sign';
                var closedClass = 'glyphicon-plus-sign';
                if (typeof o != 'undefined') {
                    if (typeof o.openedClass != 'undefined') {
                        openedClass = o.openedClass;
                    }
                    if (typeof o.closedClass != 'undefined') {
                        closedClass = o.closedClass;
                    }
                }
                ;
                //initialize each of the top levels
                var tree = $(this);
                tree.addClass("tree");
                tree.find('li').has("ul").each(function () {
                    var branch = $(this); //li with children ul
                    branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                    branch.addClass('branch');
                    branch.on('click', function (e) {
                        if (this == e.target) {
                            var icon = $(this).children('i:first');
                            icon.toggleClass(openedClass + " " + closedClass);
                            $(this).children().children().slideToggle(200);
                        }
                    });
                    branch.children().children().slideToggle(1);
                });
                //fire event from the dynamically added icon
                tree.find('.branch .indicator').each(function () {
                    $(this).on('click', function () {
                        $(this).closest('li').click();
                    });
                });
                //fire event to open branch if the li contains an anchor instead of text
                tree.find('.branch>a').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
                //fire event to open branch if the li contains a button instead of text
                tree.find('.branch>button').each(function () {
                    $(this).on('click', function (e) {
                        $(this).closest('li').click();
                        e.preventDefault();
                    });
                });
            }
        });
        //Initialization of treeviews
        $('#tree1').treed();
        //$('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});
        //$('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});
    }; //fin ngAfterViewInit
    PanelAlumnoComponent.prototype.seleccionaDatosActividades = function (datos, profesor, tipo) {
        var _this = this;
        this.mostrarActividades = false;
        this.mostrarSoluciones = false;
        if (profesor) {
            if (tipo == 'D') {
                this._actividadService.getByIdProfesorDisp(datos._id).subscribe(function (result) {
                    _this.actividadesAMostrar = result.actividades;
                    if (!_this.actividadesAMostrar) {
                        alert('Error en el servidor');
                    }
                    else {
                        if (_this.actividadesAMostrar.length > 0) {
                            _this.datosAMostrar = "Actividades disponibles de " + datos.nombre + " (" + _this.actividadesAMostrar.length + ")";
                            _this.mostrarActividades = true;
                            _this.setPage(1);
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert(_this.errorMessage);
                    }
                });
            }
            else if (tipo == 'P') {
                this._actividadService.getByIdProfesorProp(datos._id).subscribe(function (result) {
                    _this.actividadesAMostrar = result.actividades;
                    if (!_this.actividadesAMostrar) {
                        alert('Error en el servidor');
                    }
                    else {
                        if (_this.actividadesAMostrar.length > 0) {
                            _this.datosAMostrar = "Actividades propuestas de " + datos.nombre + " (" + _this.actividadesAMostrar.length + ")";
                            _this.mostrarActividades = true;
                            _this.setPage(1);
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert(_this.errorMessage);
                    }
                });
            }
        }
        else {
            switch (datos) {
                case 'disponibles':
                    this.actividadesAMostrar = this.disponibles;
                    this.datosAMostrar = "Actividades disponibles";
                    break;
                case 'disponibles nb':
                    this.actividadesAMostrar = this.disponiblesNInicial;
                    this.datosAMostrar = "Disponibles nivel inicial";
                    break;
                case 'disponibles nm':
                    this.actividadesAMostrar = this.disponiblesNMedio;
                    this.datosAMostrar = "Disponibles nivel medio";
                    break;
                case 'disponibles na':
                    this.actividadesAMostrar = this.disponiblesNAlto;
                    this.datosAMostrar = "Disponibles nivel avanzado";
                    break;
                case 'propuestas':
                    this.actividadesAMostrar = this.propuestas;
                    this.datosAMostrar = "Actividades propuestas";
                    break;
                case 'propuestas apertura':
                    this.actividadesAMostrar = this.propuestasByApertura;
                    this.datosAMostrar = "Actividades propuestas por orden de apertura";
                    break;
                case 'propuestas cierre':
                    this.actividadesAMostrar = this.propuestasByCierre;
                    this.datosAMostrar = "Actividades propuestas por orden cierre";
                    break;
            }
            this.mostrarActividades = true;
            this.setPage(1);
        }
    };
    PanelAlumnoComponent.prototype.seleccionaDatosSoluciones = function (datos, profesor, tipo) {
        var _this = this;
        this.mostrarActividades = false;
        this.mostrarSoluciones = false;
        if (profesor) {
            if (tipo == 'R') {
                this._solucionService.getTerminadasByProfesor(this.user._id, datos._id).subscribe(function (result) {
                    _this.solucionesAMostrar = result.soluciones;
                    if (!_this.solucionesAMostrar) {
                        alert('Error en el servidor');
                    }
                    else {
                        if (_this.solucionesAMostrar.length > 0) {
                            _this.datosAMostrar = "Actividades resueltas de " + datos.nombre + " (" + _this.solucionesAMostrar.length + ")";
                            _this.mostrarActividades = false;
                            _this.mostrarSoluciones = true;
                            _this.setPageSoluciones(1);
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert(_this.errorMessage);
                    }
                });
            }
            else if (tipo == 'SR') {
                this._solucionService.getSinTerminarByProfesor(this.user._id, datos._id).subscribe(function (result) {
                    _this.solucionesAMostrar = result.soluciones;
                    if (!_this.solucionesAMostrar) {
                        alert('Error en el servidor');
                    }
                    else {
                        if (_this.solucionesAMostrar.length > 0) {
                            _this.datosAMostrar = "Actividades sin terminar de " + datos.nombre + " (" + _this.solucionesAMostrar.length + ")";
                            _this.mostrarActividades = false;
                            _this.mostrarSoluciones = true;
                            _this.setPageSoluciones(1);
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert(_this.errorMessage);
                    }
                });
            }
        }
        else {
            switch (datos) {
                case 'resueltas':
                    this.solucionesAMostrar = this.actividadesResueltas;
                    this.datosAMostrar = "Mis actividades resueltas";
                    break;
                case 'resueltasNB':
                    this.solucionesAMostrar = this.actividadesResueltasNB;
                    this.datosAMostrar = "Mis actividades resueltas (nivel inicial)";
                    break;
                case 'resueltasNM':
                    this.solucionesAMostrar = this.actividadesResueltasNM;
                    this.datosAMostrar = "Mis actividades resueltas (nivel medio)";
                    break;
                case 'resueltasNA':
                    this.solucionesAMostrar = this.actividadesResueltasNA;
                    this.datosAMostrar = "Mis actividades resueltas (nivel avanzado)";
                    break;
                case 'sin-resolver':
                    this.solucionesAMostrar = this.actividadesSinResolver;
                    this.datosAMostrar = "Mis actividades resueltas (nivel avanzado)";
                    break;
                case 'sin-resolverNB':
                    this.solucionesAMostrar = this.actividadesSinResolverNB;
                    this.datosAMostrar = "Mis actividades sin terminar (nivel avanzado)";
                    break;
                case 'sin-resolverNM':
                    this.solucionesAMostrar = this.actividadesSinResolverNM;
                    this.datosAMostrar = "Mis actividades sin terminar (nivel avanzado)";
                    break;
                case 'sin-resolverNA':
                    this.solucionesAMostrar = this.actividadesSinResolverNA;
                    this.datosAMostrar = "Mis actividades sin resolver (nivel avanzado)";
                    break;
            }
            this.mostrarSoluciones = true;
            this.setPageSoluciones(1);
        }
    };
    PanelAlumnoComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._actividadService.getPager(this.actividadesAMostrar.length, page);
        // get current page of items
        this.pagedActividades = this.actividadesAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    PanelAlumnoComponent.prototype.verSolucion = function (solucion) {
        this.solucion = solucion;
        this.verSolu = true;
    };
    PanelAlumnoComponent.prototype.saliendoDeVerSolucion = function () {
        this.solucion = null;
        this.verSolu = false;
    };
    PanelAlumnoComponent.prototype.abrirBuscarActs = function () {
        var _this = this;
        this.modalBuscarActs = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelAlumnoComponent.prototype.cerrarBuscarActividades = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalBuscarActs = false; }, 300);
    };
    PanelAlumnoComponent.prototype.buscarActividades = function () {
        var _this = this;
        this._actividadService.getByCriteria(this.criteriaActividades).subscribe(function (result) {
            _this.actividadesAMostrar = result.actividades;
            _this.mostrarSoluciones = false;
            _this.mostrarActividades = true;
            if (_this.actividadesAMostrar.length > 0) {
                _this.datosAMostrar = "Resultado de la busqueda";
                _this.setPage(1);
                _this.modalBuscarActs = false;
            }
            else {
                _this.datosAMostrar = "No se han encontrado resultados...";
                _this.actividadesAMostrar = [];
                _this.pagedActividades = [];
                _this.setPage(-1);
                //this.msgBusqueda="No hay soluciones para este criterio de busqueda";
                _this.modalBuscarActs = false;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
    };
    PanelAlumnoComponent.prototype.limpiarFiltroActs = function () {
        this.criteriaActividades = new criteriaActividades_1.CriteriaActividades();
    };
    PanelAlumnoComponent.prototype.abrirBuscarSol = function () {
        var _this = this;
        this.modalBuscarSol = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelAlumnoComponent.prototype.cerrarBuscarSoluciones = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalBuscarSol = false; }, 300);
    };
    PanelAlumnoComponent.prototype.buscarSoluciones = function () {
        var _this = this;
        var actividades;
        actividades = [];
        this._actividadService.getByCriteria(this.criteriaActividades).subscribe(function (result) {
            actividades = result.actividades;
            if (actividades.length > 0) {
                _this.criteriaSolucion.actividades = [];
                for (var _i = 0, actividades_1 = actividades; _i < actividades_1.length; _i++) {
                    var act = actividades_1[_i];
                    _this.criteriaSolucion.actividades.push(act._id);
                }
            }
            _this.criteriaSolucion.alumno = _this.user._id;
            _this._solucionService.getByCriteria(_this.criteriaSolucion).subscribe(function (result) {
                _this.solucionesAMostrar = result.soluciones;
                _this.mostrarActividades = false;
                _this.mostrarSoluciones = true;
                if (_this.solucionesAMostrar.length > 0) {
                    _this.datosAMostrar = "Resultado de la busqueda";
                    _this.setPageSoluciones(1);
                    _this.modalBuscarSol = false;
                }
                else {
                    _this.datosAMostrar = "No se han encontrado resultados...";
                    _this.solucionesAMostrar = [];
                    _this.pagedSoluciones = [];
                    _this.setPageSoluciones(-1);
                    //this.msgBusqueda="No hay soluciones para este criterio de busqueda";
                    _this.modalBuscarSol = false;
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert('Error en la peticion de mi coleccion');
                }
            });
        });
    };
    PanelAlumnoComponent.prototype.limpiarFiltroSol = function () {
        this.criteriaSolucion = new criteriaSolucion_1.CriteriaSolucion();
    };
    PanelAlumnoComponent.prototype.ordenaSolTitulo = function () {
        this.pagedSoluciones = _.sortBy(this.pagedSoluciones, "titulo");
    };
    PanelAlumnoComponent.prototype.ordenaSolFecha = function () {
        this.pagedSoluciones = _.sortBy(this.pagedSoluciones, "fechaCreacion");
    };
    PanelAlumnoComponent.prototype.ordenaSolNivel = function () {
        this.pagedSoluciones = _.sortBy(this.pagedSoluciones, "nivel");
    };
    PanelAlumnoComponent.prototype.ordenaSolReverse = function () {
        this.pagedSoluciones.reverse();
    };
    PanelAlumnoComponent.prototype.ordenaActsTitulo = function () {
        this.pagedActividades = _.sortBy(this.pagedActividades, "titulo");
    };
    PanelAlumnoComponent.prototype.ordenaActsFecha = function () {
        this.pagedActividades = _.sortBy(this.pagedActividades, "fechaCreacion");
    };
    PanelAlumnoComponent.prototype.ordenaActsNivel = function () {
        this.pagedActividades = _.sortBy(this.pagedActividades, "nivel");
    };
    PanelAlumnoComponent.prototype.ordenaActsReverse = function () {
        this.pagedActividades.reverse();
    };
    PanelAlumnoComponent.prototype.setPageSoluciones = function (page) {
        if (page < 1 || page > this.pagerSolucion.totalPages) {
            return;
        }
        // get pager object from service
        this.pagerSolucion = this._actividadService.getPager(this.solucionesAMostrar.length, page);
        // get current page of items
        this.pagedSoluciones = this.solucionesAMostrar.slice(this.pagerSolucion.startIndex, this.pagerSolucion.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    return PanelAlumnoComponent;
}());
PanelAlumnoComponent = __decorate([
    core_1.Component({
        selector: 'panel-alumno',
        templateUrl: 'app/views/panel-alumno.html',
        providers: [actividad_service_1.ActividadService, profesor_service_1.ProfesorService, solucion_service_1.SolucionService, ejercicio_service_1.EjercicioService],
        styleUrls: ['../../assets/css/menu-profesor.css'],
    }),
    __metadata("design:paramtypes", [actividad_service_1.ActividadService,
        profesor_service_1.ProfesorService,
        solucion_service_1.SolucionService,
        ejercicio_service_1.EjercicioService])
], PanelAlumnoComponent);
exports.PanelAlumnoComponent = PanelAlumnoComponent;
//# sourceMappingURL=panel-alumno.component.js.map