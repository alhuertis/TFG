"use strict";
var Ejercicio = (function () {
    function Ejercicio(
        //El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
        _id, id_profesor, titulo, nivel, tipo, autor, institucion_profesor, fechaCreacion, fechaModificacion, enunciado, fraseATraducir, fraseLematizada, solucionFLogico, solucionFPatron, solucionPEspanol, solucionPLatin, marcado, explicacion) {
        this._id = _id;
        this.id_profesor = id_profesor;
        this.titulo = titulo;
        this.nivel = nivel;
        this.tipo = tipo;
        this.autor = autor;
        this.institucion_profesor = institucion_profesor;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.enunciado = enunciado;
        this.fraseATraducir = fraseATraducir;
        this.fraseLematizada = fraseLematizada;
        this.solucionFLogico = solucionFLogico;
        this.solucionFPatron = solucionFPatron;
        this.solucionPEspanol = solucionPEspanol;
        this.solucionPLatin = solucionPLatin;
        this.marcado = marcado;
        this.explicacion = explicacion;
    }
    return Ejercicio;
}());
exports.Ejercicio = Ejercicio;
//# sourceMappingURL=ejercicio.js.map