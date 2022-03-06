/// <reference types="node" />
import { Command, flags as flagParser } from '@oclif/command';
import { RegisteredSchema, apiClient } from 'phaeton-sdk';
import { PromiseResolvedType } from './types';
interface BaseIPCFlags {
    readonly 'data-path'?: string;
    readonly network: string;
    readonly offline?: boolean;
    readonly pretty?: boolean;
}
export interface Schema {
    readonly $id: string;
    readonly type: string;
    readonly properties: Record<string, unknown>;
}
export interface Codec {
    decodeAccount: (data: Buffer | string) => Record<string, unknown>;
    decodeBlock: (data: Buffer | string) => Record<string, unknown>;
    decodeTransaction: (data: Buffer | string) => Record<string, unknown>;
    encodeTransaction: (assetSchema: Schema, transactionObject: Record<string, unknown>) => string;
    transactionFromJSON: (assetSchema: Schema, transactionObject: Record<string, unknown>) => Record<string, unknown>;
    transactionToJSON: (assetSchema: Schema, transactionObject: Record<string, unknown>) => Record<string, unknown>;
}
export default abstract class BaseIPCCommand extends Command {
    static flags: {
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'data-path': flagParser.IOptionFlag<string | undefined>;
        offline: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        network: flagParser.IOptionFlag<string>;
    };
    baseIPCFlags: BaseIPCFlags;
    protected _client: PromiseResolvedType<ReturnType<typeof apiClient.createIPCClient>> | undefined;
    protected _schema: RegisteredSchema;
    finally(error?: Error | string): Promise<void>;
    init(): Promise<void>;
    printJSON(message?: unknown): void;
    protected getAssetSchema(moduleID: number, assetID: number): RegisteredSchema['transactionsAssets'][0];
    protected decodeTransaction(transactionHexStr: string): Record<string, unknown>;
    protected encodeTransaction(transaction: Record<string, unknown>): Buffer;
    protected transactionToJSON(transaction: Record<string, unknown>): Record<string, unknown>;
}
export {};
