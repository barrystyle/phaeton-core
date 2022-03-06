import { Command, flags as flagParser } from '@oclif/command';
export default class ExportCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        'data-path': flagParser.IOptionFlag<string | undefined>;
        output: flagParser.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
