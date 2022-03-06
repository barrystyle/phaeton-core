import { Schema } from '../base_ipc';
interface Question {
    readonly [key: string]: unknown;
}
export declare const getPasswordFromPrompt: (displayName?: string, shouldConfirm?: boolean) => Promise<string>;
export declare const getPassphraseFromPrompt: (displayName?: string, shouldConfirm?: boolean) => Promise<string>;
interface NestedAsset {
    [key: string]: Array<Record<string, string>>;
}
export declare const transformAsset: (schema: Schema, data: Record<string, string>) => Record<string, string>;
export declare const transformNestedAsset: (schema: Schema, data: Array<Record<string, string>>) => NestedAsset;
export declare const prepareQuestions: (schema: Schema) => Question[];
export declare const getAssetFromPrompt: (assetSchema: Schema, output?: {
    [key: string]: string;
}[]) => Promise<NestedAsset | Record<string, unknown>>;
export {};
