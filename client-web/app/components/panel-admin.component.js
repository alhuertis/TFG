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
var authentication_service_1 = require("../services/authentication.service");
//los decoradores no tienen punto y coma
var PanelAdminComponent = (function () {
    function PanelAdminComponent(_authenticationService) {
        this._authenticationService = _authenticationService;
        // pager object
        this.pager = {};
        this.users = [];
    }
    PanelAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._authenticationService.getRegistros().subscribe(function (result) {
            _this.users = result.registros;
            _this.setPage(1);
        });
    };
    PanelAdminComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._authenticationService.getPager(this.users.length, page);
        // get current page of items
        this.pagedItems = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
        //alert(this.ejercicios.slice(1,5));
    };
    return PanelAdminComponent;
}());
PanelAdminComponent = __decorate([
    core_1.Component({
        selector: 'panel-admin',
        templateUrl: 'app/views/panel-admin.html',
        providers: [authentication_service_1.AuthenticationService]
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], PanelAdminComponent);
exports.PanelAdminComponent = PanelAdminComponent;
//# sourceMappingURL=panel-admin.component.js.map