"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const phaeton_sdk_1 = require("phaeton-sdk");
const base_ipc_1 = require("../../base_ipc");
const flags_1 = require("../../utils/flags");
const reader_1 = require("../../utils/reader");
const constants_1 = require("../../constants");
class SignCommand extends base_ipc_1.default {
    async run() {
        var _a, _b, _c;
        const { args, flags: { 'data-path': dataPath, 'include-sender': includeSender, 'sender-public-key': senderPublicKey, 'mandatory-keys': mandatoryKeys, 'optional-keys': optionalKeys, json, passphrase: passphraseSource, offline, 'network-identifier': networkIdentifierSource, }, } = this.parse(SignCommand);
        const { transaction } = args;
        if (offline && dataPath) {
            throw new Error('Flag: --data-path should not be specified while signing offline.');
        }
        if (offline && !networkIdentifierSource) {
            throw new Error('Flag: --network-identifier must be specified while signing offline.');
        }
        let networkIdentifier = networkIdentifierSource;
        if (!offline) {
            if (!this._client) {
                this.error('APIClient is not initialized.');
            }
            const nodeInfo = await this._client.node.getNodeInfo();
            networkIdentifier = nodeInfo.networkIdentifier;
        }
        if (!offline && networkIdentifierSource && networkIdentifier !== networkIdentifierSource) {
            throw new Error(`Invalid networkIdentifier specified, actual: ${networkIdentifierSource}, expected: ${networkIdentifier}.`);
        }
        const passphrase = passphraseSource !== null && passphraseSource !== void 0 ? passphraseSource : (await reader_1.getPassphraseFromPrompt('passphrase', true));
        const networkIdentifierBuffer = Buffer.from(networkIdentifier, 'hex');
        const transactionObject = this.decodeTransaction(transaction);
        const assetSchema = this.getAssetSchema(transactionObject.moduleID, transactionObject.assetID);
        let signedTransaction;
        if (!includeSender && !senderPublicKey) {
            signedTransaction = phaeton_sdk_1.transactions.signTransaction(assetSchema.schema, transactionObject, networkIdentifierBuffer, passphrase);
        }
        else if (offline) {
            if (!mandatoryKeys.length && !optionalKeys.length) {
                throw new Error('--mandatory-keys or --optional-keys flag must be specified to sign transaction from multi signature account.');
            }
            const keys = {
                mandatoryKeys: mandatoryKeys ? mandatoryKeys.map(k => Buffer.from(k, 'hex')) : [],
                optionalKeys: optionalKeys ? optionalKeys.map(k => Buffer.from(k, 'hex')) : [],
            };
            signedTransaction = phaeton_sdk_1.transactions.signMultiSignatureTransaction(assetSchema.schema, transactionObject, networkIdentifierBuffer, passphrase, keys, includeSender);
        }
        else {
            if (!senderPublicKey) {
                throw new Error('Sender publickey must be specified for signing transactions from multi signature account.');
            }
            const address = phaeton_sdk_1.cryptography.getAddressFromPublicKey(Buffer.from(senderPublicKey, 'hex'));
            const account = (await ((_a = this._client) === null || _a === void 0 ? void 0 : _a.account.get(address)));
            let keysAsset;
            if (((_b = account.keys) === null || _b === void 0 ? void 0 : _b.mandatoryKeys.length) === 0 && ((_c = account.keys) === null || _c === void 0 ? void 0 : _c.optionalKeys.length) === 0) {
                keysAsset = transactionObject.asset;
            }
            else {
                keysAsset = account.keys;
            }
            const keys = {
                mandatoryKeys: keysAsset.mandatoryKeys.map(k => Buffer.from(k, 'hex')),
                optionalKeys: keysAsset.optionalKeys.map(k => Buffer.from(k, 'hex')),
            };
            signedTransaction = phaeton_sdk_1.transactions.signMultiSignatureTransaction(assetSchema.schema, transactionObject, networkIdentifierBuffer, passphrase, keys, includeSender);
        }
        if (json) {
            this.printJSON({
                transaction: this.encodeTransaction(signedTransaction).toString('hex'),
            });
            this.printJSON({
                transaction: this.transactionToJSON(signedTransaction),
            });
        }
        else {
            this.printJSON({
                transaction: this.encodeTransaction(signedTransaction).toString('hex'),
            });
        }
    }
}
exports.default = SignCommand;
SignCommand.description = 'Sign encoded transaction.';
SignCommand.args = [
    {
        name: 'transaction',
        required: true,
        description: 'The transaction to be signed encoded as hex string',
    },
];
SignCommand.flags = {
    ...base_ipc_1.default.flags,
    passphrase: command_1.flags.string(flags_1.flags.passphrase),
    'include-sender': command_1.flags.boolean({
        description: 'Include sender signature in transaction.',
        default: false,
    }),
    'mandatory-keys': command_1.flags.string({
        multiple: true,
        description: 'Mandatory publicKey string in hex format.',
    }),
    'optional-keys': command_1.flags.string({
        multiple: true,
        description: 'Optional publicKey string in hex format.',
    }),
    'network-identifier': command_1.flags.string(flags_1.flags.networkIdentifier),
    json: command_1.flags.boolean({
        char: 'j',
        description: 'Print the transaction in JSON format.',
    }),
    'sender-public-key': command_1.flags.string({
        char: 's',
        description: 'Sign the transaction with provided sender public key, when passphrase is not provided',
    }),
    offline: command_1.flags.boolean({
        ...flags_1.flags.offline,
        hidden: false,
        default: false,
    }),
    network: command_1.flags.string({
        ...flags_1.flags.network,
        default: constants_1.DEFAULT_NETWORK,
        hidden: false,
    }),
};
SignCommand.examples = [
    'transaction:sign <hex-encoded-binary-transaction>',
    'transaction:sign <hex-encoded-binary-transaction> --network testnet',
];
//# sourceMappingURL=sign.js.map