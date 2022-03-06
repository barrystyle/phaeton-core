"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
const phaeton_sdk_1 = require("phaeton-sdk");
const getApplication = (genesisBlock, config, options) => {
    const app = phaeton_sdk_1.Application.defaultApplication(genesisBlock, config);
    if (options.enableHTTPAPIPlugin) {
        app.registerPlugin(phaeton_sdk_1.HTTPAPIPlugin, { loadAsChildProcess: true });
    }
    if (options.enableForgerPlugin) {
        app.registerPlugin(phaeton_sdk_1.ForgerPlugin, { loadAsChildProcess: true });
    }
    if (options.enableMonitorPlugin) {
        app.registerPlugin(phaeton_sdk_1.MonitorPlugin, { loadAsChildProcess: true });
    }
    if (options.enableReportMisbehaviorPlugin) {
        app.registerPlugin(phaeton_sdk_1.ReportMisbehaviorPlugin, { loadAsChildProcess: true });
    }
    return;
};
exports.getApplication = getApplication;
//# sourceMappingURL=index.js.map
