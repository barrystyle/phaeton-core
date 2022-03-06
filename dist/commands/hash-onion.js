"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phaeton_sdk_1 = require("phaeton-sdk");
const command_1 = require("@oclif/command");
const fs = require("fs-extra");
const path = require("path");
class HashOnionCommand extends command_1.default {
    async run() {
        const { flags: { output, count, distance, pretty }, } = this.parse(HashOnionCommand);
        if (distance <= 0 || !phaeton_sdk_1.validator.isValidInteger(distance)) {
            throw new Error('Distance flag must be an integer and greater than 0.');
        }
        if (count <= 0 || !phaeton_sdk_1.validator.isValidInteger(count)) {
            throw new Error('Count flag must be an integer and greater than 0.');
        }
        if (output) {
            const { dir } = path.parse(output);
            fs.ensureDirSync(dir);
        }
        const seed = phaeton_sdk_1.cryptography.generateHashOnionSeed();
        const hashBuffers = phaeton_sdk_1.cryptography.hashOnion(seed, count, distance);
        const hashes = hashBuffers.map(buf => buf.toString('hex'));
        const result = { count, distance, hashes };
        if (output) {
            if (pretty) {
                fs.writeJSONSync(output, result, { spaces: ' ' });
            }
            else {
                fs.writeJSONSync(output, result);
            }
        }
        else {
            this.printJSON(result, pretty);
        }
    }
    printJSON(message, pretty = false) {
        if (pretty) {
            this.log(JSON.stringify(message, undefined, '  '));
        }
        else {
            this.log(JSON.stringify(message));
        }
    }
}
exports.default = HashOnionCommand;
HashOnionCommand.description = 'Create hash onions to be used by the forger.';
HashOnionCommand.examples = [
    'hash-onion --count=1000000 --distance=2000 --pretty',
    'hash-onion --count=1000000 --distance=2000 --output ~/my_onion.json',
];
HashOnionCommand.flags = {
    output: command_1.flags.string({
        char: 'o',
        description: 'Output file path',
    }),
    count: command_1.flags.integer({
        char: 'c',
        description: 'Total number of hashes to produce',
        default: 1000000,
    }),
    distance: command_1.flags.integer({
        char: 'd',
        description: 'Distance between each hashes',
        default: 1000,
    }),
    pretty: command_1.flags.boolean({
        description: 'Prints JSON in pretty format rather than condensed.',
    }),
};
//# sourceMappingURL=hash-onion.js.map