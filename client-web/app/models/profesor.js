"use strict";
var Profesor = (function () {
    function Profesor(_id, nombre, apellidos, dni, fecha_creacion, institucion_educativa, email) {
        this._id = _id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.fecha_creacion = fecha_creacion;
        this.institucion_educativa = institucion_educativa;
        this.email = email;
        this._id = "";
        this.apellidos = "";
        this.email = "";
        this.fecha_creacion = null;
        this.institucion_educativa = "";
        this.nombre = "";
        this.dni = "";
    }
    return Profesor;
}());
exports.Profesor = Profesor;
//# sourceMappingURL=profesor.js.map