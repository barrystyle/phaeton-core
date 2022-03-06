import Command, { flags as flagParser } from '@oclif/command';
export default class DecryptCommand extends Command {
    static args: {
        name: string;
        description: string;
        required: boolean;
    }[];
    static description: string;
    static examples: string[];
    static flags: {
        password: flagParser.IOptionFlag<string | undefined>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
    printJSON(message?: Record<string, unknown>, pretty?: boolean): void;
}
