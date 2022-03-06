"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
class LinkCommand extends command_1.Command {
    async run() {
        const { args: { targetSDKFolder }, } = this.parse(LinkCommand);
        if (!fs_extra_1.pathExistsSync(targetSDKFolder)) {
            throw new Error(`Path '${targetSDKFolder}' does not exist or access denied.`);
        }
        const sdkLocalPath = path_1.join(__dirname, '../../../', 'node_modules', 'phaeton-sdk');
        const targetSDKFolderFromNodeModule = path_1.isAbsolute(targetSDKFolder)
            ? targetSDKFolder
            : path_1.join('../', targetSDKFolder);
        fs_extra_1.removeSync(sdkLocalPath);
        await fs_extra_1.symlink(targetSDKFolderFromNodeModule, sdkLocalPath);
        this.log(`Linked '${targetSDKFolder}' to '${sdkLocalPath}'.`);
    }
}
exports.default = LinkCommand;
LinkCommand.description = 'Symlink specific SDK folder during development.';
LinkCommand.examples = ['sdk:link /path/to/phaeton-sdk/sdk'];
LinkCommand.args = [
    { name: 'targetSDKFolder', required: true, description: 'The path to the phaeton SDK folder' },
];
//# sourceMappingURL=link.js.map