import { flags as flagParser } from '@oclif/command';
import BaseIPCCommand from './base_ipc';
export declare class BaseForgingCommand extends BaseIPCCommand {
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static flags: {
        password: flagParser.IOptionFlag<string | undefined>;
        overwrite: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'data-path': flagParser.IOptionFlag<string | undefined>;
        offline: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        network: flagParser.IOptionFlag<string>;
    };
    protected forging: boolean;
    run(): Promise<void>;
}
