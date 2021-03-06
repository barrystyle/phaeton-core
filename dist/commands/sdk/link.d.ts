import { Command } from '@oclif/command';
export default class LinkCommand extends Command {
    static description: string;
    static examples: string[];
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    run(): Promise<void>;
}
