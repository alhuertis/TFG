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
                    "fraseATraducir": "Dei sacrificium accipiunt",
                    "solucionFLogico": "Nominativo(Dei), Acusativo(sacrificium), Verbo(accipiunt)",
                    "solucionFPatron": "dioses + reciben + sacrificio",
                    "solucionPEspanol": "Los dioses reciben el sacrificio",
                    "solucionPLatin": "",
                    "marcado": false
                }
            ];
        this.ejercicio = new ejercicio_1.Ejercicio("", "", "", "", null, "", "", null, null, "", "", "", "", "", "", false);
    }
    ResolverActividadComponent.prototype.ngOnInit = function () {
    }; //fin ngOnInit
    ResolverActividadComponent.prototype.seleccionaEjer = function (i) {
        this.ejercicio = this.actividad[i];
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