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
var ejercicio_service_1 = require("../services/ejercicio.service");
var actividad_service_1 = require("../services/actividad.service");
var solucion_service_1 = require("../services/solucion.service");
var actividad_1 = require("../models/actividad");
var criteriaEjercicios_1 = require("../models/criteriaEjercicios");
var criteriaActividades_1 = require("../models/criteriaActividades");
//Para usar undescore y jquery
var _ = require("underscore");
//los decoradores no tienen punto y coma
var PanelProfesorComponent = (function () {
    function PanelProfesorComponent(_ejercicioService, _actividadService, _solucionService) {
        this._ejercicioService = _ejercicioService;
        this._actividadService = _actividadService;
        this._solucionService = _solucionService;
        // pager object
        this.pager = {};
        //objeto update
        this.ejerUpdate = {};
        //Modificar ejer panel
        this.niveles = ['Inicial', 'Medio', 'Avanzado'];
        this.tipos = [1, 2, 3, 4];
        this.valoresLogico = [];
        this.tipoLogico = "";
        this.valorLogico = "";
        this.primeraVisita = true;
        this.title = "Panel de profesores";
        //this.user="Antonio Sarasa";
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        ///this.id_profesor= "00001";
        this.id_profesor = this.user._id;
        //this.user="Antonio Sarasa";
        //this.id_profesor= "000001";
        this.mostrarListaEjers = false;
        this.mostrarListaActs = false;
        this.datosAMostrar = "";
        this.actividad = [];
        this.miColeccionAct = new Array();
        this.miColeccionNivelAAct = new Array();
        this.miColeccionNivelMAct = new Array();
        this.miColeccionNivelBAct = new Array();
        this.visibles = new Array();
        this.visiblesNivelAAct = new Array();
        this.visiblesNivelMAct = new Array();
        this.visiblesNivelBAct = new Array();
        this.invisibles = new Array();
        this.invisiblesNivelAAct = new Array();
        this.invisiblesNivelMAct = new Array();
        this.invisiblesNivelBAct = new Array();
        this.actsAMostrar = [];
        this.datosSeleccionados = "";
        this.tipoSeleccionado = "";
        //this.actividad=[];
        this.modalEjercicio = false;
        this.modalActividad = false;
        this.modalMessage = false;
        this.visibleAnimate = false;
        this.updateActividad = new actividad_1.Actividad();
        this.updateActividadRestore = new actividad_1.Actividad();
        this.deleteAct = new actividad_1.Actividad();
        this.message = "";
        this.buscarSoluciones = false;
        this.criteriaEjercicios = new criteriaEjercicios_1.CriteriaEjercicios();
        this.modalBuscarEjer = false;
        this.criteriaActividades = new criteriaActividades_1.CriteriaActividades();
    }
    PanelProfesorComponent.prototype.ngOnInit = function () {
        //Obtencion de datos
        var _this = this;
        this._ejercicioService.getEjercicios().subscribe(function (result) {
            console.log(result);
            _this.ejercicios = result.ejercicios;
            if (!_this.ejercicios) {
                alert('Error en el servidor');
            }
            else {
                _this.loading = false;
                _this.nEjercicios = _this.ejercicios.length;
                if (_this.primeraVisita) {
                    _this.ejersAMostrar = _this.ejercicios;
                    _this.seleccionaDatos('ejercicios', 'ejercicios', 1);
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion');
            }
        }); //fin getEjercicios (Todos)
        this._ejercicioService.getEjersMiColeccion(this.id_profesor).subscribe(function (result) {
            _this.miColeccion = result.miColeccion;
            if (!_this.miColeccion) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccion = _this.miColeccion.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._ejercicioService.getEjersMiColeccion(this.id_profesor).subscribe(function (result) {
            _this.miColeccion = result.miColeccion;
            if (!_this.miColeccion) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccion = _this.miColeccion.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion
        this._ejercicioService.getEjersMiColeccionNivelA(this.id_profesor).subscribe(function (result) {
            _this.miColeccionNivelA = result.miColeccionNivelA;
            if (!_this.miColeccionNivelA) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionNivelA = _this.miColeccionNivelA.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Avanzado
        this._ejercicioService.getEjersMiColeccionNivelM(this.id_profesor).subscribe(function (result) {
            _this.miColeccionNivelM = result.miColeccionNivelM;
            if (!_this.miColeccionNivelM) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionNivelM = _this.miColeccionNivelM.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Medio
        this._ejercicioService.getEjersMiColeccionNivelB(this.id_profesor).subscribe(function (result) {
            _this.miColeccionNivelB = result.miColeccionNivelB;
            if (!_this.miColeccionNivelB) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionNivelB = _this.miColeccionNivelB.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel inicial
        this._ejercicioService.getEjersMiColeccionTipo1(this.id_profesor).subscribe(function (result) {
            _this.miColeccionTipo1 = result.miColeccionTipo1;
            if (!_this.miColeccionTipo1) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionTipo1 = _this.miColeccionTipo1.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 1
        this._ejercicioService.getEjersMiColeccionTipo2(this.id_profesor).subscribe(function (result) {
            _this.miColeccionTipo2 = result.miColeccionTipo2;
            if (!_this.miColeccionTipo2) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionTipo2 = _this.miColeccionTipo2.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 2
        this._ejercicioService.getEjersMiColeccionTipo3(this.id_profesor).subscribe(function (result) {
            _this.miColeccionTipo3 = result.miColeccionTipo3;
            if (!_this.miColeccionTipo3) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionTipo3 = _this.miColeccionTipo3.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 3
        this._ejercicioService.getEjersMiColeccionTipo4(this.id_profesor).subscribe(function (result) {
            _this.miColeccionTipo4 = result.miColeccionTipo4;
            if (!_this.miColeccionTipo4) {
                alert('Error en el servidor');
            }
            else {
                _this.nMiColeccionTipo4 = _this.miColeccionTipo4.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 4
        //Otras colecciones
        this._ejercicioService.getEjersOtrasColecciones(this.id_profesor).subscribe(function (result) {
            _this.otrasColecciones = result.otrasColecciones;
            if (!_this.otrasColecciones) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColecciones = _this.otrasColecciones.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._ejercicioService.getEjersOtrasColecciones(this.id_profesor).subscribe(function (result) {
            _this.otrasColecciones = result.otrasColecciones;
            if (!_this.otrasColecciones) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColecciones = _this.otrasColecciones.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion
        this._ejercicioService.getEjersOtrasColeccionesNivelA(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesNivelA = result.otrasColeccionesNivelA;
            if (!_this.otrasColeccionesNivelA) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesNivelA = _this.otrasColeccionesNivelA.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Avanzado
        this._ejercicioService.getEjersOtrasColeccionesNivelM(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesNivelM = result.otrasColeccionesNivelM;
            if (!_this.otrasColeccionesNivelM) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesNivelM = _this.otrasColeccionesNivelM.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Medio
        this._ejercicioService.getEjersOtrasColeccionesNivelB(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesNivelB = result.otrasColeccionesNivelB;
            if (!_this.otrasColeccionesNivelB) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesNivelB = _this.otrasColeccionesNivelB.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel inicial
        this._ejercicioService.getEjersOtrasColeccionesTipo1(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesTipo1 = result.otrasColeccionesTipo1;
            if (!_this.otrasColeccionesTipo1) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesTipo1 = _this.otrasColeccionesTipo1.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 1
        this._ejercicioService.getEjersOtrasColeccionesTipo2(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesTipo2 = result.otrasColeccionesTipo2;
            if (!_this.otrasColeccionesTipo2) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesTipo2 = _this.otrasColeccionesTipo2.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 2
        this._ejercicioService.getEjersOtrasColeccionesTipo3(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesTipo3 = result.otrasColeccionesTipo3;
            if (!_this.otrasColeccionesTipo3) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesTipo3 = _this.otrasColeccionesTipo3.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 3
        this._ejercicioService.getEjersOtrasColeccionesTipo4(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesTipo4 = result.otrasColeccionesTipo4;
            if (!_this.otrasColeccionesTipo4) {
                alert('Error en el servidor');
            }
            else {
                _this.nOtrasColeccionesTipo4 = _this.otrasColeccionesTipo4.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion tipo 4
        //Actividades
        this._actividadService.getActsMiColeccion(this.id_profesor).subscribe(function (result) {
            _this.miColeccionAct = result.miColeccionAct;
            if (!_this.miColeccionAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._actividadService.getActsMiColeccionNivelA(this.id_profesor).subscribe(function (result) {
            _this.miColeccionNivelAAct = result.miColeccionNivelAAct;
            if (!_this.miColeccionNivelAAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Avanzado
        this._actividadService.getActsMiColeccionNivelM(this.id_profesor).subscribe(function (result) {
            _this.miColeccionNivelMAct = result.miColeccionNivelMAct;
            if (!_this.miColeccionNivelMAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Medio
        this._actividadService.getActsMiColeccionNivelB(this.id_profesor).subscribe(function (result) {
            _this.miColeccionNivelBAct = result.miColeccionNivelBAct;
            if (!_this.miColeccionNivelBAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._actividadService.getActsVisibles(this.id_profesor).subscribe(function (result) {
            _this.visibles = result.visibles;
            if (!_this.visibles) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._actividadService.getActsVisiblesNivelA(this.id_profesor).subscribe(function (result) {
            _this.visiblesNivelAAct = result.visiblesNivelAAct;
            if (!_this.visiblesNivelAAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de actividades visibles nivel alto');
            }
        });
        this._actividadService.getActsVisiblesNivelM(this.id_profesor).subscribe(function (result) {
            _this.visiblesNivelMAct = result.visiblesNivelMAct;
            if (!_this.visiblesNivelMAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de actividades visibles nivel medio');
            }
        });
        this._actividadService.getActsVisiblesNivelB(this.id_profesor).subscribe(function (result) {
            _this.visiblesNivelBAct = result.visiblesNivelBAct;
            if (!_this.visiblesNivelBAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de actividades visibles nivel inicial');
            }
        });
        this._actividadService.getActsNoVisibles(this.id_profesor).subscribe(function (result) {
            _this.invisibles = result.invisibles;
            if (!_this.invisibles) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion actividades invisibles');
            }
        });
        this._actividadService.getActsNoVisiblesNivelA(this.id_profesor).subscribe(function (result) {
            _this.invisiblesNivelAAct = result.invisiblesNivelAAct;
            if (!_this.invisiblesNivelAAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion actividades invisibles nivel alto');
            }
        });
        this._actividadService.getActsNoVisiblesNivelM(this.id_profesor).subscribe(function (result) {
            _this.invisiblesNivelMAct = result.invisiblesNivelMAct;
            if (!_this.invisiblesNivelMAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion actividades invisibles nivel medio');
            }
        });
        this._actividadService.getActsNoVisiblesNivelB(this.id_profesor).subscribe(function (result) {
            _this.invisiblesNivelBAct = result.invisiblesNivelBAct;
            if (!_this.invisiblesNivelBAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion actividades invisibles nivel inicial');
            }
        });
    }; //fin ngOnInit
    PanelProfesorComponent.prototype.ngAfterViewInit = function () {
        //$(".dates").datepicker({ dateFormat: 'yy-mm-dd'});
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
        /*$('#tree1 li,#tree1 span, #tree1 i').on('mouseover', function(){
            $(this).children('.ojo').animate({
                opacity: "1",
                top:"2"
            }, 100, "linear");
        });

        $('#tree1 li').on('mouseout', function(){
            $(this).children('.ojo').animate({
                opacity: "0",
            }, 100, "linear");
        });*/
    }; //fin ngAfterViewInit
    PanelProfesorComponent.prototype.seleccionaDatos = function (datos, tipo, page) {
        this.primeraVisita = false;
        this.datosSeleccionados = datos;
        this.tipoSeleccionado = tipo;
        this.mostrarListaActs = false;
        this.mostrarListaEjers = false;
        switch (datos) {
            //Ejercicios
            case 'ejercicios':
                this.ejersAMostrar = this.ejercicios;
                this.datosAMostrar = "Todos los ejercicios";
                break;
            case 'mios':
                this.ejersAMostrar = this.miColeccion;
                this.datosAMostrar = "Mi Coleccion";
                break;
            case 'mios inicial':
                this.ejersAMostrar = this.miColeccionNivelB;
                this.datosAMostrar = "Mi Coleccion nivel inicial";
                break;
            case 'mios medio':
                this.ejersAMostrar = this.miColeccionNivelM;
                this.datosAMostrar = "Mi Coleccion nivel medio";
                break;
            case 'mios avanzado':
                this.ejersAMostrar = this.miColeccionNivelA;
                this.datosAMostrar = "Mi Coleccion nivel avanzado";
                break;
            case 'mios T1':
                this.ejersAMostrar = this.miColeccionTipo1;
                this.datosAMostrar = "Mi Coleccion ejercicios tipo 1";
                break;
            case 'mios T2':
                this.ejersAMostrar = this.miColeccionTipo2;
                this.datosAMostrar = "Mi Coleccion ejerciciostipo 2";
                break;
            case 'mios T3':
                this.ejersAMostrar = this.miColeccionTipo3;
                this.datosAMostrar = "Mi Coleccion ejercicios tipo 3";
                break;
            case 'mios T4':
                this.ejersAMostrar = this.miColeccionTipo4;
                this.datosAMostrar = "Mi Coleccion ejercicios tipo 4";
                break;
            case 'otros':
                this.ejersAMostrar = this.otrasColecciones;
                this.datosAMostrar = "Coleccion";
                break;
            case 'otros inicial':
                this.ejersAMostrar = this.otrasColeccionesNivelB;
                this.datosAMostrar = "Coleccion nivel inicial";
                break;
            case 'otros medio':
                this.ejersAMostrar = this.otrasColeccionesNivelM;
                this.datosAMostrar = "Coleccion nivel medio";
                break;
            case 'otros avanzado':
                this.ejersAMostrar = this.otrasColeccionesNivelA;
                this.datosAMostrar = "Coleccion nivel avanzado";
                break;
            case 'otros T1':
                this.ejersAMostrar = this.otrasColeccionesTipo1;
                this.datosAMostrar = "Coleccion ejercicios tipo 1";
                break;
            case 'otros T2':
                this.ejersAMostrar = this.otrasColeccionesTipo2;
                this.datosAMostrar = "Coleccion ejercicios tipo 2";
                break;
            case 'otros T3':
                this.ejersAMostrar = this.otrasColeccionesTipo3;
                this.datosAMostrar = "Coleccion ejercicios tipo 3";
                break;
            case 'otros T4':
                this.ejersAMostrar = this.otrasColeccionesTipo4;
                this.datosAMostrar = "Coleccion ejercicios tipo 4";
                break;
            //Actividades
            case 'mias':
                this.actsAMostrar = this.miColeccionAct;
                this.datosAMostrar = "Mi Coleccion actividades";
                break;
            case 'mias bajas':
                this.actsAMostrar = this.miColeccionNivelBAct;
                this.datosAMostrar = "Mi Coleccion actividades nivel inicial";
                break;
            case 'mias medias':
                this.actsAMostrar = this.miColeccionNivelMAct;
                this.datosAMostrar = "Mi Coleccion actividades nivel medio";
                break;
            case 'mias avanzadas':
                this.actsAMostrar = this.miColeccionNivelAAct;
                this.datosAMostrar = "Mi Coleccion actividades nivel avanzado";
                break;
            case 'visibles':
                this.actsAMostrar = this.visibles;
                this.datosAMostrar = "Visibles actividades";
                break;
            case 'visibles bajas':
                this.actsAMostrar = this.visiblesNivelBAct;
                this.datosAMostrar = "Visibles actividades nivel inicial";
                break;
            case 'visibles medias':
                this.actsAMostrar = this.visiblesNivelMAct;
                this.datosAMostrar = "Visibles actividades nivel medio";
                break;
            case 'visibles avanzadas':
                this.actsAMostrar = this.visiblesNivelAAct;
                this.datosAMostrar = "Visibles actividades nivel avanzado";
                break;
            case 'invisibles':
                this.actsAMostrar = this.invisibles;
                this.datosAMostrar = "No visibles actividades";
                break;
            case 'invisibles bajas':
                this.actsAMostrar = this.invisiblesNivelBAct;
                this.datosAMostrar = "No visibles actividades nivel inicial";
                break;
            case 'invisibles medias':
                this.actsAMostrar = this.invisiblesNivelMAct;
                this.datosAMostrar = "No visibles actividades nivel medio";
                break;
            case 'invisibles avanzadas':
                this.actsAMostrar = this.invisiblesNivelAAct;
                this.datosAMostrar = "No visibles actividades nivel avanzado";
                break;
        }
        if (tipo == 'ejercicios') {
            this.mostrarListaActs = false;
            this.mostrarListaEjers = true;
            if (page != 'undefined')
                this.setPageEjers(page);
            else
                this.setPageEjers(1);
        }
        else if (tipo == 'actividades') {
            this.mostrarListaEjers = false;
            this.mostrarListaActs = true;
            if (page != 'undefined')
                this.setPageActs(page);
            else
                this.setPageActs(1);
        }
    };
    PanelProfesorComponent.prototype.setPageEjers = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._ejercicioService.getPager(this.ejersAMostrar.length, page);
        // get current page of items
        this.pagedItemsEjers = this.ejersAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    PanelProfesorComponent.prototype.setPageActs = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._actividadService.getPager(this.actsAMostrar.length, page);
        // get current page of items
        this.pagedItemsActs = this.actsAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    PanelProfesorComponent.prototype.addActividad = function (event, id) {
        var _this = this;
        var indiceEj = _.findIndex(this.ejersAMostrar, { _id: id });
        if (!this.ejersAMostrar[indiceEj].marcado) {
            this.actividad[this.actividad.length] = this.ejersAMostrar[indiceEj];
            this.ejersAMostrar[indiceEj].marcado = true;
        }
        else {
            var indiceAct_1 = _.findIndex(this.actividad, { _id: id });
            $('.listado-actividad li:eq(' + indiceAct_1 + ')').removeClass("fadeInLeft").addClass("fadeOut");
            this.sleep(500).then(function () {
                _this.actividad.splice(indiceAct_1, 1);
                _this.ejersAMostrar[indiceEj].marcado = false;
            });
        }
        /*if(event.target.checked){
            this.actividad[this.actividad.length]=this.ejersAMostrar[indiceEj];
            this.ejersAMostrar[indiceEj].marcado=true;
        }
        else{
            let indiceAct= _.findIndex(this.actividad, {_id: id});
            $('.listado-actividad li:eq('+indiceAct+')').removeClass("fadeInLeft").addClass("fadeOut");
            this.sleep(500).then(()=>{
                this.actividad.splice(indiceAct, 1);
                this.ejersAMostrar[indiceEj].marcado=false;
            });
        }*/
    };
    PanelProfesorComponent.prototype.descartarEjer = function (event, id, i) {
        var _this = this;
        $(event.target).parent().removeClass("aparecer").addClass("fadeOut");
        $(event.target).parent().next().addClass("subir");
        this.sleep(300).then(function () {
            //let indiceAct= _.findIndex(this.actividad, {_id: id});
            _this.actividad.splice(i, 1);
            var indiceEj = _.findIndex(_this.ejersAMostrar, { _id: id });
            if (indiceEj >= 0)
                _this.ejersAMostrar[indiceEj].marcado = false;
            $(event.target).parent().next().removeClass("subir").addClass("aparecer");
        });
    };
    PanelProfesorComponent.prototype.sleep = function (ms) {
        if (ms === void 0) { ms = 0; }
        return new Promise(function (r) { return setTimeout(r, ms); });
    };
    PanelProfesorComponent.prototype.vaciarLista = function () {
        var _this = this;
        for (var _i = 0, _a = this.actividad; _i < _a.length; _i++) {
            var item = _a[_i];
            item.marcado = false;
        }
        $('.listado-actividad li').removeClass("fadeInLeft").addClass("fadeOut");
        $('.listado-actividad li').removeClass("aparecer").addClass("fadeOut");
        this.sleep(500).then(function () {
            _this.actividad = [];
        });
    };
    PanelProfesorComponent.prototype.crearActividad = function () {
        var _this = this;
        if (this.actividad.length > 0) {
            var ids = void 0;
            ids = new Array();
            for (var _i = 0, _a = this.actividad; _i < _a.length; _i++) {
                var ej = _a[_i];
                ids.push(ej._id);
            }
            this.nuevaActividad = new actividad_1.Actividad();
            this.nuevaActividad.id_profesor = this.id_profesor;
            this.nuevaActividad.profesor = this.user.nombre + " " + this.user.apellidos;
            this.nuevaActividad.fecha_creacion = new Date();
            this.nuevaActividad.ejercicios = ids;
            this.nuevaActividad.visible = false;
            this.nuevaActividad.propuesta = false;
            this.modalActividad = true;
            setTimeout(function () { return _this.visibleAnimate = true; });
        }
        else {
            this.message = "Debe seleccionar al menos un ejercicio";
            this.modalMessage = true;
            setTimeout(function () { return _this.visibleAnimate = true; }, 300);
        }
    };
    PanelProfesorComponent.prototype.cancelarActividad = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalActividad = false; }, 300);
        this.nuevaActividad = null;
    };
    PanelProfesorComponent.prototype.guardarActividad = function () {
        var _this = this;
        this._actividadService.addActividad(this.nuevaActividad).subscribe(function (result) {
            if (!result.respuesta) {
                _this.message = "Error en el servidor creando la actividad";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
            }
            else {
                _this.message = "Se ha creado la actividad";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                _this.ngOnInit();
                _this.vaciarLista();
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error al guardar actividad');
            }
        });
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalActividad = false; }, 300);
        this.ngOnInit();
    };
    PanelProfesorComponent.prototype.showEjercicio = function (ejercicio) {
        var _this = this;
        this.modalEjercicio = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
        this.ejerAbrir = ejercicio;
    };
    PanelProfesorComponent.prototype.showActividad = function (actividad) {
        var _this = this;
        this.modalVerActividad = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
        this.actAbrir = actividad;
    };
    PanelProfesorComponent.prototype.hideEjercicio = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalEjercicio = false; }, 300);
    };
    PanelProfesorComponent.prototype.hideActividad = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalVerActividad = false; }, 300);
    };
    PanelProfesorComponent.prototype.abrirBorrarEjercicio = function (ejercicio) {
        var _this = this;
        this.ejerBorrar = ejercicio;
        this.modalBorrarEjercicio = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelProfesorComponent.prototype.borrarEjercicio = function () {
        var _this = this;
        this._ejercicioService.borrarEjercicio(this.ejerBorrar._id).subscribe(function (result) {
            var id = _this.ejerBorrar._id;
            if (result.respuesta == 'ok') {
                for (var i = 0; i < _this.pagedItemsEjers.length; i++) {
                    if (_this.pagedItemsEjers[i]._id == _this.ejerBorrar._id) {
                        _this.pagedItemsEjers.splice(i, 1);
                    }
                }
                for (var i = 0; i < _this.ejersAMostrar.length; i++) {
                    if (_this.ejersAMostrar[i]._id == _this.ejerBorrar._id) {
                        _this.ejersAMostrar.splice(i, 1);
                    }
                }
                _this.cerrarBorrarEjercicio();
                _this.ngOnInit();
                _this._solucionService.borrarEjercicio(id).subscribe(function (result) {
                    if (result.respuesta == 'ok') {
                        _this.ngOnInit();
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert('Error en la peticion de borrado del ejercicio en soluciones en el servidor');
                    }
                });
                _this._actividadService.borrarEjercicio(id).subscribe(function (result) {
                    if (result.respuesta == 'ok') {
                        _this.ngOnInit();
                        _this.seleccionaDatos(_this.datosSeleccionados, _this.tipoSeleccionado, _this.pager.currentPage);
                        _this.message = "El ejercicio ha sido eliminado";
                        _this.modalMessage = true;
                        setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage != null) {
                        console.log(_this.errorMessage);
                        alert('Error en la peticion de borrado en el servidor');
                    }
                });
            }
            else {
                _this.cerrarBorrarEjercicio();
                _this.message = result.message;
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de borrado en el servidor');
            }
        });
    };
    PanelProfesorComponent.prototype.cerrarBorrarEjercicio = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalBorrarEjercicio = false; }, 300);
        this.ejerBorrar = null;
    };
    PanelProfesorComponent.prototype.abrirModEjercicio = function (ejercicio) {
        var _this = this;
        this.ejerUpdate = ejercicio;
        this.modalModEjer = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelProfesorComponent.prototype.updateEjercicio = function () {
        var _this = this;
        this._ejercicioService.updateEjercicio(this.ejerUpdate).subscribe(function (result) {
            if (result.respuesta == 'ok') {
                _this.cerrarUpdateEjercicio();
                _this.seleccionaDatos(_this.datosSeleccionados, _this.tipoSeleccionado, _this.pager.currentPage);
                _this.message = "El ejercicio ha sido actualizado";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de borrado en el servidor');
            }
        });
    };
    PanelProfesorComponent.prototype.cerrarUpdateEjercicio = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalModEjer = false; }, 300);
        this.ejerUpdate = {};
    };
    PanelProfesorComponent.prototype.cerrarModalMessage = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalMessage = false; }, 300);
        this.message = "";
    };
    PanelProfesorComponent.prototype.aplicaValoresLogicos = function () {
        var frase = this.ejerUpdate.fraseATraducir;
        this.valoresLogico = frase.split(" ");
    };
    PanelProfesorComponent.prototype.addFLogico = function () {
        if (this.tipoLogico != "" && this.valorLogico != "") {
            if (this.ejerUpdate.solucionFLogico != "")
                this.ejerUpdate.solucionFLogico += ",";
            this.ejerUpdate.solucionFLogico += this.tipoLogico + "(" + this.valorLogico + ")";
            this.tipoLogico = "";
            this.valorLogico = "";
        }
    };
    PanelProfesorComponent.prototype.addSeparator = function (event) {
        var key = event.key;
        if (event.keyCode == 32) {
            this.ejerUpdate.solucionFPatron += "+ ";
        }
    };
    PanelProfesorComponent.prototype.cargarModificacion = function (actividad) {
        this.modificando = true;
        this.updateActividad = actividad;
        this.updateActividadRestore = Object.assign({}, actividad);
        this.updateActividad.fecha_prop_fin = new Date(actividad.fecha_prop_fin);
        for (var _i = 0, _a = this.pagedItemsActs; _i < _a.length; _i++) {
            var act = _a[_i];
            act.marcado = false;
        }
        actividad.marcado = true;
        for (var _b = 0, _c = actividad.ejercicios; _b < _c.length; _b++) {
            var ej = _c[_b];
            this.actividad.push(ej);
        }
    };
    PanelProfesorComponent.prototype.cancelarModificacionActividad = function () {
        var _this = this;
        for (var _i = 0, _a = this.pagedItemsActs; _i < _a.length; _i++) {
            var act = _a[_i];
            act.marcado = false;
            if (act._id == this.updateActividadRestore._id) {
                act = this.updateActividadRestore;
            }
        }
        this.vaciarLista();
        $('.listado-actividad li').removeClass("fadeInLeft").addClass("fadeOut");
        this.sleep(500).then(function () {
            _this.actividad = [];
        });
        //this.updateActividad=new Actividad();
        this.modificando = false;
        this.ngOnInit();
        this.sleep(400).then(function () {
            _this.seleccionaDatos(_this.datosSeleccionados, _this.tipoSeleccionado, _this.pager.currentPage);
        });
    };
    PanelProfesorComponent.prototype.actualizarActividad = function () {
        var _this = this;
        if (this.actividad.length > 0) {
            /*let ids : String[];
            ids= new Array<String>();

            for(let ej of this.actividad)
                ids.push(ej._id);*/
            this.updateActividad.ejercicios = this.actividad;
            this.modalUpdateActividad = true;
            setTimeout(function () { return _this.visibleAnimate = true; });
        }
    };
    PanelProfesorComponent.prototype.autorizarUpdateActividad = function () {
        var _this = this;
        //Implementar metodo
        this.cerrarUpdateActividad();
        this._actividadService.updateActividad(this.updateActividad).subscribe(function (result) {
            if (result.respuesta == 'ok') {
                _this.cancelarModificacionActividad();
                for (var _i = 0, _a = _this.actsAMostrar; _i < _a.length; _i++) {
                    var a = _a[_i];
                    if (a._id == result.actividadUpdated._id)
                        a = result.actividadUpdated;
                }
                _this.updateActividad = result.actividadUpdated;
                _this.message = "La actividad ha sido actualizada";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                _this.seleccionaDatos(_this.datosSeleccionados, _this.tipoSeleccionado, _this.pager.currentPage);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de borrado en el servidor');
            }
        });
    };
    PanelProfesorComponent.prototype.cerrarUpdateActividad = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalUpdateActividad = false; }, 300);
    };
    PanelProfesorComponent.prototype.dropEjercicio = function (event, ejercicio, i) {
        var posDragado = event.dragData;
        //alert("Cambio el de la posicion " +posDragado + " a la posicion " + i);
        var aux = this.actividad[posDragado];
        this.actividad[posDragado] = ejercicio;
        this.actividad[i] = aux;
    };
    PanelProfesorComponent.prototype.abrirBorrarActividad = function (actividad) {
        var _this = this;
        this.deleteAct = actividad;
        this.modalDeleteActividad = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelProfesorComponent.prototype.cerrarDeleteActividad = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalDeleteActividad = false; }, 300);
    };
    PanelProfesorComponent.prototype.deleteActividad = function () {
        var _this = this;
        this._actividadService.deleteActividad(this.deleteAct._id).subscribe(function (result) {
            if (result.respuesta == 'ok') {
                var id = _this.deleteAct._id;
                for (var i = 0; i < _this.pagedItemsActs.length; i++) {
                    if (_this.pagedItemsActs[i]._id == _this.deleteAct._id) {
                        _this.pagedItemsActs.splice(i, 1);
                    }
                }
                for (var i = 0; i < _this.actsAMostrar.length; i++) {
                    if (_this.actsAMostrar[i]._id == _this.deleteAct._id) {
                        _this.actsAMostrar.splice(i, 1);
                    }
                }
                _this.cerrarDeleteActividad();
                _this.ngOnInit();
                _this.deleteAct = new actividad_1.Actividad();
                _this.message = "La actividad ha sido eliminada";
                _this.modalMessage = true;
                setTimeout(function () { return _this.visibleAnimate = true; }, 300);
                _this.seleccionaDatos(_this.datosSeleccionados, _this.tipoSeleccionado, _this.pager.currentPage);
                //se borran las soluciones de dicha actividad si las hubiera
                _this._solucionService.deleteSolucionByActividad(id).subscribe();
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de borrado en el servidor');
            }
        });
    };
    PanelProfesorComponent.prototype.verBusquedaSoluciones = function () {
        this.buscarSoluciones = true;
    };
    PanelProfesorComponent.prototype.saliendoDeBuscarSoluciones = function () {
        this.buscarSoluciones = false;
    };
    PanelProfesorComponent.prototype.abrirBuscarEjers = function () {
        var _this = this;
        this.modalBuscarEjer = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelProfesorComponent.prototype.cerrarBuscarEjercicios = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalBuscarEjer = false; }, 300);
    };
    PanelProfesorComponent.prototype.buscarEjercicios = function () {
        var _this = this;
        this._ejercicioService.getByCriteria(this.criteriaEjercicios).subscribe(function (result) {
            _this.ejersAMostrar = result.ejercicios;
            _this.mostrarListaActs = false;
            _this.mostrarListaEjers = true;
            if (_this.ejersAMostrar.length > 0) {
                _this.datosAMostrar = "Resultado de la busqueda";
                _this.setPageEjers(1);
                _this.modalBuscarEjer = false;
            }
            else {
                _this.datosAMostrar = "No se han encontrado resultados...";
                _this.ejersAMostrar = [];
                _this.pagedItemsEjers = [];
                _this.setPageEjers(-1);
                //this.msgBusqueda="No hay soluciones para este criterio de busqueda";
                _this.modalBuscarEjer = false;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
    };
    PanelProfesorComponent.prototype.limpiarFiltroEjers = function () {
        this.criteriaEjercicios = new criteriaEjercicios_1.CriteriaEjercicios();
    };
    PanelProfesorComponent.prototype.abrirBuscarActs = function () {
        var _this = this;
        this.modalBuscarActs = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    PanelProfesorComponent.prototype.cerrarBuscarActividades = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalBuscarActs = false; }, 300);
    };
    PanelProfesorComponent.prototype.buscarActividades = function () {
        var _this = this;
        this._actividadService.getByCriteria(this.criteriaActividades).subscribe(function (result) {
            _this.actsAMostrar = result.actividades;
            _this.mostrarListaEjers = false;
            _this.mostrarListaActs = true;
            if (_this.actsAMostrar.length > 0) {
                _this.datosAMostrar = "Resultado de la busqueda";
                _this.setPageActs(1);
                _this.modalBuscarActs = false;
            }
            else {
                _this.datosAMostrar = "No se han encontrado resultados...";
                _this.actsAMostrar = [];
                _this.pagedItemsActs = [];
                _this.setPageActs(-1);
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
    PanelProfesorComponent.prototype.limpiarFiltroActs = function () {
        this.criteriaActividades = new criteriaActividades_1.CriteriaActividades();
    };
    PanelProfesorComponent.prototype.ordenaEjerTitulo = function () {
        this.pagedItemsEjers = _.sortBy(this.pagedItemsEjers, "titulo");
    };
    PanelProfesorComponent.prototype.ordenaEjerFecha = function () {
        this.pagedItemsEjers = _.sortBy(this.pagedItemsEjers, "fechaCreacion");
    };
    PanelProfesorComponent.prototype.ordenaEjerNivel = function () {
        this.pagedItemsEjers = _.sortBy(this.pagedItemsEjers, "nivel");
    };
    PanelProfesorComponent.prototype.ordenaEjerReverse = function () {
        this.pagedItemsEjers.reverse();
    };
    PanelProfesorComponent.prototype.ordenaActsTitulo = function () {
        this.pagedItemsActs = _.sortBy(this.pagedItemsActs, "titulo");
    };
    PanelProfesorComponent.prototype.ordenaActsFecha = function () {
        this.pagedItemsActs = _.sortBy(this.pagedItemsActs, "fechaCreacion");
    };
    PanelProfesorComponent.prototype.ordenaActsNivel = function () {
        this.pagedItemsActs = _.sortBy(this.pagedItemsActs, "nivel");
    };
    PanelProfesorComponent.prototype.ordenaActsReverse = function () {
        this.pagedItemsActs.reverse();
    };
    return PanelProfesorComponent;
}());
PanelProfesorComponent = __decorate([
    core_1.Component({
        selector: 'panel-profesor',
        templateUrl: 'app/views/panel-profesor.html',
        providers: [ejercicio_service_1.EjercicioService, actividad_service_1.ActividadService, solucion_service_1.SolucionService],
        styleUrls: ['../../assets/css/menu-profesor.css'],
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService,
        actividad_service_1.ActividadService,
        solucion_service_1.SolucionService])
], PanelProfesorComponent);
exports.PanelProfesorComponent = PanelProfesorComponent;
//# sourceMappingURL=panel-profesor.component.js.map