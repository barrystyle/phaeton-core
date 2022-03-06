"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const command_1 = require("@oclif/command");
const path_1 = require("../../utils/path");
const application_1 = require("../../utils/application");
const db_1 = require("../../utils/db");
class HashCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(HashCommand);
        const dataPath = flags['data-path'] ? flags['data-path'] : path_1.getDefaultPath();
        const blockchainPath = path_1.getBlockchainDBPath(dataPath);
        if (application_1.isApplicationRunning(dataPath)) {
            const errorMessage = `Can't generate hash for a running application. Application at data path ${dataPath} is running with pid ${application_1.getPid(dataPath)}.`;
            this.error(errorMessage);
            return;
        }
        this.debug('Compressing data to generate hash.');
        this.debug(`   ${path_1.getFullPath(blockchainPath)}`);
        const db = db_1.getBlockchainDB(dataPath);
        const stream = db.createReadStream({
            keys: false,
            values: true,
        });
        const dbHash = crypto.createHash('sha256');
        const hash = await new Promise((resolve, reject) => {
            stream.on('data', (chunk) => {
                dbHash.update(chunk);
            });
            stream.on('error', error => {
                reject(error);
            });
            stream.on('end', () => {
                resolve(dbHash.digest());
            });
        });
        this.debug('Hash generation completed.');
        this.log(hash.toString('hex'));
    }
}
exports.default = HashCommand;
HashCommand.description = 'Generate SHA256 hash from <PATH>.';
HashCommand.examples = ['blockchain:hash', 'blockchain:hash --data-path ./data'];
HashCommand.flags = {
    'data-path': command_1.flags.string({
        char: 'd',
        description: 'Directory path to specify where node data is stored. Environment variable "PHAETON_DATA_PATH" can also be used.',
        env: 'PHAETON_DATA_PATH',
    }),
};
//# sourceMappingURL=hash.js.map