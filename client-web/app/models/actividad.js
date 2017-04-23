"use strict";
var Actividad = (function () {
    function Actividad(
        //El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
        titulo, id_profesor, profesor, fecha_creacion, nivel, ejercicios, visible, propuesta, fecha_prop_fin) {
        this.titulo = titulo;
        this.id_profesor = id_profesor;
        this.profesor = profesor;
        this.fecha_creacion = fecha_creacion;
        this.nivel = nivel;
        this.ejercicios = ejercicios;
        this.visible = visible;
        this.propuesta = propuesta;
        this.fecha_prop_fin = fecha_prop_fin;
    }
    return Actividad;
}());
exports.Actividad = Actividad;
//# sourceMappingURL=actividad.js.map