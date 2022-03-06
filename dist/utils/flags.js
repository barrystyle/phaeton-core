"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flags = void 0;
const passphraseDescription = `Specifies a source for your secret passphrase. Command will prompt you for input if this option is not set.
	Examples:
	- --passphrase='my secret passphrase' (should only be used where security is not important)
`;
const passwordDescription = `Specifies a source for your secret password. Command will prompt you for input if this option is not set.
	Examples:
	- --password=pass:password123 (should only be used where security is not important)
`;
exports.flags = {
    passphrase: {
        char: 'p',
        description: passphraseDescription,
    },
    password: {
        char: 'w',
        description: passwordDescription,
    },
    dataPath: {
        char: 'd',
        description: 'Directory path to specify where node data is stored. Environment variable "PHAETON_DATA_PATH" can also be used.',
    },
    offline: {
        description: 'Specify whether to connect to a local node or not.',
    },
    network: {
        char: 'n',
        description: 'Default network config to use. Environment variable "PHAETON_NETWORK" can also be used.',
    },
    networkIdentifier: {
        description: 'Network identifier defined for the network or main | test for the Phaeton Network.',
    },
};
//# sourceMappingURL=flags.js.map