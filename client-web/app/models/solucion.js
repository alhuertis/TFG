"use strict";
var Solucion = (function () {
    function Solucion() {
        this.actividad = {};
        this._id = "";
        this.terminado = false;
        this.calificaciones = new Array();
        this.respuestas = new Array();
        this.msgCalificaciones = new Array();
        this.actividad = null;
        this.id_alumno = null;
        this.nombre_alumno = "";
        this.nivel = "";
        this.notaFinal = 0;
        this.profesor = "";
        this.ejercicios = new Array();
        this.ultima_modificacion = null;
    }
    return Solucion;
}());
exports.Solucion = Solucion;
//# sourceMappingURL=solucion.js.map