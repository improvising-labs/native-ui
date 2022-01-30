"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showModal = void 0;
var react_1 = __importStar(require("react"));
var modal_controller_1 = require("../components/modal-controller");
var modal_1 = require("../core/modal");
var showModal = function (_a) {
    var duration = _a.duration, builder = _a.builder;
    var controllerRef = (0, react_1.createRef)();
    var dispose = modal_1.ModalService.create(<modal_controller_1.ModalController ref={controllerRef} duration={duration}>
      {builder}
    </modal_controller_1.ModalController>);
    return {
        dispose: dispose,
        handleDismiss: controllerRef.current.handleDismiss,
    };
};
exports.showModal = showModal;
//# sourceMappingURL=modal.js.map