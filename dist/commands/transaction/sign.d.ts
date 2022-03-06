import { flags as flagParser } from '@oclif/command';
import BaseIPCCommand from '../../base_ipc';
export default class SignCommand extends BaseIPCCommand {
    static description: string;
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static flags: {
        passphrase: flagParser.IOptionFlag<string | undefined>;
        'include-sender': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'mandatory-keys': flagParser.IOptionFlag<string[]>;
        'optional-keys': flagParser.IOptionFlag<string[]>;
        'network-identifier': flagParser.IOptionFlag<string | undefined>;
        json: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'sender-public-key': flagParser.IOptionFlag<string | undefined>;
        offline: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        network: flagParser.IOptionFlag<string>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'data-path': flagParser.IOptionFlag<string | undefined>;
    };
    static examples: string[];
    run(): Promise<void>;
}
