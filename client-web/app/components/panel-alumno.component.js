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
//los decoradores no tienen punto y coma
var PanelAlumnoComponent = (function () {
    function PanelAlumnoComponent(_actividadService) {
        this._actividadService = _actividadService;
        this.title = "Panel de alumno";
        this.actividades = [];
        this.nActividades = 0;
    }
    PanelAlumnoComponent.prototype.ngOnInit = function () {
        //Obtencion de datos
        /*this._actividadService.getActividades().subscribe(
            result =>{
                console.log(result);
                this.actividades= result.actividades;

                if(!this.actividades){
                    alert('Error en el servidor');
                }
                else{
                    this.loading=false;
                    this.nActividades= this.actividades.length;
                
                }

            },
            error => {
                this.errorMessage= <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert(this.errorMessage);
                    alert('Error todo tocho');
                }
            }*/
        ;
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
    PanelAlumnoComponent.prototype.numActividades = function () {
        return this.actividades.length;
    };
    return PanelAlumnoComponent;
}());
PanelAlumnoComponent = __decorate([
    core_1.Component({
        selector: 'panel-alumno',
        templateUrl: 'app/views/panel-alumno.html',
        providers: [actividad_service_1.ActividadService],
        styleUrls: ['../../assets/css/menu-profesor.css'],
    }),
    __metadata("design:paramtypes", [actividad_service_1.ActividadService])
], PanelAlumnoComponent);
exports.PanelAlumnoComponent = PanelAlumnoComponent;
//# sourceMappingURL=panel-alumno.component.js.map