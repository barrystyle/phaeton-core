"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.FileSystemError = void 0;
class FileSystemError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'FileSystemError';
    }
}
exports.FileSystemError = FileSystemError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=error.js.map