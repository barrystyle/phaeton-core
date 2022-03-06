"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const commons_1 = require("../../utils/commons");
const flags_1 = require("../../utils/flags");
const reader_1 = require("../../utils/reader");
const outputPublicKeyOptionDescription = 'Includes the public key in the output. This option is provided for the convenience of node operators.';
class EncryptCommand extends command_1.Command {
    async run() {
        const { flags: { passphrase: passphraseSource, password: passwordSource, 'output-public-key': outputPublicKey, pretty, }, } = this.parse(EncryptCommand);
        const passphrase = passphraseSource !== null && passphraseSource !== void 0 ? passphraseSource : (await reader_1.getPassphraseFromPrompt('passphrase', true));
        const password = passwordSource !== null && passwordSource !== void 0 ? passwordSource : (await reader_1.getPasswordFromPrompt('password', true));
        const result = commons_1.encryptPassphrase(passphrase, password, outputPublicKey);
        this.printJSON(result, pretty);
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
exports.default = EncryptCommand;
EncryptCommand.description = 'Encrypt secret passphrase using password.';
EncryptCommand.examples = [
    'passphrase:encrypt',
    'passphrase:encrypt --passphrase your-passphrase',
    'passphrase:encrypt --password your-password',
    'passphrase:encrypt --password your-password --passphrase your-passphrase --pretty',
    'passphrase:encrypt --output-public-key',
];
EncryptCommand.flags = {
    password: command_1.flags.string(flags_1.flags.password),
    passphrase: command_1.flags.string(flags_1.flags.passphrase),
    'output-public-key': command_1.flags.boolean({
        description: outputPublicKeyOptionDescription,
    }),
    pretty: command_1.flags.boolean({
        description: 'Prints JSON in pretty format rather than condensed.',
    }),
};
//# sourceMappingURL=encrypt.js.map