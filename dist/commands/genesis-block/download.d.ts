import { Command, flags as flagParser } from '@oclif/command';
export default class DownloadCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        'data-path': flagParser.IOptionFlag<string | undefined>;
        network: flagParser.IOptionFlag<string | undefined>;
        url: flagParser.IOptionFlag<string | undefined>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
