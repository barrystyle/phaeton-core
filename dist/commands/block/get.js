"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_ipc_1 = require("../../base_ipc");
class GetCommand extends base_ipc_1.default {
    async run() {
        const { args } = this.parse(GetCommand);
        const { input } = args;
        let block;
        if (!this._client) {
            this.error('APIClient is not initialized.');
        }
        try {
            if (!Number.isNaN(Number(input))) {
                block = await this._client.block.getByHeight(parseInt(input, 10));
            }
            else {
                block = await this._client.block.get(Buffer.from(input, 'hex'));
            }
            this.printJSON(this._client.block.toJSON(block));
        }
        catch (errors) {
            const errorMessage = Array.isArray(errors)
                ? errors.map(err => err.message).join(',')
                : errors;
            if (/^Specified key block(.*)does not exist/.test(errors.message)) {
                if (input) {
                    this.error('Block with given id or height was not found.');
                }
            }
            else {
                this.error(errorMessage);
            }
        }
    }
}
exports.default = GetCommand;
GetCommand.description = 'Get block information for a given id or height.';
GetCommand.args = [
    {
        name: 'input',
        required: true,
        description: 'Height in number or block id in hex format.',
    },
];
GetCommand.examples = [
    'block:get e082e79d01016632c451c9df9276e486cb7f460dc793ff5b10d8f71eecec28b4',
    'block:get 2',
];
GetCommand.flags = {
    ...base_ipc_1.default.flags,
};
//# sourceMappingURL=get.js.map