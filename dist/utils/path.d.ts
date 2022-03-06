import { PartialApplicationConfig } from 'phaeton-sdk';
export declare const getDefaultPath: () => string;
export declare const getFullPath: (dataPath: string) => string;
export declare const splitPath: (dataPath: string) => {
    rootPath: string;
    label: string;
};
export declare const getDefaultConfigDir: () => string;
export declare const getNetworkConfigFilesPath: (dataPath: string, network: string) => {
    genesisBlockFilePath: string;
    configFilePath: string;
};
export declare const getDefaultNetworkConfigFilesPath: (network: string) => {
    genesisBlockFilePath: string;
    configFilePath: string;
};
export declare const getConfigDirs: (dataPath: string) => string[];
export declare const getGenesisBlockAndConfig: (network: string) => Promise<{
    genesisBlock: Record<string, unknown>;
    config: PartialApplicationConfig;
}>;
export declare const removeConfigDir: (dataPath: string, network: string) => void;
export declare const ensureConfigDir: (dataPath: string, network: string) => void;
export declare const getBlockchainDBPath: (dataPath: string) => string;
export declare const getForgerDBPath: (dataPath: string) => string;
export declare const getPidPath: (dataPath: string) => string;
export interface SocketPaths {
    readonly pub: string;
    readonly sub: string;
    readonly rpc: string;
    readonly root: string;
}
export declare const getSocketsPath: (dataPath: string, network?: string) => SocketPaths;
