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
//los decoradores no tienen punto y coma
var PanelProfesorComponent = (function () {
    function PanelProfesorComponent(_ejercicioService) {
        this._ejercicioService = _ejercicioService;
        this.title = "Panel de profesores";
        this.user = "Antonio Sarasa";
        this.id_profesor = "000001";
        this.mostrarLista = true;
        this.datosAMostrar = "";
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
                    branch.children().children().slideToggle(200);
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
    PanelProfesorComponent.prototype.seleccionaDatos = function (datos) {
        switch (datos) {
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
        }
        this.mostrarLista = true;
    };
    return PanelProfesorComponent;
}());
PanelProfesorComponent = __decorate([
    core_1.Component({
        selector: 'panel-profesor',
        templateUrl: 'app/views/panel-profesor.html',
        providers: [ejercicio_service_1.EjercicioService],
        styleUrls: ['../../assets/css/menu-profesor.css'],
    }),
    __metadata("design:paramtypes", [ejercicio_service_1.EjercicioService])
], PanelProfesorComponent);
exports.PanelProfesorComponent = PanelProfesorComponent;
//# sourceMappingURL=panel-profesor.component.js.map