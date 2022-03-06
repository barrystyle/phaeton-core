"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_ipc_1 = require("../../base_ipc");
class InfoCommand extends base_ipc_1.default {
    async run() {
        if (!this._client) {
            this.error('APIClient is not initialized.');
        }
        try {
            const nodeInfo = await this._client.node.getNodeInfo();
            this.printJSON(nodeInfo);
        }
        catch (errors) {
            const errorMessage = Array.isArray(errors)
                ? errors.map(err => err.message).join(',')
                : errors;
            this.error(errorMessage);
        }
    }
}
exports.default = InfoCommand;
InfoCommand.description = 'Get node information from a running application.';
InfoCommand.examples = ['node:info', 'node:info --data-path ./phaeton'];
InfoCommand.flags = {
    ...base_ipc_1.default.flags,
};
//# sourceMappingURL=info.js.map