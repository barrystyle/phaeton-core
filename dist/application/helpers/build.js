"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildVersion = void 0;
const fs = require("fs");
const path = require("path");
const getBuildVersion = () => {
    try {
        return fs.readFileSync(path.join(__dirname, '../../', '.build'), 'utf8').toString().trim();
    }
    catch (error) {
        throw new Error('.build file not found.');
    }
};
exports.getBuildVersion = getBuildVersion;
//# sourceMappingURL=build.js.map