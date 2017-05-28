"use strict";
var Actividad = (function () {
    function Actividad() {
        this.titulo = "";
        this.id_profesor = "";
        this.profesor = "";
        this.fecha_creacion = null;
        this.nivel = "";
        this.ejercicios = [];
        this.visible = null;
        this.propuesta = null;
        this.fecha_prop_fin = null;
        this.marcado = null;
    }
    return Actividad;
}());
exports.Actividad = Actividad;
//# sourceMappingURL=actividad.js.map