"use strict";
var Solucion = (function () {
    function Solucion() {
        this._id = "";
        this.terminado = false;
        this.calificaciones = new Array();
        ;
        this.respuestas = new Array();
        this.msgCalificaciones = new Array();
        this.id_actividad = null;
        this.id_alumno = null;
        this.notaFinal = 0;
    }
    return Solucion;
}());
exports.Solucion = Solucion;
//# sourceMappingURL=solucion.js.map