import { Command, flags as flagParser } from '@oclif/command';
export default class ShowCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        passphrase: flagParser.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
