"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs = require("fs-extra");
const phaeton_sdk_1 = require("phaeton-sdk");
const path_1 = require("../../utils/path");
const flags_1 = require("../../utils/flags");
class ShowCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(ShowCommand);
        const dataPath = flags['data-path'] ? flags['data-path'] : path_1.getDefaultPath();
        const pathConfig = path_1.splitPath(dataPath);
        const configDir = path_1.getConfigDirs(dataPath);
        if (configDir.length !== 1) {
            this.error(`Folder in ${dataPath} does not contain valid config`);
        }
        const network = configDir[0];
        const { configFilePath } = path_1.getNetworkConfigFilesPath(dataPath, network);
        let config = await fs.readJSON(configFilePath);
        if (flags.config) {
            const customConfig = await fs.readJSON(flags.config);
            config = phaeton_sdk_1.utils.objects.mergeDeep({}, config, customConfig);
        }
        config.rootPath = pathConfig.rootPath;
        config.label = pathConfig.label;
        config.version = this.config.pjson.version;
        if (flags.pretty) {
            this.log(JSON.stringify(config, undefined, '  '));
        }
        else {
            this.log(JSON.stringify(config));
        }
    }
}
exports.default = ShowCommand;
ShowCommand.description = 'Show application config.';
ShowCommand.examples = [
    'config:show',
    'config:show --pretty',
    'config:show --config ./custom-config.json --data-path ./data',
];
ShowCommand.flags = {
    'data-path': command_1.flags.string({
        ...flags_1.flags.dataPath,
        env: 'PHAETON_DATA_PATH',
    }),
    config: command_1.flags.string({
        char: 'c',
        description: 'File path to a custom config. Environment variable "PHAETON_CONFIG_FILE" can also be used.',
        env: 'PHAETON_CONFIG_FILE',
    }),
    pretty: command_1.flags.boolean({
        description: 'Prints JSON in pretty format rather than condensed.',
    }),
};
//# sourceMappingURL=show.js.map