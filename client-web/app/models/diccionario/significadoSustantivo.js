"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var significado_1 = require("./significado");
var SignificadoSustantivo = (function (_super) {
    __extends(SignificadoSustantivo, _super);
    function SignificadoSustantivo(significado, caracArgumental) {
        var _this = _super.call(this, significado) || this;
        _this.significado = significado;
        _this.caracArgumental = caracArgumental;
        _this.caracArgumental = null;
        return _this;
    }
    return SignificadoSustantivo;
}(significado_1.Significado));
exports.SignificadoSustantivo = SignificadoSustantivo;
//# sourceMappingURL=significadoSustantivo.js.map