"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const phaeton_sdk_1 = require("phaeton-sdk");
const base_ipc_1 = require("../../base_ipc");
const flags_1 = require("../../utils/flags");
const reader_1 = require("../../utils/reader");
const constants_1 = require("../../constants");
const isSequenceObject = (input, key) => {
    const value = input[key];
    if (typeof value !== 'object' || Array.isArray(value) || value === null) {
        return false;
    }
    const sequence = value;
    if (typeof sequence.nonce !== 'bigint') {
        return false;
    }
    return true;
};
class CreateCommand extends base_ipc_1.default {
    async run() {
        const { args, flags: { 'data-path': dataPath, passphrase: passphraseSource, 'no-signature': noSignature, 'sender-public-key': senderPublicKeySource, asset: assetSource, json, 'network-identifier': networkIdentifierSource, nonce: nonceSource, offline, }, } = this.parse(CreateCommand);
        const { fee, moduleID, assetID } = args;
        if (offline && dataPath) {
            throw new Error('Flag: --data-path should not be specified while creating transaction offline.');
        }
        if (!senderPublicKeySource && noSignature) {
            throw new Error('Sender public key must be specified when no-signature flags is used.');
        }
        if (offline && !networkIdentifierSource) {
            throw new Error('Flag: --network-identifier must be specified while creating transaction offline.');
        }
        if (offline && !nonceSource) {
            throw new Error('Flag: --nonce must be specified while creating transaction offline.');
        }
        const assetSchema = this._schema.transactionsAssets.find(as => as.moduleID === Number(moduleID) && as.assetID === Number(assetID));
        if (!assetSchema) {
            throw new Error(`Transaction moduleID:${moduleID} with assetID:${assetID} is not registered in the application.`);
        }
        const rawAsset = assetSource
            ? JSON.parse(assetSource)
            : await reader_1.getAssetFromPrompt(assetSchema.schema);
        const assetObject = phaeton_sdk_1.codec.fromJSON(assetSchema.schema, rawAsset);
        const assetErrors = phaeton_sdk_1.validator.validator.validate(assetSchema.schema, assetObject);
        if (assetErrors.length) {
            throw new phaeton_sdk_1.validator.PhaetonValidationError([...assetErrors]);
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
        const incompleteTransaction = {
            moduleID: Number(moduleID),
            assetID: Number(assetID),
            nonce: nonceSource ? BigInt(nonceSource) : undefined,
            fee: BigInt(fee),
            senderPublicKey: senderPublicKeySource
                ? Buffer.from(senderPublicKeySource, 'hex')
                : undefined,
            asset: assetObject,
            signatures: [],
        };
        let passphrase = '';
        if (passphraseSource || !noSignature) {
            passphrase = passphraseSource !== null && passphraseSource !== void 0 ? passphraseSource : (await reader_1.getPassphraseFromPrompt('passphrase', true));
            const { publicKey } = phaeton_sdk_1.cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
            incompleteTransaction.senderPublicKey = publicKey;
        }
        if (!offline) {
            if (!this._client) {
                this.error('APIClient is not initialized.');
            }
            const address = phaeton_sdk_1.cryptography.getAddressFromPublicKey(incompleteTransaction.senderPublicKey);
            const account = await this._client.account.get(address);
            if (!isSequenceObject(account, 'sequence')) {
                this.error('Account does not have sequence property.');
            }
            incompleteTransaction.nonce = account.sequence.nonce;
        }
        if (!offline && nonceSource && BigInt(incompleteTransaction.nonce) > BigInt(nonceSource)) {
            throw new Error(`Invalid nonce specified, actual: ${nonceSource}, expected: ${incompleteTransaction.nonce.toString()}`);
        }
        const { asset, ...transactionWithoutAsset } = incompleteTransaction;
        const transactionErrors = phaeton_sdk_1.validator.validator.validate(this._schema.transaction, {
            ...transactionWithoutAsset,
            asset: Buffer.alloc(0),
        });
        if (transactionErrors.length) {
            throw new phaeton_sdk_1.validator.PhaetonValidationError([...transactionErrors]);
        }
        const transactionObject = {
            ...transactionWithoutAsset,
            asset: assetObject,
        };
        if (!noSignature) {
            phaeton_sdk_1.transactions.signTransaction(assetSchema.schema, transactionObject, Buffer.from(networkIdentifier, 'hex'), passphrase);
        }
        if (json) {
            this.printJSON({
                transaction: this.encodeTransaction(transactionObject).toString('hex'),
            });
            this.printJSON({
                transaction: this.transactionToJSON(transactionObject),
            });
        }
        else {
            this.printJSON({
                transaction: this.encodeTransaction(transactionObject).toString('hex'),
            });
        }
    }
}
exports.default = CreateCommand;
CreateCommand.strict = false;
CreateCommand.description = 'Create transaction which can be broadcasted to the network. Note: fee and amount should be in Helis!!';
CreateCommand.args = [
    {
        name: 'moduleID',
        required: true,
        description: 'Registered transaction module id.',
    },
    {
        name: 'assetID',
        required: true,
        description: 'Registered transaction asset id.',
    },
    {
        name: 'fee',
        required: true,
        description: 'Transaction fee in Helis.',
    },
];
CreateCommand.examples = [
    'transaction:create 2 0 100000000 --asset=\'{"amount":100000000,"recipientAddress":"ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815","data":"send token"}\'',
    'transaction:create 2 0 100000000 --asset=\'{"amount":100000000,"recipientAddress":"ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815","data":"send token"}\' --json',
    'transaction:create 2 0 100000000 --offline --network mainnet --network-identifier 873da85a2cee70da631d90b0f17fada8c3ac9b83b2613f4ca5fddd374d1034b3 --nonce 1 --asset=\'{"amount":100000000,"recipientAddress":"ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815","data":"send token"}\'',
];
CreateCommand.flags = {
    ...base_ipc_1.default.flags,
    'network-identifier': command_1.flags.string(flags_1.flags.networkIdentifier),
    nonce: command_1.flags.string({
        description: 'Nonce of the transaction.',
    }),
    'no-signature': command_1.flags.boolean({
        description: 'Creates the transaction without a signature. Your passphrase will therefore not be required',
    }),
    passphrase: command_1.flags.string(flags_1.flags.passphrase),
    'sender-public-key': command_1.flags.string({
        char: 's',
        description: 'Creates the transaction with provided sender publickey, when passphrase is not provided',
    }),
    asset: command_1.flags.string({
        char: 'a',
        description: 'Creates transaction with specific asset information',
    }),
    json: command_1.flags.boolean({
        char: 'j',
        description: 'Print the transaction in JSON format',
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
//# sourceMappingURL=create.js.map