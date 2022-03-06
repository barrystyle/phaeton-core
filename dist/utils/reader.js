"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetFromPrompt = exports.prepareQuestions = exports.transformNestedAsset = exports.transformAsset = exports.getPassphraseFromPrompt = exports.getPasswordFromPrompt = void 0;
const phaeton_sdk_1 = require("phaeton-sdk");
const inquirer = require("inquirer");
const error_1 = require("./error");
const capitalise = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
const getPromptVerificationFailError = (displayName) => `${capitalise(displayName)} was not successfully repeated.`;
const getPasswordFromPrompt = async (displayName = 'password', shouldConfirm = false) => {
    const questions = [
        {
            type: 'password',
            name: 'password',
            message: `Please enter ${displayName}: `,
        },
    ];
    if (shouldConfirm) {
        questions.push({
            type: 'password',
            name: 'passwordRepeat',
            message: `Please re-enter ${displayName}: `,
        });
    }
    const { password, passwordRepeat } = await inquirer.prompt(questions);
    if (!password || (shouldConfirm && password !== passwordRepeat)) {
        throw new error_1.ValidationError(getPromptVerificationFailError(displayName));
    }
    return password;
};
exports.getPasswordFromPrompt = getPasswordFromPrompt;
const getPassphraseFromPrompt = async (displayName = 'passphrase', shouldConfirm = false) => {
    const questions = [
        {
            type: 'password',
            name: 'passphrase',
            message: `Please enter ${displayName}: `,
        },
    ];
    if (shouldConfirm) {
        questions.push({
            type: 'password',
            name: 'passphraseRepeat',
            message: `Please re-enter ${displayName}: `,
        });
    }
    const { passphrase, passphraseRepeat } = await inquirer.prompt(questions);
    if (!passphrase || (shouldConfirm && passphrase !== passphraseRepeat)) {
        throw new error_1.ValidationError(getPromptVerificationFailError(displayName));
    }
    const passphraseErrors = [passphrase]
        .filter(Boolean)
        .map(pass => phaeton_sdk_1.passphrase.validation
        .getPassphraseValidationErrors(pass)
        .filter((error) => error.message));
    passphraseErrors.forEach(errors => {
        if (errors.length > 0) {
            const passphraseWarning = errors
                .filter((error) => error.code !== 'INVALID_MNEMONIC')
                .reduce((accumulator, error) => accumulator.concat(`${error.message.replace(' Please check the passphrase.', '')} `), 'Warning: ');
            console.warn(passphraseWarning);
        }
    });
    return passphrase;
};
exports.getPassphraseFromPrompt = getPassphraseFromPrompt;
const getNestedPropertyTemplate = (schema) => {
    const keyValEntries = Object.entries(schema.properties);
    const template = {};
    for (let i = 0; i < keyValEntries.length; i += 1) {
        const [schemaPropertyName, schemaPropertyValue] = keyValEntries[i];
        if (schemaPropertyValue.type === 'array') {
            if (schemaPropertyValue.items.type === 'object') {
                template[schemaPropertyName] = Object.keys(schemaPropertyValue.items.properties);
            }
        }
    }
    return template;
};
const castValue = (strVal, schemaType) => {
    if (schemaType === 'object') {
        return JSON.parse(strVal);
    }
    return Number.isInteger(Number(strVal)) ? Number(strVal) : strVal;
};
const transformAsset = (schema, data) => {
    const propertySchema = Object.values(schema.properties);
    return Object.entries(data).reduce((acc, curr, index) => {
        const schemaType = propertySchema[index].type;
        acc[curr[0]] = schemaType === 'array' ? curr[1].split(',') : castValue(curr[1], schemaType);
        return acc;
    }, {});
};
exports.transformAsset = transformAsset;
const transformNestedAsset = (schema, data) => {
    const template = getNestedPropertyTemplate(schema);
    const result = {};
    const items = [];
    for (const assetData of data) {
        const [[key, val]] = Object.entries(assetData);
        const templateValues = template[key];
        const valObject = val.split(',').reduce((acc, curr, index) => {
            acc[templateValues[index]] = Number.isInteger(Number(curr)) ? Number(curr) : curr;
            return acc;
        }, {});
        items.push(valObject);
        result[key] = items;
    }
    return result;
};
exports.transformNestedAsset = transformNestedAsset;
const prepareQuestions = (schema) => {
    const keyValEntries = Object.entries(schema.properties);
    const questions = [];
    for (const [schemaPropertyName, schemaPropertyValue] of keyValEntries) {
        if (schemaPropertyValue.type === 'array') {
            let commaSeparatedKeys = [];
            if (schemaPropertyValue.items.type === 'object') {
                commaSeparatedKeys = Object.keys(schemaPropertyValue.items.properties);
            }
            questions.push({
                type: 'input',
                name: schemaPropertyName,
                message: `Please enter: ${schemaPropertyName}(${commaSeparatedKeys.length ? commaSeparatedKeys.join(', ') : 'comma separated values (a,b)'}): `,
            });
            if (schemaPropertyValue.items.type === 'object') {
                questions.push({
                    type: 'confirm',
                    name: 'askAgain',
                    message: `Want to enter another ${schemaPropertyName}(${commaSeparatedKeys.join(', ')})`,
                });
            }
        }
        else {
            questions.push({
                type: 'input',
                name: schemaPropertyName,
                message: `Please enter: ${schemaPropertyName}: `,
            });
        }
    }
    return questions;
};
exports.prepareQuestions = prepareQuestions;
const getAssetFromPrompt = async (assetSchema, output = []) => {
    const questions = exports.prepareQuestions(assetSchema);
    let isTypeConfirm = false;
    const result = await inquirer.prompt(questions).then(async (answer) => {
        isTypeConfirm = typeof answer.askAgain === 'boolean';
        if (answer.askAgain) {
            output.push(answer);
            return exports.getAssetFromPrompt(assetSchema, output);
        }
        output.push(answer);
        return Promise.resolve(answer);
    });
    const filteredResult = output.map(({ askAgain, ...assetProps }) => assetProps);
    return isTypeConfirm
        ? exports.transformNestedAsset(assetSchema, filteredResult)
        : exports.transformAsset(assetSchema, result);
};
exports.getAssetFromPrompt = getAssetFromPrompt;
//# sourceMappingURL=reader.js.map