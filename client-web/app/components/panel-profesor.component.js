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
var actividad_1 = require("../models/actividad");
//Para usar undescore y jquery
var _ = require("underscore");
//los decoradores no tienen punto y coma
var PanelProfesorComponent = (function () {
    function PanelProfesorComponent(_ejercicioService, _actividadService) {
        this._ejercicioService = _ejercicioService;
        this._actividadService = _actividadService;
        // pager object
        this.pager = {};
        this.title = "Panel de profesores";
        //this.user="Antonio Sarasa";
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        ///this.id_profesor= "00001";
        this.id_profesor = this.user._id;
        //this.user="Antonio Sarasa";
        this.id_profesor = "000001";
        this.mostrarLista = false;
        this.datosAMostrar = "";
        this.actividad = [];
        this.miColeccionAct = new Array();
        this.miColeccionNivelAAct = new Array();
        this.miColeccionNivelMAct = new Array();
        this.miColeccionNivelBAct = new Array();
        this.otrasColeccionesAct = new Array();
        this.otrasColeccionesNivelAAct = new Array();
        this.otrasColeccionesNivelMAct = new Array();
        this.otrasColeccionesNivelBAct = new Array();
        this.visibles = new Array();
        this.visiblesNivelAAct = new Array();
        this.visiblesNivelMAct = new Array();
        this.visiblesNivelBAct = new Array();
        this.invisibles = new Array();
        this.invisiblesNivelAAct = new Array();
        this.invisiblesNivelMAct = new Array();
        this.invisiblesNivelBAct = new Array();
        //this.actividad=[];
        this.modalEjercicio = false;
        this.modalActividad = false;
        this.visibleAnimate = false;
    }
    PanelProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Obtencion de datos
        this._ejercicioService.getEjercicios().subscribe(function (result) {
            console.log(result);
            _this.ejercicios = result.ejercicios;
            if (!_this.ejercicios) {
                alert('Error en el servidor');
            }
            else {
                _this.loading = false;
                _this.nEjercicios = _this.ejercicios.length;
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
        }); //fin getEjercicios de mi coleccion nivel bajo
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
        }); //fin getEjercicios de mi coleccion nivel bajo
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
        this._actividadService.getActividades().subscribe(function (result) {
            console.log(result);
            _this.actividades = result.actividades;
            if (!_this.actividades) {
                alert('Error en el servidor');
            }
            //	else{
            //		this.loading=false;
            //		this.nActividades= this.actividades.length;
            /*this.ejersAMostrar= this.ejercicios;
            this.datosAMostrar="Todos los ejercicios";
            this.mostrarLista=true;*/
            //	}
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion');
            }
        }); //fin getEjercicios (Todos)
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
            if (!_this.miColeccionNivelA) {
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
        }); //fin getEjercicios de mi coleccion nivel bajo
        this._actividadService.getActsVisibles(this.id_profesor).subscribe(function (result) {
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
        }); //fin getEjercicios de mi coleccion nivel bajo
        //Otras colecciones
        this._actividadService.getActsOtrasColecciones(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesAct = result.otrasColeccionesAct;
            if (!_this.otrasColeccionesAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        });
        this._actividadService.getActsOtrasColeccionesNivelA(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesNivelAAct = result.otrasColeccionesNivelAAct;
            if (!_this.otrasColeccionesNivelAAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Avanzado
        this._actividadService.getActsOtrasColeccionesNivelM(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesNivelMAct = result.otrasColeccionesNivelMAct;
            if (!_this.otrasColeccionesNivelMAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel Medio
        this._actividadService.getActsOtrasColeccionesNivelB(this.id_profesor).subscribe(function (result) {
            _this.otrasColeccionesNivelBAct = result.otrasColeccionesNivelBAct;
            if (!_this.otrasColeccionesNivelBAct) {
                alert('Error en el servidor');
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert('Error en la peticion de mi coleccion');
            }
        }); //fin getEjercicios de mi coleccion nivel bajo
    }; //fin ngOnInit
    PanelProfesorComponent.prototype.ngAfterViewInit = function () {
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
    PanelProfesorComponent.prototype.seleccionaDatos = function (datos) {
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
            case 'mios bajo':
                this.ejersAMostrar = this.miColeccionNivelB;
                this.datosAMostrar = "Mi Coleccion nivel bajo";
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
            case 'otros bajo':
                this.ejersAMostrar = this.otrasColeccionesNivelB;
                this.datosAMostrar = "Coleccion nivel bajo";
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
            case 'actividades':
                this.actsAMostrar = this.actividades;
                this.datosAMostrar = "Todos las actividades";
                break;
            case 'mias':
                this.actsAMostrar = this.miColeccionAct;
                this.datosAMostrar = "Mi Coleccion actividades";
                break;
            case 'mias bajas':
                this.actsAMostrar = this.miColeccionNivelBAct;
                this.datosAMostrar = "Mi Coleccion actividades nivel bajo";
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
                this.datosAMostrar = "Visibles actividades nivel bajo";
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
                this.datosAMostrar = "No visibles actividades nivel bajo";
                break;
            case 'invisibles medias':
                this.actsAMostrar = this.invisiblesNivelMAct;
                this.datosAMostrar = "No visibles actividades nivel medio";
                break;
            case 'invisibles avanzadas':
                this.actsAMostrar = this.invisiblesNivelAAct;
                this.datosAMostrar = "No visibles actividades nivel avanzado";
                break;
            case 'otras':
                this.actsAMostrar = this.otrasColeccionesAct;
                this.datosAMostrar = "Coleccion actividades";
                break;
            case 'otras bajas':
                this.actsAMostrar = this.otrasColeccionesNivelBAct;
                this.datosAMostrar = "Coleccion actividades nivel bajo";
                break;
            case 'otras medias':
                this.actsAMostrar = this.otrasColeccionesNivelMAct;
                this.datosAMostrar = "Coleccion actividades nivel medio";
                break;
            case 'otras avanzadas':
                this.actsAMostrar = this.otrasColeccionesNivelAAct;
                this.datosAMostrar = "Coleccion actividades nivel avanzado";
                break;
        }
        this.mostrarLista = true;
        this.setPage(1);
    };
    PanelProfesorComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._ejercicioService.getPager(this.ejersAMostrar.length, page);
        // get current page of items
        this.pagedItems = this.ejersAMostrar.slice(this.pager.startIndex, this.pager.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    PanelProfesorComponent.prototype.addActividad = function (event, id) {
        var _this = this;
        var indiceEj = _.findIndex(this.ejersAMostrar, { _id: id });
        if (event.target.checked) {
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
    };
    PanelProfesorComponent.prototype.descartarEjer = function (event, id) {
        var _this = this;
        $(event.target).parent().removeClass("aparecer").addClass("fadeOut");
        $(event.target).parent().next().addClass("subir");
        this.sleep(300).then(function () {
            var indiceAct = _.findIndex(_this.actividad, { _id: id });
            _this.actividad.splice(indiceAct, 1);
            var indiceEj = _.findIndex(_this.ejersAMostrar, { _id: id });
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
            this.nuevaActividad = new actividad_1.Actividad("", this.id_profesor, this.user.nombre + " " + this.user.apellidos, new Date(), "", ids, false, false, null);
        }
        this.modalActividad = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
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
                alert('Error en el servidor');
            }
            else {
                alert('Se ha guardado correctamente');
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
    };
    PanelProfesorComponent.prototype.showEjercicio = function (ejercicio) {
        var _this = this;
        this.modalEjercicio = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
        this.ejerAbrir = ejercicio;
    };
    PanelProfesorComponent.prototype.hideEjercicio = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalEjercicio = false; }, 300);
    };
    return PanelProfesorComponent;
}());
PanelProfesorComponent = __decorate([
    core_1.Component({
        selector: 'panel-profesor',
        templateUrl: 'app/views/panel-profesor.html',
        providers: [ejercicio_service_1.EjercicioService, actividad_service_1.ActividadService],
        styleUrls: ['../../assets/css/menu-profesor.css'],
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService,
        actividad_service_1.ActividadService])
], PanelProfesorComponent);
exports.PanelProfesorComponent = PanelProfesorComponent;
//# sourceMappingURL=panel-profesor.component.js.map