"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const path = require("path");
const fs = require("fs-extra");
const path_1 = require("../../utils/path");
const downloadUtils = require("../../utils/download");
class ImportCommand extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(ImportCommand);
        const { sourcePath } = args;
        const dataPath = flags['data-path'] ? flags['data-path'] : path_1.getDefaultPath();
        const forgerDBPath = path_1.getForgerDBPath(dataPath);
        if (path.extname(sourcePath) !== '.gz') {
            this.error('Forger data should be provided in gzip format.');
        }
        if (fs.existsSync(forgerDBPath)) {
            if (!flags.force) {
                this.error(`Forger data already exists at ${dataPath}. Use --force flag to overwrite`);
            }
            fs.removeSync(forgerDBPath);
        }
        fs.ensureDirSync(forgerDBPath);
        this.log(`Importing forger data from ${path_1.getFullPath(sourcePath)}`);
        await downloadUtils.extract(path.dirname(sourcePath), path.basename(sourcePath), forgerDBPath);
        this.log('Import completed.');
        this.log(`   ${path_1.getFullPath(dataPath)}`);
    }
}
exports.default = ImportCommand;
ImportCommand.description = 'Import from <FILE>.';
ImportCommand.args = [
    {
        name: 'sourcePath',
        required: true,
        description: 'Path to the forger-info zip file that you want to import.',
    },
];
ImportCommand.examples = [
    'forger-info:import ./my/path',
    'forger-info:import --data-path ./data --force',
];
ImportCommand.flags = {
    'data-path': command_1.flags.string({
        char: 'd',
        description: 'Directory path to specify where node data is stored. Environment variable "PHAETON_DATA_PATH" can also be used.',
        env: 'PHAETON_DATA_PATH',
    }),
    force: command_1.flags.boolean({
        char: 'f',
        description: 'To overwrite the existing data if present.',
    }),
};
//# sourceMappingURL=import.js.map