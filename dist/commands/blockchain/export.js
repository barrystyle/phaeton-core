"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tar = require("tar");
const path_1 = require("path");
const command_1 = require("@oclif/command");
const path_2 = require("../../utils/path");
class ExportCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(ExportCommand);
        const dataPath = flags['data-path'] ? flags['data-path'] : path_2.getDefaultPath();
        const blockchainPath = path_2.getBlockchainDBPath(dataPath);
        const exportPath = flags.output ? flags.output : process.cwd();
        this.log('Exporting blockchain:');
        this.log(`   ${path_2.getFullPath(blockchainPath)}`);
        const filePath = path_1.join(exportPath, 'blockchain.db.tar.gz');
        await tar.create({
            gzip: true,
            file: filePath,
            cwd: path_1.join(dataPath, 'data'),
        }, ['blockchain.db']);
        this.log('Export completed:');
        this.log(`   ${filePath}`);
    }
}
exports.default = ExportCommand;
ExportCommand.description = 'Export to <FILE>.';
ExportCommand.examples = [
    'blockchain:export',
    'blockchain:export --data-path ./data --output ./my/path/',
];
ExportCommand.flags = {
    'data-path': command_1.flags.string({
        char: 'd',
        description: 'Directory path to specify where node data is stored. Environment variable "PHAETON_DATA_PATH" can also be used.',
        env: 'PHAETON_DATA_PATH',
    }),
    output: command_1.flags.string({
        char: 'o',
        description: 'The output directory. Default will set to current working directory.',
    }),
};
//# sourceMappingURL=export.js.map