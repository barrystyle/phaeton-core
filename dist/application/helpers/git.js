"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastCommitId = void 0;
const childProcess = require("child_process");
const fs = require("fs");
const getLastCommitIdFromGit = () => {
    const spawn = childProcess.spawnSync('git', ['rev-parse', 'HEAD']);
    if (!spawn.stderr.toString().trim()) {
        return spawn.stdout.toString().trim();
    }
    return '';
};
const getLastCommitIdFromRevisionFile = () => {
    try {
        return fs.readFileSync('REVISION').toString().trim();
    }
    catch (error) {
        throw new Error('REVISION file not found.');
    }
};
const getLastCommitId = () => {
    let lastCommitId = getLastCommitIdFromGit();
    if (!lastCommitId) {
        lastCommitId = getLastCommitIdFromRevisionFile();
    }
    return lastCommitId;
};
exports.getLastCommitId = getLastCommitId;
//# sourceMappingURL=git.js.map