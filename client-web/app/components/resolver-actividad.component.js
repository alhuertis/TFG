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
var router_1 = require("@angular/router");
var actividad_service_1 = require("../services/actividad.service");
var solucion_service_1 = require("../services/solucion.service");
var ejercicio_1 = require("../models/ejercicio");
var ficha_1 = require("../models/ficha");
var solucion_1 = require("../models/solucion");
var _ = require("underscore");
var ResolverActividadComponent = (function () {
    function ResolverActividadComponent(_actividadService, _solucionService, route) {
        this._actividadService = _actividadService;
        this._solucionService = _solucionService;
        this.route = route;
        this.id_actividad = this.route.snapshot.params['id_actividad'];
        //alert(this.id_actividad);
        this.actividad = [];
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        /*this.actividad=
        [
            {
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 1",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Traducir la siguiente frase al español",
                "fraseATraducir": "Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
                "solucionPLatin": "",
                "marcado": false
            },
            {
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 2",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Traducir toda la frase",
                "fraseATraducir": "Magister sapientiam amat",
                "solucionFLogico": "Nominativo(magister), Acusativo(sapientiam),Verbo(amat)",
                "solucionFPatron": "maestro + ama + sabiduria",
                "solucionPEspanol": "El maestro ama la sabiduría",
                "solucionPLatin": "",
                "marcado": false
            },
            {
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 3",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Aprende latin con este ejercicio",
                "fraseATraducir": "Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
                "solucionPLatin": "",
                "marcado": false
            },
            {
                "_id": "",
                "id_profesor": "000001",
                "titulo": "Titulo 4",
                "nivel": "Medio",
                "tipo": 1,
                "autor": "Antonio Sarasa",
                "institucion_profesor": "Universidad complutense",
                "fechaCreacion": new Date(),
                "fechaModificacion": new Date(),
                "enunciado": "Traduce lo que puedas",
                "fraseATraducir": "Dei sacrificium accipiunt",
                "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                "solucionFPatron": "dioses + reciben + sacrificio",
                "solucionPEspanol": "Los dioses reciben el sacrificio",
                "solucionPLatin": "",
                "marcado": false
            }
        ];*/
        this.ejercicio = new ejercicio_1.Ejercicio("", "", "", "", null, "", "", null, null, "", "", "", "", "", "", false);
        this.ejerSel = 0;
        this.calificaciones = [];
        this.solucion = new solucion_1.Solucion();
        this.respuesta = "";
        this.msgCalificacion = "";
        this.progreso = 0;
        this.calificacionFinal = 0;
        this.monovalente = new ficha_1.Ficha(false, "0px", "0px");
        this.bivalente = new ficha_1.Ficha(false, "0px", "0px");
        this.trivalente = new ficha_1.Ficha(false, "0px", "0px");
        this.amarilla = new ficha_1.Ficha(false, "", "");
        this.azul = new ficha_1.Ficha(false, "", "");
        this.naranja = new ficha_1.Ficha(false, "", "");
        this.roja = new ficha_1.Ficha(false, "", "");
        this.verde = new ficha_1.Ficha(false, "", "");
        this.argumentos = 0;
        this.faseVerbo = false;
        this.verboMarcado = false;
        this.srcDraggedPentagono = "adios";
        this.resueltos = 0;
    }
    ResolverActividadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._actividadService.cargarActividad(this.id_actividad).subscribe(function (result) {
            console.log(result);
            _this.actividad = result.actividad.ejercicios;
            _this.infoActividad = result.actividad;
            if (!_this.actividad) {
                alert('Error en el servidor');
            }
            else {
                _this.fraseSplit = _this.actividad[_this.ejerSel].fraseATraducir.split(" ");
                _this.verbo = _this.extraerVerbo();
                _this.anterior = _this.ejerSel > 0;
                _this.siguiente = _this.ejerSel < _this.actividad.length;
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
        //this.ejercicios= this.actividad2.ejercicios;
        /*for(let i=0; i < this.actividad.length; i++){
            
        }*/
    }; //fin ngOnInit
    ResolverActividadComponent.prototype.extraerVerbo = function () {
        var args = this.actividad[this.ejerSel].solucionFLogico.split(",");
        this.argumentos = args.length - 1;
        var verbo;
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var s = args_1[_i];
            if (s.includes("Verbo")) {
                verbo = s.substring(s.indexOf("Verbo(") + "Verbo(".length, s.length - 1);
                break;
            }
        }
        return verbo;
    };
    ResolverActividadComponent.prototype.siguienteEjer = function () {
        this.ejerSel++;
        this.siguiente = this.ejerSel < this.actividad.length - 1;
        this.anterior = this.ejerSel > 0;
        this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta = "";
        this.verboMarcado = false;
        this.verbo = this.extraerVerbo();
        this.faseVerbo = false;
        this.monovalente.activa = false;
        this.bivalente.activa = false;
        this.trivalente.activa = false;
        this.amarilla.activa = false;
        this.azul.activa = false;
        this.naranja.activa = false;
        this.roja.activa = false;
        this.verde.activa = false;
        $('span.acertada').removeClass("acertada");
        $('span.marcada').removeClass("marcada");
        $('.izquierda, .superior, .derecha').removeAttr("src");
        $('.izquierda, .superior, .derecha').css("display", "none");
    };
    ResolverActividadComponent.prototype.anteriorEjer = function () {
        this.ejerSel--;
        this.anterior = this.ejerSel > 0;
        this.siguiente = this.ejerSel < this.actividad.length;
        this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta = "";
        this.verbo = this.extraerVerbo();
    };
    ResolverActividadComponent.prototype.calificar = function () {
        if (this.respuesta == this.actividad[this.ejerSel].solucionPEspanol) {
            this.solucion.msgCalificaciones[this.ejerSel] = "!!Enhorabuena¡¡ La respuesta es correcta";
            this.solucion.calificaciones[this.ejerSel] = 1;
        }
        else {
            var patron = void 0;
            var res = void 0;
            res = this.respuesta.split(" ");
            patron = this.actividad[this.ejerSel].solucionFPatron.split(" + ");
            res = _.intersection(res, patron);
            if (_.isEqual(patron, res)) {
                this.solucion.msgCalificaciones[this.ejerSel] = "La solución parece correcta porque las palabras están bien traducidas y se presentan en un orden correcto, pero debe comprobarla el profesor porque no coincide con la solución que ha propuesto";
                this.solucion.calificaciones[this.ejerSel] = 1;
            }
            else {
                if (res.length == patron.length) {
                    this.solucion.msgCalificaciones[this.ejerSel] = "La solución tiene las palabras bien traducidas pero no se presentan en el orden correcto propuesto por el profesor. Esta solución debe comprobarla el profesor";
                    this.solucion.calificaciones[this.ejerSel] = 1 / 2;
                }
                else if (res.length > patron.length / 2) {
                    this.solucion.msgCalificaciones[this.ejerSel] = "Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                    this.solucion.calificaciones[this.ejerSel] = 1 / 4;
                }
                else {
                    this.solucion.msgCalificaciones[this.ejerSel] = "Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                    this.solucion.calificaciones[this.ejerSel] = 0;
                }
            }
        }
        this.solucion.respuestas[this.ejerSel] = this.respuesta;
        this.resueltos++;
        this.progreso = (this.resueltos * 100) / this.actividad.length;
        if (this.progreso == 100) {
            for (var i = 0; i < this.solucion.calificaciones.length; i++) {
                this.calificacionFinal += this.solucion.calificaciones[i];
            }
            this.solucion.notaFinal = this.calificacionFinal;
        }
    };
    ResolverActividadComponent.prototype.clickMonovalente = function (event) {
        if (this.argumentos > 1) {
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }
        else {
            if (this.verboMarcado) {
                this.faseVerbo = true;
                this.monovalente.activa = true;
            }
            else {
                if (this.monovalente.activa)
                    this.monovalente.activa = false;
                else
                    this.monovalente.activa = true;
            }
        }
    };
    ResolverActividadComponent.prototype.clickBivalente = function (event) {
        if (this.argumentos != 2) {
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }
        else {
            if (this.verboMarcado) {
                this.faseVerbo = true;
                this.bivalente.activa = true;
                $('span.marcada').removeClass("marcada").addClass("acertada");
            }
            else {
                if (this.bivalente.activa)
                    this.bivalente.activa = false;
                else
                    this.bivalente.activa = true;
            }
        }
    };
    ResolverActividadComponent.prototype.clickTrivalente = function (event) {
        if (this.argumentos != 3) {
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }
        else {
            if (this.verboMarcado) {
                this.faseVerbo = true;
                this.trivalente.activa = true;
            }
            else {
                if (this.trivalente.activa)
                    this.trivalente.activa = false;
                else
                    this.trivalente.activa = true;
            }
        }
    };
    ResolverActividadComponent.prototype.clickAmarilla = function (event) {
        if (this.amarilla.activa)
            this.amarilla.activa = false;
        else {
            this.amarilla.activa = true;
            this.amarilla.top = "0px";
            this.amarilla.left = "0px";
        }
    };
    ResolverActividadComponent.prototype.clickAzul = function (event) {
        if (this.azul.activa)
            this.azul.activa = false;
        else {
            this.azul.activa = true;
            this.azul.top = "20px";
            this.azul.left = "30px";
        }
    };
    ResolverActividadComponent.prototype.clickNaranja = function (event) {
        if (this.naranja.activa)
            this.naranja.activa = false;
        else {
            this.naranja.activa = true;
            this.naranja.top = "20px";
            this.naranja.left = "30px";
        }
    };
    ResolverActividadComponent.prototype.clickRoja = function (event) {
        if (this.roja.activa)
            this.roja.activa = false;
        else {
            this.roja.activa = true;
            this.roja.top = "20px";
            this.roja.left = "30px";
        }
    };
    ResolverActividadComponent.prototype.clickVerde = function (event) {
        if (this.verde.activa)
            this.verde.activa = false;
        else {
            this.verde.activa = true;
            this.verde.top = "20px";
            this.verde.left = "30px";
        }
    };
    ResolverActividadComponent.prototype.sacarFichas = function (event) {
        if ($(event.target).next().css("display") == "none") {
            $(event.target).next().css("display", "block").removeClass("fadeOut").addClass("animated fadeInLeft");
        }
        else {
            $(event.target).next().removeClass("fadeInLeft").animate({
                "opacity": "0"
            }, 500);
            this.sleep(500).then(function () {
                $(event.target).next().css("display", "none");
            });
        }
    };
    ResolverActividadComponent.prototype.clickPalabra = function (event, palabra) {
        if (this.verboMarcado && !this.faseVerbo) {
            this.verboMarcado = false;
            $(event.target).removeClass("marcada");
        }
        else if (!this.faseVerbo) {
            if (palabra == this.verbo) {
                this.verboMarcado = true;
                alert("Es el verbo!");
                $(event.target).addClass("marcada");
            }
            else {
                alert("No es el verbo");
                $(event.target).removeClass("marcada");
            }
        }
    };
    ResolverActividadComponent.prototype.dropVerbo = function (event, palabra) {
        //alert(palabra + " " + event.dragData);
        if (this.faseVerbo)
            alert("Ya has encontrado el verbo anteriormente");
        else {
            if (palabra == this.verbo) {
                alert("Has acertado, es el verbo");
                this.faseVerbo = true;
                if (this.argumentos == 1 && event.dragData == "monovalente") {
                    this.monovalente.activa = true;
                }
                else if (this.argumentos == 2 && event.dragData == "bivalente") {
                    this.bivalente.activa = true;
                    $(event.nativeEvent.target).addClass("marcada");
                }
                else if (this.argumentos == 3 && event.dragData == "trivalente") {
                    this.bivalente.activa = true;
                }
                else {
                    alert("Pero no es la ficha adecuada");
                    this.faseVerbo = false;
                }
            }
            else {
                alert("No es el verbo");
                this.faseVerbo = false;
            }
        }
    };
    ResolverActividadComponent.prototype.dragPentagono = function (event) {
        //alert($(event.nativeEvent.target).attr("src"));
        this.srcDraggedPentagono = $(event.target).attr("src");
    };
    ResolverActividadComponent.prototype.dropPentagono = function (event, posicion) {
        if (event.dragData) {
            alert(event.dragData);
        }
        else {
            $(event.nativeEvent.target).children().css("display", "block");
            $(event.nativeEvent.target).children().attr("src", this.srcDraggedPentagono);
        }
    };
    ResolverActividadComponent.prototype.quitaPentagono = function (event) {
        $(event.target).children().removeAttr("src");
        $(event.target).children().css("display", "none");
    };
    ResolverActividadComponent.prototype.sleep = function (ms) {
        if (ms === void 0) { ms = 0; }
        return new Promise(function (r) { return setTimeout(r, ms); });
    };
    //guarda la solucion en cualquier momento
    ResolverActividadComponent.prototype.guardarSolucion = function () {
    };
    //cuando terminas, guarda y sale
    ResolverActividadComponent.prototype.guardarYSalir = function () {
        var _this = this;
        this.solucion.id_actividad = this.id_actividad;
        this.solucion.id_alumno = this.user._id;
        this.solucion.id_ejercicios = this.infoActividad.ejercicios;
        this.solucion.terminado = true;
        this._solucionService.saveSolucion(this.solucion).subscribe(function (result) {
            console.log(result);
            _this.solucion._id = result;
            if (_this.solucion._id == "") {
                alert('Error en el servidor guardando la solucion');
            }
            else {
                alert(_this.solucion._id);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert(_this.errorMessage);
            }
        });
    };
    return ResolverActividadComponent;
}());
ResolverActividadComponent = __decorate([
    core_1.Component({
        selector: 'resolver-actividad',
        templateUrl: 'app/views/resolver-actividad.html',
        providers: [actividad_service_1.ActividadService, solucion_service_1.SolucionService],
        styleUrls: ['../../assets/css/styles.css'],
    }),
    __metadata("design:paramtypes", [actividad_service_1.ActividadService,
        solucion_service_1.SolucionService,
        router_1.ActivatedRoute])
], ResolverActividadComponent);
exports.ResolverActividadComponent = ResolverActividadComponent;
//# sourceMappingURL=resolver-actividad.component.js.map