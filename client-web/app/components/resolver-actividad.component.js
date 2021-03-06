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
var diccionario_service_1 = require("../services/diccionario.service");
var ejercicio_1 = require("../models/ejercicio");
var ficha_1 = require("../models/ficha");
var solucion_1 = require("../models/solucion");
var solucion_ejercicio_1 = require("../models/solucion-ejercicio");
var _ = require("underscore");
var messages = require("../constants/messagesResources");
var ResolverActividadComponent = (function () {
    function ResolverActividadComponent(_actividadService, _solucionService, _diccionarioService, route, _router) {
        this._actividadService = _actividadService;
        this._solucionService = _solucionService;
        this._diccionarioService = _diccionarioService;
        this.route = route;
        this._router = _router;
        this.MS = messages;
        var parametros = this.route.snapshot.params['id_actividad'];
        parametros = parametros.split('-');
        this.id_actividad = parametros[0];
        if (parametros.length > 1)
            this.id_solucion = parametros[1];
        else
            this.id_solucion = "";
        this.actividad = [];
        this.user = JSON.parse(localStorage.getItem('currentUser')).user;
        this.diccionario = [];
        this.caracterizacionesFichas = { "amarilla": "-animado +definido", "azul": "-animado -definido", "marron": "+animado -humano", "roja": "+animado +humano", "verde": "lugar" };
        this.color = "";
        this.izquierda = { "puesta": "false", "color": "", "caracterizacion": "", "emparejada": "" };
        this.derecha = { "puesta": "false", "color": "", "caracterizacion": "", "emparejada": "" };
        this.superior = { "puesta": "false", "color": "", "caracterizacion": "", "emparejada": "" };
        this.palabrasAcertadas = [];
        this.busquedaPalabra = "";
        this.ejercicio = new ejercicio_1.Ejercicio("", "", "", "", null, "", "", null, null, "", "", "", "", "", "", "", false, "");
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
        this.terminado = false;
        this.buscandoPalabra = false;
        this.resultadoBusqueda = {};
        this.msgFichas = [];
        this.modalExplicacion = false;
    }
    ResolverActividadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._diccionarioService.getDiccionario().subscribe(function (result) {
            _this.diccionario = result.diccionario;
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                alert(_this.errorMessage);
            }
        });
        this._actividadService.cargarActividad(this.id_actividad).subscribe(function (result) {
            _this.actividad = result.actividad.ejercicios;
            _this.infoActividad = result.actividad;
            if (!_this.actividad) {
                alert('Error en el servidor');
            }
            else {
                _this.fraseSplit = _this.actividad[_this.ejerSel].fraseATraducir.split(" ");
                _this.fraseLematizadaSplit = _this.actividad[_this.ejerSel].fraseLematizada.split(" ");
                _this.verbo = _this.extraerVerbo();
                _this.anterior = _this.ejerSel > 0;
                _this.siguiente = _this.ejerSel < _this.actividad.length - 1;
                for (var i = 0; i < _this.actividad.length; i++) {
                    _this.solucion.ejercicios[i] = new solucion_ejercicio_1.SolucionEjercicio();
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                alert(_this.errorMessage);
            }
        });
        if (this.id_solucion != "") {
            this._solucionService.getSolucion(this.id_solucion).subscribe(function (result) {
                _this.sleep(800).then(function () {
                    _this.solucion = result.solucion;
                    if (!_this.solucion)
                        alert("No se han podidos cargar los datos de solucion anteriores");
                    else {
                        for (var i = 0; i < _this.solucion.ejercicios.length; i++) {
                            if (_this.solucion.ejercicios[i].calificacion >= 0) {
                                _this.calificaciones[i] = _this.solucion.ejercicios[i].calificacion;
                                _this.resueltos++;
                            }
                        }
                        _this.progreso = (_this.resueltos * 100) / _this.actividad.length;
                        if (_this.progreso == 100)
                            _this.terminado = true;
                    }
                });
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    alert(_this.errorMessage);
                }
            });
        }
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
        if (this.siguiente) {
            this.restaurarColoresPalabras();
            this.ejerSel++;
            this.siguiente = this.ejerSel < this.actividad.length - 1;
            this.anterior = this.ejerSel > 0;
            this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
            this.fraseLematizadaSplit = this.actividad[this.ejerSel].fraseLematizada.split(" ");
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
            if (this.resueltos > 0)
                this.guardarSolucion();
        }
    };
    ResolverActividadComponent.prototype.anteriorEjer = function () {
        if (this.anterior) {
            this.restaurarColoresPalabras();
            this.ejerSel--;
            this.anterior = this.ejerSel > 0;
            this.siguiente = this.ejerSel < this.actividad.length - 1;
            this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
            this.fraseLematizadaSplit = this.actividad[this.ejerSel].fraseLematizada.split(" ");
            this.respuesta = "";
            this.verbo = this.extraerVerbo();
            if (this.resueltos > 0)
                this.guardarSolucion();
        }
    };
    ResolverActividadComponent.prototype.seleccionarEjer = function (n) {
        this.restaurarColoresPalabras();
        this.ejerSel = n;
        this.anterior = this.ejerSel > 0;
        this.siguiente = this.ejerSel < this.actividad.length - 1;
        this.fraseSplit = this.actividad[this.ejerSel].fraseATraducir.split(" ");
        this.fraseLematizadaSplit = this.actividad[this.ejerSel].fraseLematizada.split(" ");
        this.respuesta = "";
        this.verbo = this.extraerVerbo();
        if (this.resueltos > 0)
            this.guardarSolucion();
    };
    ResolverActividadComponent.prototype.calificar = function () {
        this.borrarMsgFichas();
        if (this.respuesta == this.actividad[this.ejerSel].solucionPEspanol) {
            this.solucion.ejercicios[this.ejerSel].msgCalificacion = this.MS.RESOLVER_RESPUESTA_CORRECTA;
            this.solucion.ejercicios[this.ejerSel].calificacion = 1;
        }
        else {
            var patron = void 0;
            var res = void 0;
            res = this.respuesta.split(" ");
            patron = this.actividad[this.ejerSel].solucionFPatron.split(" + ");
            res = _.intersection(res, patron);
            if (_.isEqual(patron, res)) {
                this.solucion.ejercicios[this.ejerSel].msgCalificacion = this.MS.RESOLVER_RESPUESTA_NOTA_1;
                this.solucion.ejercicios[this.ejerSel].calificacion = 1;
            }
            else {
                if (res.length == patron.length) {
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion = this.MS.RESOLVER_RESPUESTA_NOTA_1_2;
                    this.solucion.ejercicios[this.ejerSel].calificacion = 1 / 2;
                }
                else if (res.length > patron.length / 2) {
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion = this.MS.RESOLVER_RESPUESTA_NOTA_1_4;
                    this.solucion.ejercicios[this.ejerSel].calificacion = 1 / 4;
                }
                else {
                    this.solucion.ejercicios[this.ejerSel].msgCalificacion = this.MS.RESOLVER_RESPUESTA_NOTA_0;
                    this.solucion.ejercicios[this.ejerSel].calificacion = 0;
                }
            }
        }
        this.solucion.ejercicios[this.ejerSel].respuesta = this.respuesta;
        this.solucion.ejercicios[this.ejerSel].notaProfesor = -1;
        this.solucion.ejercicios[this.ejerSel].msgProfesor = "";
        this.resueltos++;
        this.progreso = (this.resueltos * 100) / this.actividad.length;
        if (this.progreso == 100) {
            for (var i = 0; i < this.solucion.ejercicios.length; i++) {
                this.calificacionFinal += this.solucion.ejercicios[i].calificacion;
            }
            this.solucion.notaFinal = this.calificacionFinal;
            this.terminado = true;
        }
        this.guardarSolucion();
    };
    ResolverActividadComponent.prototype.clickMonovalente = function (event) {
        /*if(this.argumentos > 1){
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }else{
            if(this.verboMarcado){
                this.faseVerbo=true;
                this.monovalente.activa=true;
            }else{
                if(this.monovalente.activa)
                    this.monovalente.activa=false;
                else
                    this.monovalente.activa=true;
            }
        }*/
    };
    ResolverActividadComponent.prototype.clickBivalente = function (event) {
        /*if(this.argumentos != 2){
            alert("Esta pieza no representa el numero de argumentos del verbo");
        }else{
             if(this.verboMarcado){
                this.faseVerbo=true;
                this.bivalente.activa=true;
                $('span.marcada').removeClass("marcada").addClass("acertada");
            }else{
                if(this.bivalente.activa)
                    this.bivalente.activa=false;
                else
                    this.bivalente.activa=true;
            }
        }*/
    };
    ResolverActividadComponent.prototype.clickTrivalente = function (event) {
        /*if(this.argumentos != 3){
           alert("Esta pieza no representa el numero de argumentos del verbo");
       }else{
            if(this.verboMarcado){
               this.faseVerbo=true;
               this.trivalente.activa=true;
           }else{
               if(this.trivalente.activa)
                   this.trivalente.activa=false;
               else
                   this.trivalente.activa=true;
           }
       }*/
    };
    ResolverActividadComponent.prototype.clickAmarilla = function (event) {
        /*if(this.amarilla.activa)
            this.amarilla.activa=false;
        else{
            this.amarilla.activa=true;
            this.amarilla.top="0px";
            this.amarilla.left="0px";
        }*/
    };
    ResolverActividadComponent.prototype.clickAzul = function (event) {
        /*if(this.azul.activa)
            this.azul.activa=false;
        else{
            this.azul.activa=true;
            this.azul.top="20px";
            this.azul.left="30px";
        }*/
    };
    ResolverActividadComponent.prototype.clickNaranja = function (event) {
        /*if(this.naranja.activa)
            this.naranja.activa=false;
        else{
            this.naranja.activa=true;
            this.naranja.top="20px";
            this.naranja.left="30px";
        }*/
    };
    ResolverActividadComponent.prototype.clickRoja = function (event) {
        /*if(this.roja.activa)
            this.roja.activa=false;
        else{
            this.roja.activa=true;
            this.roja.top="20px";
            this.roja.left="30px";
        }*/
    };
    ResolverActividadComponent.prototype.clickVerde = function (event) {
        /*if(this.verde.activa)
            this.verde.activa=false;
        else{
            this.verde.activa=true;
            this.verde.top="20px";
            this.verde.left="30px";
        }*/
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
        /* if(this.verboMarcado && !this.faseVerbo){
             this.verboMarcado=false;
             $(event.target).removeClass("marcada");
         }else if(!this.faseVerbo){
             if(palabra == this.verbo){
                 this.verboMarcado=true;
                 //alert("Es el verbo!");
                 this.mostrarMsgFichas("Es el verbo!");
                 $(event.target).addClass("marcada");
             }
             else{
                 //alert("No es el verbo");
                 this.mostrarMsgFichas("No es el verbo...");
                 $(event.target).removeClass("marcada");
             }
         }*/
    };
    ResolverActividadComponent.prototype.mostrarMsgFichas = function (msg) {
        /*this.msgFichas=msg;
         this.sleep(4000).then(()=>{
            $(".respuesta-fichas").removeClass("fadeInRigth");
            $(".respuesta-fichas").addClass("fadeOutRight");
            this.sleep(1000).then(()=>{
                this.msgFichas="";
            });
            
        });*/
        this.msgFichas[this.msgFichas.length] = msg;
    };
    ResolverActividadComponent.prototype.borraMsgFicha = function (i) {
        this.msgFichas.splice(i, 1);
    };
    ResolverActividadComponent.prototype.borrarMsgFichas = function () {
        var _this = this;
        $(".respuesta-fichas").removeClass("fadeInRigth");
        $(".respuesta-fichas").addClass("fadeOutRight");
        this.sleep(1000).then(function () {
            _this.msgFichas = [];
        });
    };
    ResolverActividadComponent.prototype.dropVerbo = function (event, palabra) {
        //alert(palabra + " " + event.dragData);
        if (this.faseVerbo)
            //alert("Ya has encontrado el verbo. Ahora debes encajar una pieza y arrastar las palabras a ella.");
            this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_VERBO_1);
        else {
            if (palabra == this.verbo) {
                //alert("Has acertado, es el verbo");
                this.faseVerbo = true;
                if (this.argumentos == 1 && event.dragData == "monovalente") {
                    this.monovalente.activa = true;
                    $(event.nativeEvent.target).addClass("marcada flash");
                    this.borrarMsgFichas();
                }
                else if (this.argumentos == 2 && event.dragData == "bivalente") {
                    this.bivalente.activa = true;
                    $(event.nativeEvent.target).addClass("marcada flash");
                    this.borrarMsgFichas();
                }
                else if (this.argumentos == 3 && event.dragData == "trivalente") {
                    this.trivalente.activa = true;
                    $(event.nativeEvent.target).addClass("marcada flash");
                    this.borrarMsgFichas();
                }
                else {
                    //alert("Pero no es la ficha adecuada");
                    this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_VERBO_2);
                    this.faseVerbo = false;
                }
            }
            else {
                //alert("No es el verbo");
                this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_VERBO_3);
                $(event.nativeEvent.target).addClass("shake");
                this.sleep(1000).then(function () {
                    $(".frase-traducir").children().removeClass("shake");
                });
                this.faseVerbo = false;
            }
        }
    };
    ResolverActividadComponent.prototype.dragPentagono = function (event, color) {
        //alert($(event.nativeEvent.target).attr("src"));
        this.srcDraggedPentagono = $(event.target).attr("src");
        this.color = color;
    };
    ResolverActividadComponent.prototype.dropPentagono = function (event, posicion) {
        var data = event.dragData;
        var sonFichas = data == '-animado +definido' || data == '-animado -definido' || data == '+animado -humano' || data == '+animado +humano' || data == 'lugar';
        if (!sonFichas) {
            var i = 0;
            var dataLema = data;
            for (var _i = 0, _a = this.fraseSplit; _i < _a.length; _i++) {
                var p = _a[_i];
                if (dataLema == p) {
                    dataLema = this.fraseLematizadaSplit[i];
                    break;
                }
                i++;
            }
            var vari = _.findWhere(this.diccionario, { "lema": dataLema.toLowerCase() });
            if (vari != undefined) {
                if (posicion == 'izquierda' && this.izquierda.caracterizacion == vari.significado[0].caracArgumental[0]) {
                    $("." + data).css("background", this.izquierda.color);
                    $("." + data).addClass("flash");
                    $(".izquierda").addClass("flash");
                }
                else if (posicion == 'superior' && this.superior.caracterizacion == vari.significado[0].caracArgumental[0]) {
                    $("." + data).css("background", this.superior.color);
                    $("." + data).addClass("flash");
                    $(".superior").addClass("flash");
                }
                else if (posicion == 'derecha' && this.derecha.caracterizacion == vari.significado[0].caracArgumental[0]) {
                    $("." + data).css("background", this.derecha.color);
                    $("." + data).addClass("flash");
                    $(".derecha").addClass("flash");
                }
                else {
                    //alert("No se pueden emparejar");
                    $("." + data).addClass("shake");
                    this.sleep(1000).then(function () {
                        $("." + data).removeClass("shake");
                    });
                }
            }
            else {
                //alert("No se encuentra en el diccionario");
                this.mostrarMsgFichas(this.MS.RESOLVER_DICCIONARIO_NO_VALIDA);
            }
        }
        else {
            if (posicion == 'izquierda') {
                this.izquierda.color = this.color;
                this.izquierda.puesta = true;
                this.izquierda.caracterizacion = data;
            }
            else if (posicion == 'superior') {
                this.superior.color = this.color;
                this.superior.puesta = true;
                this.superior.caracterizacion = data;
            }
            else if (posicion == 'derecha') {
                this.derecha.color = this.color;
                this.derecha.puesta = true;
                this.derecha.caracterizacion = data;
            }
            if (posicion == 'izquierda') {
                if (data == '+animado +humano') {
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src", this.srcDraggedPentagono);
                }
                else {
                    //alert("Esta ficha no se corresponde con el argumento nominativo, que debe ir colocado siempre en la izquierda");
                    this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_FICHA_1);
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src", this.srcDraggedPentagono);
                    $(event.nativeEvent.target).children().addClass("fadeOut2");
                    this.sleep(1000).then(function () {
                        $(event.nativeEvent.target).children().css("display", "none");
                        $(event.nativeEvent.target).children().removeAttr("src");
                        $(event.nativeEvent.target).children().removeClass("fadeOut2");
                    });
                }
            }
            else {
                if (data == '+animado +humano') {
                    //alert("Esta ficha corresponde al argumento nominativo y solo puede colocarse por la izquierda");
                    this.mostrarMsgFichas(this.MS.RESOLVER_AVISO_FICHA_2);
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src", this.srcDraggedPentagono);
                    $(event.nativeEvent.target).children().addClass("fadeOut2");
                    this.sleep(700).then(function () {
                        $(event.nativeEvent.target).children().css("display", "none");
                        $(event.nativeEvent.target).children().removeAttr("src");
                        $(event.nativeEvent.target).children().removeClass("fadeOut2");
                    });
                }
                else {
                    $(event.nativeEvent.target).children().css("display", "block");
                    $(event.nativeEvent.target).children().attr("src", this.srcDraggedPentagono);
                }
            }
        }
    };
    ResolverActividadComponent.prototype.buscarPalabra = function () {
        //Sustantivo, verbo, adverbio, conjuncion, Pronombre,Adjetivo
        var _this = this;
        this.buscandoPalabra = true;
        this.sleep(100).then(function () {
            var encontrado = false;
            var i = 0;
            while (!encontrado && i < _this.diccionario.length) {
                var o = _this.diccionario[i];
                if (o.lema == _this.busquedaPalabra.toLowerCase() || o.lema.indexOf(_this.busquedaPalabra.toLowerCase() + ",") != -1) {
                    _this.resultadoBusqueda = o;
                    encontrado = true;
                }
                i++;
            }
            if (!encontrado || _this.busquedaPalabra == '') {
                _this.resultadoBusqueda = {};
            }
            _this.buscandoPalabra = false;
        });
    };
    ResolverActividadComponent.prototype.addBuscar = function (palabra) {
        this.busquedaPalabra = palabra;
        this.buscarPalabra();
    };
    ResolverActividadComponent.prototype.quitaPentagono = function (event) {
        $(event.target).children().removeAttr("src");
        $(event.target).children().css("display", "none");
    };
    ResolverActividadComponent.prototype.sleep = function (ms) {
        if (ms === void 0) { ms = 0; }
        return new Promise(function (r) { return setTimeout(r, ms); });
    };
    //cuando terminas, guarda y sale
    ResolverActividadComponent.prototype.guardarYSalir = function () {
        this.guardarSolucion();
        this._router.navigate(['/alumno']);
    };
    //guarda la solucion en cualquier momento
    ResolverActividadComponent.prototype.guardarSolucion = function () {
        var _this = this;
        this.solucion.actividad = this.id_actividad;
        this.solucion.id_alumno = this.user._id;
        this.solucion.nombre_alumno = this.user.nombre + " " + this.user.apellidos;
        for (var i = 0; i < this.infoActividad.ejercicios.length; i++) {
            this.solucion.ejercicios[i]._id = this.infoActividad.ejercicios[i];
        }
        this.solucion.terminado = this.terminado;
        this.solucion.nivel = this.infoActividad.nivel;
        this.solucion.profesor = this.infoActividad.id_profesor;
        if (this.solucion._id == "") {
            this._solucionService.saveSolucion(this.solucion).subscribe(function (result) {
                _this.solucion._id = result;
                if (_this.solucion._id == "") {
                    //alert('Error en el servidor guardando la solucion');
                    _this.mostrarMsgFichas(_this.MS.RESOLVER_ERROR_GUARDAR);
                }
                else {
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    alert(_this.errorMessage);
                }
            });
        }
        else {
            this.solucion.ultima_modificacion = new Date();
            this._solucionService.updateSolucion(this.solucion).subscribe(function (result) {
                _this.solucion._id = result;
                if (_this.solucion._id == "") {
                    alert('Error en el servidor actualizando la solucion');
                }
                else {
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    alert(_this.errorMessage);
                }
            });
        }
    };
    ResolverActividadComponent.prototype.abrirModalSalir = function () {
        var _this = this;
        this.msgSalir = this.MS.RESOLVER_MSG_SALIR;
        this.modalSalir = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    ResolverActividadComponent.prototype.cancelarModalSalir = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalSalir = false; }, 300);
        this.msgSalir = "";
    };
    ResolverActividadComponent.prototype.cancelarModalDiccionario = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalDiccionario = false; }, 300);
    };
    ResolverActividadComponent.prototype.cancelarModalAyuda = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalAyuda = false; }, 300);
    };
    ResolverActividadComponent.prototype.abrirModalDiccionario = function () {
        var _this = this;
        this.modalDiccionario = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    ResolverActividadComponent.prototype.abrirModalAyuda = function () {
        var _this = this;
        this.modalAyuda = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    ResolverActividadComponent.prototype.restaurarColoresPalabras = function () {
        for (var _i = 0, _a = this.fraseSplit; _i < _a.length; _i++) {
            var p = _a[_i];
            $("." + p).css("background", "none");
            $("." + p).removeClass("flash");
            $("." + p).removeClass("shake");
        }
    };
    ResolverActividadComponent.prototype.abrirModalExplicacion = function () {
        var _this = this;
        this.modalExplicacion = true;
        setTimeout(function () { return _this.visibleAnimate = true; });
    };
    ResolverActividadComponent.prototype.cancelarModalExplicacion = function () {
        var _this = this;
        this.visibleAnimate = false;
        setTimeout(function () { return _this.modalExplicacion = false; }, 300);
    };
    return ResolverActividadComponent;
}());
ResolverActividadComponent = __decorate([
    core_1.Component({
        selector: 'resolver-actividad',
        templateUrl: 'app/views/resolver-actividad.html',
        providers: [actividad_service_1.ActividadService, solucion_service_1.SolucionService, diccionario_service_1.DiccionarioService],
        styleUrls: ['../../assets/css/styles.css'],
    }),
    __metadata("design:paramtypes", [actividad_service_1.ActividadService,
        solucion_service_1.SolucionService,
        diccionario_service_1.DiccionarioService,
        router_1.ActivatedRoute,
        router_1.Router])
], ResolverActividadComponent);
exports.ResolverActividadComponent = ResolverActividadComponent;
//# sourceMappingURL=resolver-actividad.component.js.map