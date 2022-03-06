import { Command, flags as flagParser } from '@oclif/command';
export default class DownloadCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        network: flagParser.IOptionFlag<string>;
        output: flagParser.IOptionFlag<string | undefined>;
        url: flagParser.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
