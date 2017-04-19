"use strict";
var Actividad = (function () {
    function Actividad(
        //El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
        // _id: String,
        id_profesor, profesor, fecha_creacion, nivel, ejercicios) {
        this.id_profesor = id_profesor;
        this.profesor = profesor;
        this.fecha_creacion = fecha_creacion;
        this.nivel = nivel;
        this.ejercicios = ejercicios;
    }
    return Actividad;
}());
exports.Actividad = Actividad;
//# sourceMappingURL=actividad.js.map