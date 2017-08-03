"use strict";
var Actividad = (function () {
    function Actividad() {
        this.titulo = "";
        this.id_profesor = "";
        this.profesor = "";
        this.fecha_creacion = null;
        this.nivel = "";
        this.ejercicios = [];
        this.visible = false;
        this.propuesta = false;
        this.fecha_prop_fin = null;
        this.marcado = null;
    }
    Actividad.prototype.getFechaPropFin = function () {
        return this.fecha_prop_fin;
    };
    return Actividad;
}());
exports.Actividad = Actividad;
//# sourceMappingURL=actividad.js.map