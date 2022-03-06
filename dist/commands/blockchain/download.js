"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const constants_1 = require("../../constants");
const commons_1 = require("../../utils/commons");
const path_1 = require("../../utils/path");
const download_1 = require("../../utils/download");
const flags_1 = require("../../utils/flags");
class DownloadCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(DownloadCommand);
        const network = flags.network ? flags.network : constants_1.DEFAULT_NETWORK;
        const url = flags.url ? flags.url : commons_1.phaetonSnapshotUrl(constants_1.SNAPSHOT_URL, network);
        const dataPath = flags.output ? flags.output : process.cwd();
        this.log(`Downloading snapshot from ${url} to ${path_1.getFullPath(dataPath)}`);
        try {
            await download_1.downloadAndValidate(url, dataPath);
            const checksum = download_1.getChecksum(url, dataPath);
            this.log(`Downloaded to path: ${dataPath}.`);
            this.log(`Verified checksum: ${checksum}.`);
        }
        catch (errors) {
            this.error(Array.isArray(errors) ? errors.map(err => err.message).join(',') : errors);
        }
    }
}
exports.default = DownloadCommand;
DownloadCommand.description = 'Download snapshot from <URL>.';
DownloadCommand.examples = [
    'download',
    'download --network betanet',
    'download --url https://snapshots.phaeton.io/mainnet/blockchain.db.tar.gz --output ./downloads',
];
DownloadCommand.flags = {
    network: command_1.flags.string({
        ...flags_1.flags.network,
        env: 'PHAETON_NETWORK',
        default: constants_1.DEFAULT_NETWORK,
    }),
    output: command_1.flags.string({
        char: 'o',
        description: 'Directory path to specify where snapshot is downloaded. By default outputs the files to current working directory.',
    }),
    url: command_1.flags.string({
        char: 'u',
        description: 'The url to the snapshot.',
    }),
};
//# sourceMappingURL=download.js.map