import { Command, flags as flagParser } from '@oclif/command';
export default class StartCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        'data-path': flagParser.IOptionFlag<string | undefined>;
        network: flagParser.IOptionFlag<string>;
        config: flagParser.IOptionFlag<string | undefined>;
        'overwrite-config': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        port: import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
        'api-ipc': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'api-ws': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'api-ws-port': import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
        'console-log': flagParser.IOptionFlag<string | undefined>;
        log: flagParser.IOptionFlag<string | undefined>;
        'seed-peers': flagParser.IOptionFlag<string | undefined>;
        'enable-http-api-plugin': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'http-api-plugin-port': import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
        'http-api-plugin-whitelist': flagParser.IOptionFlag<string | undefined>;
        'enable-forger-plugin': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'enable-monitor-plugin': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'monitor-plugin-port': import("@oclif/parser/lib/flags").IOptionFlag<number | undefined>;
        'monitor-plugin-whitelist': flagParser.IOptionFlag<string | undefined>;
        'enable-report-misbehavior-plugin': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}
