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
var profesor_service_1 = require("../services/profesor.service");
//los decoradores no tienen punto y coma
var PanelAlumnoComponent = (function () {
    function PanelAlumnoComponent(_actividadService, _profesorService) {
        this._actividadService = _actividadService;
        this._profesorService = _profesorService;
        this.title = "Panel de alumno";
        this.actividades = [];
        this.profesores = [];
        this.disponibles = new Array();
        this.disponiblesNBajo = new Array();
        this.disponiblesNMedio = new Array();
        this.disponiblesNAlto = new Array();
    }
    PanelAlumnoComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Obtencion de datos
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
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        this._actividadService.getDisponiblesNB().subscribe(function (result) {
            console.log(result);
            _this.disponiblesNBajo = result.actividades;
            if (!_this.disponiblesNBajo) {
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
    return PanelAlumnoComponent;
}());
PanelAlumnoComponent = __decorate([
    core_1.Component({
        selector: 'panel-alumno',
        templateUrl: 'app/views/panel-alumno.html',
        providers: [actividad_service_1.ActividadService, profesor_service_1.ProfesorService],
        styleUrls: ['../../assets/css/menu-profesor.css'],
    }),
    __metadata("design:paramtypes", [actividad_service_1.ActividadService,
        profesor_service_1.ProfesorService])
], PanelAlumnoComponent);
exports.PanelAlumnoComponent = PanelAlumnoComponent;
//# sourceMappingURL=panel-alumno.component.js.map