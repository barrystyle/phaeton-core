"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketsPath = exports.getPidPath = exports.getForgerDBPath = exports.getBlockchainDBPath = exports.ensureConfigDir = exports.removeConfigDir = exports.getGenesisBlockAndConfig = exports.getConfigDirs = exports.getDefaultNetworkConfigFilesPath = exports.getNetworkConfigFilesPath = exports.getDefaultConfigDir = exports.splitPath = exports.getFullPath = exports.getDefaultPath = void 0;
const path = require("path");
const fs = require("fs-extra");
const os = require("os");
const phaeton_sdk_1 = require("phaeton-sdk");
const defaultDir = '.phaeton';
const defaultFolder = 'phaeton-core';
const getConfigPath = (dataPath) => path.join(dataPath, 'config');
const getDefaultPath = () => path.join(os.homedir(), defaultDir, defaultFolder);
exports.getDefaultPath = getDefaultPath;
const getFullPath = (dataPath) => path.resolve(dataPath);
exports.getFullPath = getFullPath;
const splitPath = (dataPath) => {
    const rootPath = path.resolve(path.join(dataPath, '../'));
    const label = path.parse(dataPath).name;
    return {
        rootPath,
        label,
    };
};
exports.splitPath = splitPath;
const getDefaultConfigDir = () => path.join(__dirname, '../..');
exports.getDefaultConfigDir = getDefaultConfigDir;
const getNetworkConfigFilesPath = (dataPath, network) => {
    const basePath = path.join(dataPath, 'config', network);
    return {
        genesisBlockFilePath: path.join(basePath, 'genesis_block.json'),
        configFilePath: path.join(basePath, 'config.json'),
    };
};
exports.getNetworkConfigFilesPath = getNetworkConfigFilesPath;
const getDefaultNetworkConfigFilesPath = (network) => {
    const basePath = path.join(exports.getDefaultConfigDir(), 'config', network);
    return {
        genesisBlockFilePath: path.join(basePath, 'genesis_block.json'),
        configFilePath: path.join(basePath, 'config.json'),
    };
};
exports.getDefaultNetworkConfigFilesPath = getDefaultNetworkConfigFilesPath;
const getConfigDirs = (dataPath) => {
    const configPath = getConfigPath(dataPath);
    fs.ensureDirSync(configPath);
    const files = fs.readdirSync(configPath);
    return files.filter(file => fs.statSync(path.join(configPath, file)).isDirectory());
};
exports.getConfigDirs = getConfigDirs;
const getGenesisBlockAndConfig = async (network) => {
    const { genesisBlockFilePath: defaultGenesisBlockFilePath, configFilePath: defaultConfigFilepath, } = exports.getDefaultNetworkConfigFilesPath(network);
    const genesisBlock = (await fs.readJSON(defaultGenesisBlockFilePath));
    const config = (await fs.readJSON(defaultConfigFilepath));
    return { genesisBlock, config };
};
exports.getGenesisBlockAndConfig = getGenesisBlockAndConfig;
const removeConfigDir = (dataPath, network) => fs.removeSync(path.join(dataPath, 'config', network));
exports.removeConfigDir = removeConfigDir;
const ensureConfigDir = (dataPath, network) => fs.ensureDirSync(path.join(dataPath, 'config', network));
exports.ensureConfigDir = ensureConfigDir;
const getBlockchainDBPath = (dataPath) => path.join(dataPath, 'data', 'blockchain.db');
exports.getBlockchainDBPath = getBlockchainDBPath;
const getForgerDBPath = (dataPath) => path.join(dataPath, 'data', 'forger.db');
exports.getForgerDBPath = getForgerDBPath;
const getPidPath = (dataPath) => path.join(dataPath, 'tmp', 'pids', 'controller.pid');
exports.getPidPath = getPidPath;
const getSocketsPath = (dataPath, network = defaultFolder) => {
    const dirs = phaeton_sdk_1.systemDirs(network, dataPath);
    return {
        root: `unix://${dirs.sockets}`,
        pub: `unix://${dirs.sockets}/phaeton_pub.sock`,
        sub: `unix://${dirs.sockets}/phaeton_sub.sock`,
        rpc: `unix://${dirs.sockets}/bus_rpc_socket.sock`,
    };
};
exports.getSocketsPath = getSocketsPath;
//# sourceMappingURL=path.js.map