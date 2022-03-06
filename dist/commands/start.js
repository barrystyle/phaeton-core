"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs = require("fs-extra");
const phaeton_sdk_1 = require("phaeton-sdk");
const path_1 = require("../utils/path");
const flags_1 = require("../utils/flags");
const application_1 = require("../application");
const constants_1 = require("../constants");
const download_1 = require("./genesis-block/download");
const LOG_OPTIONS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
const setPluginConfig = (config, flags) => {
    var _a, _b, _c, _d;
    if (flags['http-api-plugin-port'] !== undefined) {
        config.plugins[phaeton_sdk_1.HTTPAPIPlugin.alias] = (_a = config.plugins[phaeton_sdk_1.HTTPAPIPlugin.alias]) !== null && _a !== void 0 ? _a : {};
        config.plugins[phaeton_sdk_1.HTTPAPIPlugin.alias].port = flags['http-api-plugin-port'];
    }
    if (flags['http-api-plugin-whitelist'] !== undefined &&
        typeof flags['http-api-plugin-whitelist'] === 'string') {
        config.plugins[phaeton_sdk_1.HTTPAPIPlugin.alias] = (_b = config.plugins[phaeton_sdk_1.HTTPAPIPlugin.alias]) !== null && _b !== void 0 ? _b : {};
        config.plugins[phaeton_sdk_1.HTTPAPIPlugin.alias].whiteList = flags['http-api-plugin-whitelist']
            .split(',')
            .filter(Boolean);
    }
    if (flags['monitor-plugin-port'] !== undefined) {
        config.plugins[phaeton_sdk_1.MonitorPlugin.alias] = (_c = config.plugins[phaeton_sdk_1.MonitorPlugin.alias]) !== null && _c !== void 0 ? _c : {};
        config.plugins[phaeton_sdk_1.MonitorPlugin.alias].port = flags['monitor-plugin-port'];
    }
    if (flags['monitor-plugin-whitelist'] !== undefined &&
        typeof flags['monitor-plugin-whitelist'] === 'string') {
        config.plugins[phaeton_sdk_1.MonitorPlugin.alias] = (_d = config.plugins[phaeton_sdk_1.MonitorPlugin.alias]) !== null && _d !== void 0 ? _d : {};
        config.plugins[phaeton_sdk_1.MonitorPlugin.alias].whiteList = flags['monitor-plugin-whitelist']
            .split(',')
            .filter(Boolean);
    }
};
class StartCommand extends command_1.Command {
    async run() {
        var _a, _b, _c, _d;
        const { flags } = this.parse(StartCommand);
        const dataPath = flags['data-path'] ? flags['data-path'] : path_1.getDefaultPath();
        this.log(`Starting Phaeton Core at ${path_1.getFullPath(dataPath)}.`);
        const pathConfig = path_1.splitPath(dataPath);
        const defaultNetworkConfigs = path_1.getDefaultConfigDir();
        const defaultNetworkConfigDir = path_1.getConfigDirs(defaultNetworkConfigs);
        if (!defaultNetworkConfigDir.includes(flags.network)) {
            this.error(`Network must be one of ${defaultNetworkConfigDir.join(',')} but received ${flags.network}.`);
        }
        const configDir = path_1.getConfigDirs(dataPath);
        if (configDir.length > 1 || (configDir.length === 1 && configDir[0] !== flags.network)) {
            if (!flags['overwrite-config']) {
                this.error(`Datapath ${dataPath} already contains configs for ${configDir.join(',')}. Please use --overwrite-config to overwrite the config.`);
            }
            for (const configFolder of configDir) {
                if (configFolder !== flags.network) {
                    path_1.removeConfigDir(dataPath, configFolder);
                }
            }
        }
        path_1.ensureConfigDir(dataPath, flags.network);
        const { genesisBlockFilePath, configFilePath } = path_1.getNetworkConfigFilesPath(dataPath, flags.network);
        const { genesisBlockFilePath: defaultGenesisBlockFilePath, configFilePath: defaultConfigFilepath, } = path_1.getDefaultNetworkConfigFilesPath(flags.network);
        const genesisBlockExists = fs.existsSync(genesisBlockFilePath);
        const configFileExists = fs.existsSync(configFilePath);
        if (!genesisBlockExists && ['mainnet', 'testnet'].includes(flags.network)) {
            this.log(`Genesis block from "${flags.network}" does not exists.`);
            await download_1.default.run(['--network', flags.network]);
        }
        if (!genesisBlockExists ||
            (genesisBlockExists &&
                flags['overwrite-config'] &&
                !['mainnet', 'testnet'].includes(flags.network))) {
            fs.copyFileSync(defaultGenesisBlockFilePath, genesisBlockFilePath);
        }
        if (!configFileExists || (configFileExists && flags['overwrite-config'])) {
            fs.copyFileSync(defaultConfigFilepath, configFilePath);
        }
        const genesisBlock = await fs.readJSON(genesisBlockFilePath);
        let config = await fs.readJSON(configFilePath);
        if (flags.config) {
            const customConfig = await fs.readJSON(flags.config);
            config = phaeton_sdk_1.utils.objects.mergeDeep({}, config, customConfig);
        }
        config.rootPath = pathConfig.rootPath;
        config.label = pathConfig.label;
        config.version = this.config.pjson.version;
        if (flags['api-ipc']) {
            config.rpc = phaeton_sdk_1.utils.objects.mergeDeep({}, config.rpc, {
                enable: flags['api-ipc'],
                mode: 'ipc',
            });
        }
        if (flags['api-ws']) {
            config.rpc = phaeton_sdk_1.utils.objects.mergeDeep({}, config.rpc, {
                enable: flags['api-ws'],
                mode: 'ws',
                port: flags['api-ws-port'],
            });
        }
        if (flags['console-log']) {
            config.logger = (_a = config.logger) !== null && _a !== void 0 ? _a : {};
            config.logger.consoleLogLevel = flags['console-log'];
        }
        if (flags.log) {
            config.logger = (_b = config.logger) !== null && _b !== void 0 ? _b : {};
            config.logger.fileLogLevel = flags.log;
        }
        if (flags.port) {
            config.network = (_c = config.network) !== null && _c !== void 0 ? _c : {};
            config.network.port = flags.port;
        }
        if (flags['seed-peers']) {
            config.network = (_d = config.network) !== null && _d !== void 0 ? _d : {};
            config.network.seedPeers = [];
            const peers = flags['seed-peers'].split(',');
            for (const seed of peers) {
                const [ip, port] = seed.split(':');
                if (!ip || !port || Number.isNaN(Number(port))) {
                    this.error('Invalid seed-peers, ip or port is invalid or not specified.');
                }
                config.network.seedPeers.push({ ip, port: Number(port) });
            }
        }
        setPluginConfig(config, flags);
        try {
            const app = application_1.getApplication(genesisBlock, config, {
                enableHTTPAPIPlugin: flags['enable-http-api-plugin'],
                enableForgerPlugin: flags['enable-forger-plugin'],
                enableMonitorPlugin: flags['enable-monitor-plugin'],
                enableReportMisbehaviorPlugin: flags['enable-report-misbehavior-plugin'],
            });
            await app.run();
        }
        catch (errors) {
            this.error(Array.isArray(errors) ? errors.map(err => err.message).join(',') : errors);
        }
    }
}
exports.default = StartCommand;
StartCommand.description = 'Start Phaeton Core Node.';
StartCommand.examples = [
    'start',
    'start --network devnet --data-path /path/to/data-dir --log debug',
    'start --network devnet --api-ws',
    'start --network devnet --api-ws --api-ws-port 8888',
    'start --network devnet --port 9000',
    'start --network devnet --port 9002 --seed-peers 127.0.0.1:9001,127.0.0.1:9000',
    'start --network testnet --overwrite-config',
    'start --network testnet --config ~/my_custom_config.json',
];
StartCommand.flags = {
    'data-path': command_1.flags.string({
        ...flags_1.flags.dataPath,
        env: 'PHAETON_DATA_PATH',
    }),
    network: command_1.flags.string({
        ...flags_1.flags.network,
        env: 'PHAETON_NETWORK',
        default: constants_1.DEFAULT_NETWORK,
    }),
    config: command_1.flags.string({
        char: 'c',
        description: 'File path to a custom config. Environment variable "PHAETON_CONFIG_FILE" can also be used.',
        env: 'PHAETON_CONFIG_FILE',
    }),
    'overwrite-config': command_1.flags.boolean({
        description: 'Overwrite network configs if they exist already',
        default: false,
    }),
    port: command_1.flags.integer({
        char: 'p',
        description: 'Open port for the peer to peer incoming connections. Environment variable "PHAETON_PORT" can also be used.',
        env: 'PHAETON_PORT',
    }),
    'api-ipc': command_1.flags.boolean({
        description: 'Enable IPC communication. This will also load up plugins in child process and communicate over IPC.',
        default: false,
        exclusive: ['api-ws'],
    }),
    'api-ws': command_1.flags.boolean({
        description: 'Enable websocket communication for api-client.',
        default: false,
        exclusive: ['api-ipc'],
    }),
    'api-ws-port': command_1.flags.integer({
        description: 'Port to be used for api-client websocket.',
        env: 'PHAETON_API_WS_PORT',
        dependsOn: ['api-ws'],
    }),
    'console-log': command_1.flags.string({
        description: 'Console log level. Environment variable "PHAETON_CONSOLE_LOG_LEVEL" can also be used.',
        env: 'PHAETON_CONSOLE_LOG_LEVEL',
        options: LOG_OPTIONS,
    }),
    log: command_1.flags.string({
        char: 'l',
        description: 'File log level. Environment variable "PHAETON_FILE_LOG_LEVEL" can also be used.',
        env: 'PHAETON_FILE_LOG_LEVEL',
        options: LOG_OPTIONS,
    }),
    'seed-peers': command_1.flags.string({
        env: 'PHAETON_SEED_PEERS',
        description: 'Seed peers to initially connect to in format of comma separated "ip:port". IP can be DNS name or IPV4 format. Environment variable "PHAETON_SEED_PEERS" can also be used.',
    }),
    'enable-http-api-plugin': command_1.flags.boolean({
        description: 'Enable HTTP API Plugin. Environment variable "PHAETON_ENABLE_HTTP_API_PLUGIN" can also be used.',
        env: 'PHAETON_ENABLE_HTTP_API_PLUGIN',
        default: false,
    }),
    'http-api-plugin-port': command_1.flags.integer({
        description: 'Port to be used for HTTP API Plugin. Environment variable "PHAETON_HTTP_API_PLUGIN_PORT" can also be used.',
        env: 'PHAETON_HTTP_API_PLUGIN_PORT',
        dependsOn: ['enable-http-api-plugin'],
    }),
    'http-api-plugin-whitelist': command_1.flags.string({
        description: 'List of IPs in comma separated value to allow the connection. Environment variable "PHAETON_HTTP_API_PLUGIN_WHITELIST" can also be used.',
        env: 'PHAETON_HTTP_API_PLUGIN_WHITELIST',
        dependsOn: ['enable-http-api-plugin'],
    }),
    'enable-forger-plugin': command_1.flags.boolean({
        description: 'Enable Forger Plugin. Environment variable "PHAETON_ENABLE_FORGER_PLUGIN" can also be used.',
        env: 'PHAETON_ENABLE_FORGER_PLUGIN',
        default: false,
    }),
    'enable-monitor-plugin': command_1.flags.boolean({
        description: 'Enable Monitor Plugin. Environment variable "PHAETON_ENABLE_MONITOR_PLUGIN" can also be used.',
        env: 'PHAETON_ENABLE_MONITOR_PLUGIN',
        default: false,
    }),
    'monitor-plugin-port': command_1.flags.integer({
        description: 'Port to be used for Monitor Plugin. Environment variable "PHAETON_MONITOR_PLUGIN_PORT" can also be used.',
        env: 'PHAETON_MONITOR_PLUGIN_PORT',
        dependsOn: ['enable-monitor-plugin'],
    }),
    'monitor-plugin-whitelist': command_1.flags.string({
        description: 'List of IPs in comma separated value to allow the connection. Environment variable "PHAETON_MONITOR_PLUGIN_WHITELIST" can also be used.',
        env: 'PHAETON_MONITOR_PLUGIN_WHITELIST',
        dependsOn: ['enable-monitor-plugin'],
    }),
    'enable-report-misbehavior-plugin': command_1.flags.boolean({
        description: 'Enable ReportMisbehavior Plugin. Environment variable "PHAETON_ENABLE_REPORT_MISBEHAVIOR_PLUGIN" can also be used.',
        env: 'PHAETON_ENABLE_MONITOR_PLUGIN',
        default: false,
    }),
};
//# sourceMappingURL=start.js.map