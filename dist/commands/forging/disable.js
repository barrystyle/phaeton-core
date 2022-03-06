"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_forging_1 = require("../../base_forging");
class DisableForgingCommand extends base_forging_1.BaseForgingCommand {
    async init() {
        await super.init();
        this.forging = false;
    }
}
exports.default = DisableForgingCommand;
DisableForgingCommand.description = 'Disable forging for given delegate address.';
DisableForgingCommand.examples = [
    'forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815',
    'forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 --data-path ./data',
    'forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 --data-path ./data --password your_password',
];
DisableForgingCommand.flags = {
    ...base_forging_1.BaseForgingCommand.flags,
};
DisableForgingCommand.args = [...base_forging_1.BaseForgingCommand.args];
//# sourceMappingURL=disable.js.map