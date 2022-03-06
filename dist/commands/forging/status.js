"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_ipc_1 = require("../../base_ipc");
class StatusCommand extends base_ipc_1.default {
    async run() {
        if (!this._client) {
            this.error('APIClient is not initialized.');
        }
        const info = await this._client.invoke('app:getForgingStatus');
        this.printJSON(info);
    }
}
exports.default = StatusCommand;
StatusCommand.description = 'Get forging information for the locally running node.';
StatusCommand.examples = ['forging:status', 'forging:status --data-path ./sample --pretty'];
StatusCommand.flags = {
    ...base_ipc_1.default.flags,
};
//# sourceMappingURL=status.js.map