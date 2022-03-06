"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs = require("fs-extra");
const path = require("path");
const phaeton_sdk_1 = require("phaeton-sdk");
const commons_1 = require("../../utils/commons");
const flags_1 = require("../../utils/flags");
const reader_1 = require("../../utils/reader");
class ConfigCommand extends command_1.Command {
    async run() {
        const { flags: { count, distance, output, passphrase: passphraseSource, password: passwordSource, pretty, }, } = this.parse(ConfigCommand);
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
        const passphrase = passphraseSource !== null && passphraseSource !== void 0 ? passphraseSource : (await reader_1.getPassphraseFromPrompt('passphrase', true));
        const address = phaeton_sdk_1.cryptography.getAddressFromPassphrase(passphrase).toString('hex');
        const password = passwordSource !== null && passwordSource !== void 0 ? passwordSource : (await reader_1.getPasswordFromPrompt('password', true));
        const seed = phaeton_sdk_1.cryptography.generateHashOnionSeed();
        const hashBuffers = phaeton_sdk_1.cryptography.hashOnion(seed, count, distance);
        const hashes = hashBuffers.map(buf => buf.toString('hex'));
        const hashOnion = { count, distance, hashes };
        const { encryptedPassphrase } = commons_1.encryptPassphrase(passphrase, password, false);
        const message = { forging: { delegates: [{ address, encryptedPassphrase, hashOnion }] } };
        if (output) {
            if (pretty) {
                fs.writeJSONSync(output, message, { spaces: ' ' });
            }
            else {
                fs.writeJSONSync(output, message);
            }
        }
        else {
            this.printJSON(message, pretty);
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
exports.default = ConfigCommand;
ConfigCommand.description = 'Generate delegate forging config for given passphrase and password.';
ConfigCommand.examples = [
    'forging:config',
    'forging:config --password your_password',
    'forging:config --passphrase your_passphrase --password your_password --pretty',
    'forging:config --count=1000000 --distance=2000 --output /tmp/forging_config.json',
];
ConfigCommand.flags = {
    password: command_1.flags.string({ ...flags_1.flags.password }),
    passphrase: command_1.flags.string({ ...flags_1.flags.passphrase }),
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
    output: command_1.flags.string({
        char: 'o',
        description: 'Output file path',
    }),
    pretty: command_1.flags.boolean({
        description: 'Prints JSON in pretty format rather than condensed.',
    }),
};
//# sourceMappingURL=config.js.map