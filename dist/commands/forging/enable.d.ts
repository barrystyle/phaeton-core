import { BaseForgingCommand } from '../../base_forging';
export default class EnableForgingCommand extends BaseForgingCommand {
    static description: string;
    static examples: string[];
    static flags: {
        password: import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        overwrite: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'data-path': import("@oclif/command/lib/flags").IOptionFlag<string | undefined>;
        offline: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        network: import("@oclif/command/lib/flags").IOptionFlag<string>;
    };
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    init(): Promise<void>;
}
