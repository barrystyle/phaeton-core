"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const phaeton_sdk_1 = require("phaeton-sdk");
class ValidateCommand extends command_1.Command {
    async run() {
        const { args } = this.parse(ValidateCommand);
        try {
            const { address } = args;
            phaeton_sdk_1.cryptography.validatePhaeton32Address(address, this.config.pjson.phaeton.addressPrefix);
            const binaryAddress = phaeton_sdk_1.cryptography.getAddressFromPhaeton32Address(address).toString('hex');
            this.log(`Address ${address} is a valid base32 address and the corresponding binary address is ${binaryAddress}.`);
        }
        catch (error) {
            this.error(error.message);
        }
    }
}
exports.default = ValidateCommand;
ValidateCommand.description = 'Validate base32 address.';
ValidateCommand.examples = ['account:validate phaeoaknq582o6fw7sp82bm2hnj7pzp47mpmbmux2g'];
ValidateCommand.args = [
    {
        name: 'address',
        required: true,
        description: 'Address in base32 format to validate.',
    },
];
//# sourceMappingURL=validate.js.map