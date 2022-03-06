"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassphrase = exports.phaetonSnapshotUrl = exports.phaetonGenesisBlockUrl = void 0;
const phaeton_sdk_1 = require("phaeton-sdk");
const constants_1 = require("../constants");
const phaetonGenesisBlockUrl = (url, network) => {
    if (!['testnet', 'mainnet', 'betanet'].includes(network.toLowerCase())) {
        return '';
    }
    if (url && url.search(constants_1.DOWNLOAD_URL) >= 0) {
        return `${constants_1.DOWNLOAD_URL}/${network}/genesis_block.json.tar.gz`;
    }
    return url;
};
exports.phaetonGenesisBlockUrl = phaetonGenesisBlockUrl;
const phaetonSnapshotUrl = (url, network) => {
    if (!['testnet', 'mainnet', 'betanet'].includes(network.toLowerCase())) {
        return '';
    }
    if (url && url.search(constants_1.SNAPSHOT_URL) >= 0) {
        return `${constants_1.SNAPSHOT_URL}/${network}/blockchain.db.tar.gz`;
    }
    return url;
};
exports.phaetonSnapshotUrl = phaetonSnapshotUrl;
const encryptPassphrase = (passphrase, password, outputPublicKey) => {
    const encryptedPassphraseObject = phaeton_sdk_1.cryptography.encryptPassphraseWithPassword(passphrase, password);
    const encryptedPassphrase = phaeton_sdk_1.cryptography.stringifyEncryptedPassphrase(encryptedPassphraseObject);
    return outputPublicKey
        ? {
            encryptedPassphrase,
            publicKey: phaeton_sdk_1.cryptography.getKeys(passphrase).publicKey.toString('hex'),
        }
        : { encryptedPassphrase };
};
exports.encryptPassphrase = encryptPassphrase;
//# sourceMappingURL=commons.js.map