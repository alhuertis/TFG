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
var ResolverActividadComponent = (function () {
    function ResolverActividadComponent(_actividadService) {
        this._actividadService = _actividadService;
    }
    ResolverActividadComponent.prototype.ngOnInit = function () {
        ;
    }; //fin ngOnInit
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