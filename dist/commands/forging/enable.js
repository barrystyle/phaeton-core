"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_forging_1 = require("../../base_forging");
class EnableForgingCommand extends base_forging_1.BaseForgingCommand {
    async init() {
        await super.init();
        this.forging = true;
    }
}
exports.default = EnableForgingCommand;
EnableForgingCommand.description = 'Enable forging for given delegate address.';
EnableForgingCommand.examples = [
    'forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10',
    'forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10 --overwrite',
    'forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10 --data-path ./data',
    'forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10 --data-path ./data --password your_password',
];
EnableForgingCommand.flags = {
    ...base_forging_1.BaseForgingCommand.flags,
};
EnableForgingCommand.args = [
    ...base_forging_1.BaseForgingCommand.args,
    {
        name: 'height',
        required: true,
        description: 'Last forged block height.',
    },
    {
        name: 'maxHeightPreviouslyForged',
        required: true,
        description: 'Delegates largest previously forged height.',
    },
    {
        name: 'maxHeightPrevoted',
        required: true,
        description: 'Delegates largest prevoted height for a block.',
    },
];
//# sourceMappingURL=enable.js.map