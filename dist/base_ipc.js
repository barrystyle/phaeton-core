"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const phaeton_sdk_1 = require("phaeton-sdk");
const path_1 = require("./utils/path");
const flags_1 = require("./utils/flags");
const application_1 = require("./application");
const constants_1 = require("./constants");
const application_2 = require("./utils/application");
const prettyDescription = 'Prints JSON in pretty format rather than condensed.';
class BaseIPCCommand extends command_1.Command {
    async finally(error) {
        if (error) {
            if (/^IPC Socket client connection timeout./.test(error.message)) {
                this.error('Please ensure the app is up and running with ipc enabled before using the command!');
            }
            this.error(error instanceof Error ? error.message : error);
        }
        if (this._client) {
            await this._client.disconnect();
        }
    }
    async init() {
        const { flags } = this.parse(this.constructor);
        this.baseIPCFlags = flags;
        const dataPath = this.baseIPCFlags['data-path']
            ? this.baseIPCFlags['data-path']
            : path_1.getDefaultPath();
        if (this.baseIPCFlags.offline) {
            const { genesisBlock, config } = await path_1.getGenesisBlockAndConfig(this.baseIPCFlags.network);
            const app = application_1.getApplication(genesisBlock, config, {
                enableHTTPAPIPlugin: false,
                enableForgerPlugin: false,
                enableMonitorPlugin: false,
                enableReportMisbehaviorPlugin: false,
            });
            this._schema = app.getSchema();
            return;
        }
        if (!application_2.isApplicationRunning(dataPath)) {
            throw new Error(`Application at data path ${dataPath} is not running.`);
        }
        this._client = await phaeton_sdk_1.apiClient.createIPCClient(dataPath);
        this._schema = this._client.schemas;
    }
    printJSON(message) {
        if (this.baseIPCFlags.pretty) {
            this.log(JSON.stringify(message, undefined, '  '));
        }
        else {
            this.log(JSON.stringify(message));
        }
    }
    getAssetSchema(moduleID, assetID) {
        const assetSchema = this._schema.transactionsAssets.find(schema => schema.moduleID === moduleID && schema.assetID === assetID);
        if (!assetSchema) {
            throw new Error(`Transaction moduleID:${moduleID} with assetID:${assetID} is not registered in the application.`);
        }
        return assetSchema;
    }
    decodeTransaction(transactionHexStr) {
        const transactionBytes = Buffer.from(transactionHexStr, 'hex');
        if (this._client) {
            return this._client.transaction.decode(transactionBytes);
        }
        const id = phaeton_sdk_1.cryptography.hash(transactionBytes);
        const transaction = phaeton_sdk_1.codec.decode(this._schema.transaction, transactionBytes);
        const assetSchema = this.getAssetSchema(transaction.moduleID, transaction.assetID);
        const asset = phaeton_sdk_1.codec.decode(assetSchema.schema, transaction.asset);
        return {
            ...transaction,
            asset,
            id,
        };
    }
    encodeTransaction(transaction) {
        if (this._client) {
            return this._client.transaction.encode(transaction);
        }
        const assetSchema = this.getAssetSchema(transaction.moduleID, transaction.assetID);
        const assetBytes = phaeton_sdk_1.codec.encode(assetSchema.schema, transaction.asset);
        const txBytes = phaeton_sdk_1.codec.encode(this._schema.transaction, { ...transaction, asset: assetBytes });
        return txBytes;
    }
    transactionToJSON(transaction) {
        if (this._client) {
            return this._client.transaction.toJSON(transaction);
        }
        const assetSchema = this.getAssetSchema(transaction.moduleID, transaction.assetID);
        const assetJSON = phaeton_sdk_1.codec.toJSON(assetSchema.schema, transaction.asset);
        const { id, asset, ...txWithoutAsset } = transaction;
        const txJSON = phaeton_sdk_1.codec.toJSON(this._schema.transaction, txWithoutAsset);
        return {
            ...txJSON,
            asset: assetJSON,
            id: Buffer.isBuffer(id) ? id.toString('hex') : undefined,
        };
    }
}
exports.default = BaseIPCCommand;
BaseIPCCommand.flags = {
    pretty: command_1.flags.boolean({
        description: prettyDescription,
    }),
    'data-path': command_1.flags.string({
        ...flags_1.flags.dataPath,
        env: 'PHAETON_DATA_PATH',
    }),
    offline: command_1.flags.boolean({
        ...flags_1.flags.offline,
        default: false,
        hidden: true,
    }),
    network: command_1.flags.string({
        ...flags_1.flags.network,
        env: 'PHAETON_NETWORK',
        default: constants_1.DEFAULT_NETWORK,
        hidden: true,
    }),
};
//# sourceMappingURL=base_ipc.js.map