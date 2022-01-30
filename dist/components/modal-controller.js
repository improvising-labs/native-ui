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
exports.ModalController = void 0;
var react_1 = __importStar(require("react"));
exports.ModalController = (0, react_1.forwardRef)(function (_a) {
    var _b = _a.duration, duration = _b === void 0 ? 400 : _b, children = _a.children;
    var _c = (0, react_1.useState)(false), visible = _c[0], setVisible = _c[1];
    var handleDismiss = function () {
        setVisible(false);
    };
    (0, react_1.useEffect)(function () {
        setVisible(true);
    }, []);
    return (<>
      {children({
            duration: duration,
            visible: visible,
            handleDismiss: handleDismiss,
        })}
    </>);
});
//# sourceMappingURL=modal-controller.js.map