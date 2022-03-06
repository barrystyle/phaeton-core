"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockchainDB = void 0;
const phaeton_sdk_1 = require("phaeton-sdk");
const path_1 = require("./path");
const getBlockchainDB = (dataPath) => new phaeton_sdk_1.db.KVStore(path_1.getBlockchainDBPath(dataPath));
exports.getBlockchainDB = getBlockchainDB;
//# sourceMappingURL=db.js.map