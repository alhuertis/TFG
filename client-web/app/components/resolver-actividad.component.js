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
var ejercicio_1 = require("../models/ejercicio");
var ficha_1 = require("../models/ficha");
var _ = require("underscore");
var ResolverActividadComponent = (function () {
    function ResolverActividadComponent(_actividadService) {
        this._actividadService = _actividadService;
        this.actividad =
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
                    "fraseATraducir": "Dei sacrificium accipiunt Dei sacrificium accipiunt",
                    "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                    "solucionFPatron": "dioses + reciben + sacrificio",
                    "solucionPEspanol": "Los dioses reciben el sacrificio",
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
            ];
        this.ejercicio = new ejercicio_1.Ejercicio("", "", "", "", null, "", "", null, null, "", "", "", "", "", "", false);
        this.ejerSel = 0;
        this.anterior = this.ejerSel > 0;
        this.siguiente = this.ejerSel < this.actividad.length;
        this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.calificaciones = [];
        this.respuesta = "";
        this.msgCalificacion = "";
        this.progreso = 0;
        this.calificacionFinal = 0;
        this.monovalente = new ficha_1.Ficha(false, "50px", "0px");
        this.bivalente = new ficha_1.Ficha(false, "50px", "0px");
        this.trivalente = new ficha_1.Ficha(false, "50px", "0px");
        this.amarilla = new ficha_1.Ficha(false, "", "");
        this.azul = new ficha_1.Ficha(false, "", "");
        this.naranja = new ficha_1.Ficha(false, "", "");
        this.roja = new ficha_1.Ficha(false, "", "");
        this.verde = new ficha_1.Ficha(false, "", "");
        this.argumentos = 0;
        this.faseVerbo = false;
        this.verbo = this.extraerVerbo();
    }
    ResolverActividadComponent.prototype.ngOnInit = function () {
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
    };
    ResolverActividadComponent.prototype.anteriorEjer = function () {
        this.ejerSel--;
        this.anterior = this.ejerSel > 0;
        this.siguiente = this.ejerSel < this.actividad.length;
        this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.respuesta = "";
    };
    ResolverActividadComponent.prototype.calificar = function () {
        if (this.respuesta == this.actividad[this.ejerSel].solucionPEspanol) {
            this.msgCalificacion = "!!Enhorabuena¡¡ La respues es correcta";
            this.calificaciones[this.ejerSel] = 1;
        }
        else {
            var patron = void 0;
            var res = void 0;
            res = this.respuesta.split(" ");
            patron = this.actividad[this.ejerSel].solucionFPatron.split(" + ");
            res = _.intersection(res, patron);
            if (_.isEqual(patron, res)) {
                this.msgCalificacion = "La solución parece correcta porque las palabras están bien traducidas y se presentan en un orden correcto, pero debe comprobarla el profesor porque no coincide con la solución que ha propuesto";
                this.calificaciones[this.ejerSel] = 1;
            }
            else {
                if (res.length == patron.length) {
                    this.msgCalificacion = "La solución tiene las palabras bien traducidas pero no se presentan en el orden correcto propuesto por el profesor. Esta solución debe comprobarla el profesor";
                    this.calificaciones[this.ejerSel] = 1 / 2;
                }
                else if (res.length > patron.length / 2) {
                    this.msgCalificacion = "Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                    this.calificaciones[this.ejerSel] = 1 / 4;
                }
                else {
                    this.msgCalificacion = "Cuidado, tu solución no tiene todas las palabras bien traducidas. Comprueba cuáles son utilizando la solución propuesta por el profesor";
                    this.calificaciones[this.ejerSel] = 0;
                }
            }
        }
        this.progreso = (this.calificaciones.length * 100) / this.actividad.length;
        if (this.progreso == 100) {
            for (var i = 0; i < this.calificaciones.length; i++) {
                this.calificacionFinal += this.calificaciones[i];
            }
        }
    };
    ResolverActividadComponent.prototype.clickMonovalente = function (event) {
        if (this.argumentos > 1) {
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }
        else {
            if (this.monovalente.activa)
                this.monovalente.activa = false;
            else
                this.monovalente.activa = true;
        }
    };
    ResolverActividadComponent.prototype.clickBivalente = function (event) {
        if (this.argumentos != 2) {
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }
        else {
            if (this.bivalente.activa)
                this.bivalente.activa = false;
            else
                this.bivalente.activa = true;
        }
    };
    ResolverActividadComponent.prototype.clickTrivalente = function (event) {
        if (this.argumentos != 3) {
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }
        else {
            if (this.trivalente.activa)
                this.trivalente.activa = false;
            else
                this.trivalente.activa = true;
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
    ResolverActividadComponent.prototype.clickPalabra = function (event, palabra) {
        $(event.target).addClass("marcada");
        if (palabra == this.verbo) {
            alert("Es el verbo!");
            $(event.target).addClass("marcada");
        }
        else {
            alert("No es el verbo");
            $(event.target).removeClass("marcada");
        }
    };
    return ResolverActividadComponent;
}());
ResolverActividadComponent = __decorate([
    core_1.Component({
        selector: 'resolver-actividad',
        templateUrl: 'app/views/resolver-actividad.html',
        providers: [actividad_service_1.ActividadService],
        styleUrls: ['../../assets/css/styles.css'],
    }),
    __metadata("design:paramtypes", [actividad_service_1.ActividadService])
], ResolverActividadComponent);
exports.ResolverActividadComponent = ResolverActividadComponent;
//# sourceMappingURL=resolver-actividad.component.js.map