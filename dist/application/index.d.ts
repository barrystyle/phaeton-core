import { Application, PartialApplicationConfig } from 'phaeton-sdk';
export interface Options {
    enableHTTPAPIPlugin: boolean;
    enableForgerPlugin: boolean;
    enableMonitorPlugin: boolean;
    enableReportMisbehaviorPlugin: boolean;
}
export declare const getApplication: (genesisBlock: Record<string, unknown>, config: PartialApplicationConfig, options: Options) => Application;
