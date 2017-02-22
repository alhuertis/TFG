"use strict";
var Favorito = (function () {
    function Favorito(
        //El id es el interno que asigna solo mongo, pero nos viene bien para recuperarlo
        _id, title, description, url) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.url = url;
    }
    return Favorito;
}());
exports.Favorito = Favorito;
//# sourceMappingURL=favorito.js.map