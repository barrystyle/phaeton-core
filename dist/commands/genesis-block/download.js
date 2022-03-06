"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const fs = require("fs-extra");
const path_1 = require("path");
const constants_1 = require("../../constants");
const download_1 = require("../../utils/download");
const flags_1 = require("../../utils/flags");
const path_2 = require("../../utils/path");
const commons_1 = require("../../utils/commons");
class DownloadCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(DownloadCommand);
        const { url, network, 'data-path': dataPath, force } = flags;
        if (!url && !network) {
            this.error('Please provide either url or network to download the genesis block.');
        }
        const customUrl = !!flags.url;
        const downloadUrl = url !== null && url !== void 0 ? url : commons_1.phaetonGenesisBlockUrl(constants_1.DOWNLOAD_URL, network);
        let genesisBlockPath;
        if (network && dataPath) {
            genesisBlockPath = path_2.getNetworkConfigFilesPath(dataPath, network).genesisBlockFilePath;
        }
        else if (network) {
            genesisBlockPath = path_2.getNetworkConfigFilesPath(path_2.getDefaultPath(), network).genesisBlockFilePath;
        }
        else if (dataPath) {
            genesisBlockPath = path_2.getNetworkConfigFilesPath(dataPath, constants_1.DEFAULT_NETWORK).genesisBlockFilePath;
        }
        else {
            genesisBlockPath = path_1.join(process.cwd(), 'genesis_block.json');
        }
        if (fs.existsSync(genesisBlockPath) && !force) {
            this.error(`The genesis block file already exists at ${genesisBlockPath}. Use --force to override.`);
        }
        const downloadDir = path_1.dirname(genesisBlockPath);
        const { fileName, filePath } = download_1.getDownloadedFileInfo(downloadUrl, downloadDir);
        this.log(`Downloading genesis block from ${downloadUrl}`);
        if (customUrl) {
            await download_1.download(downloadUrl, downloadDir);
            this.log(`Downloaded to path: ${filePath}.`);
        }
        else {
            await download_1.downloadAndValidate(downloadUrl, downloadDir);
            const checksum = download_1.getChecksum(downloadUrl, downloadDir);
            this.log(`Downloaded to path: ${filePath}.`);
            this.log(`Verified checksum: ${checksum}.`);
        }
        if (fs.existsSync(genesisBlockPath) && force) {
            this.log(`Removing existing genesis block at ${genesisBlockPath}`);
            fs.unlinkSync(genesisBlockPath);
        }
        this.log('Extracting genesis block file.');
        await download_1.extract(downloadDir, fileName, downloadDir, 0);
        this.log('Removing downloaded genesis block');
        fs.unlinkSync(filePath);
        this.log('Download completed.');
        this.log(`   ${genesisBlockPath}`);
    }
}
exports.default = DownloadCommand;
DownloadCommand.description = 'Download genesis block.';
DownloadCommand.examples = [
    'genesis-block:download --network mainnet -f',
    'genesis-block:download --network --data-path ./phaeton/',
    'genesis-block:download --url http://mydomain.com/genesis_block.json.gz --data-path ./phaeton/ --force',
];
DownloadCommand.flags = {
    'data-path': command_1.flags.string(flags_1.flags.dataPath),
    network: command_1.flags.string({
        ...flags_1.flags.network,
        env: 'PHAETON_NETWORK',
    }),
    url: command_1.flags.string({
        char: 'u',
        description: 'The url to the genesis block.',
    }),
    force: command_1.flags.boolean({
        char: 'f',
        description: 'Delete and overwrite existing blockchain data',
        default: false,
    }),
};
//# sourceMappingURL=download.js.map