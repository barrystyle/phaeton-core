import { Command, flags as flagParser } from '@oclif/command';
export default class CreateCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        count: flagParser.IOptionFlag<string>;
    };
    run(): Promise<void>;
}
