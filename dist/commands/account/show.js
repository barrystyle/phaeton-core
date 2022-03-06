"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const phaeton_sdk_1 = require("phaeton-sdk");
const flags_1 = require("../../utils/flags");
const reader_1 = require("../../utils/reader");
const processInput = (passphrase, prefix) => {
    const { privateKey, publicKey } = phaeton_sdk_1.cryptography.getKeys(passphrase);
    const binaryAddress = phaeton_sdk_1.cryptography.getAddressFromPublicKey(publicKey);
    const address = phaeton_sdk_1.cryptography.getPhaeton32AddressFromPublicKey(publicKey, prefix);
    return {
        privateKey: privateKey.toString('hex'),
        publicKey: publicKey.toString('hex'),
        address,
        binaryAddress: binaryAddress.toString('hex'),
    };
};
class ShowCommand extends command_1.Command {
    async run() {
        const { flags: { passphrase: passphraseSource }, } = this.parse(ShowCommand);
        const passphrase = passphraseSource !== null && passphraseSource !== void 0 ? passphraseSource : (await reader_1.getPassphraseFromPrompt('passphrase', true));
        this.log(JSON.stringify(processInput(passphrase, this.config.pjson.phaeton.addressPrefix), undefined, ' '));
    }
}
exports.default = ShowCommand;
ShowCommand.description = 'Show account information for a given passphrase.';
ShowCommand.examples = ['account:show'];
ShowCommand.flags = {
    passphrase: command_1.flags.string(flags_1.flags.passphrase),
};
//# sourceMappingURL=show.js.map