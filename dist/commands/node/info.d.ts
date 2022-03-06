import BaseIPCCommand from '../../base_ipc';
export default class InfoCommand extends BaseIPCCommand {
    static description: string;
    static examples: string[];
    static flags: {
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'data-path': import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        offline: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        network: import("@oclif/command/lib/flags").IOptionFlag<string>;
    };
    run(): Promise<void>;
}
