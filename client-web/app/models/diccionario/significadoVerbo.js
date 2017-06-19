"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var significado_1 = require("./significado");
var SignificadoVerbo = (function (_super) {
    __extends(SignificadoVerbo, _super);
    function SignificadoVerbo(significado, numeroArgumentos, argumentos, ejemplo) {
        var _this = _super.call(this, significado) || this;
        _this.significado = significado;
        _this.numeroArgumentos = numeroArgumentos;
        _this.argumentos = argumentos;
        _this.ejemplo = ejemplo;
        _this.numeroArgumentos = "";
        _this.argumentos = null;
        _this.ejemplo = "";
        return _this;
    }
    return SignificadoVerbo;
}(significado_1.Significado));
exports.SignificadoVerbo = SignificadoVerbo;
//# sourceMappingURL=significadoVerbo.js.map