"use strict";
var Palabra = (function () {
    function Palabra(id, lema, categoria, significados) {
        this.id = id;
        this.lema = lema;
        this.categoria = categoria;
        this.significados = significados;
        this.id = "";
        this.lema = "";
        this.categoria = "";
        this.significados = null;
    }
    return Palabra;
}());
exports.Palabra = Palabra;
//# sourceMappingURL=palabra.js.map