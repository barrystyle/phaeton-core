import { NETWORK } from '../constants';
export declare const phaetonGenesisBlockUrl: (url: string, network: NETWORK) => string;
export declare const phaetonSnapshotUrl: (url: string, network: NETWORK) => string;
export declare const encryptPassphrase: (passphrase: string, password: string, outputPublicKey: boolean) => Record<string, unknown>;
