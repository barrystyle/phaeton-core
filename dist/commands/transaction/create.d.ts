import { flags as flagParser } from '@oclif/command';
import BaseIPCCommand from '../../base_ipc';
export default class CreateCommand extends BaseIPCCommand {
    static strict: boolean;
    static description: string;
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    static examples: string[];
    static flags: {
        'network-identifier': flagParser.IOptionFlag<string | undefined>;
        nonce: flagParser.IOptionFlag<string | undefined>;
        'no-signature': import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        passphrase: flagParser.IOptionFlag<string | undefined>;
        'sender-public-key': flagParser.IOptionFlag<string | undefined>;
        asset: flagParser.IOptionFlag<string | undefined>;
        json: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        offline: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        network: flagParser.IOptionFlag<string>;
        pretty: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        'data-path': flagParser.IOptionFlag<string | undefined>;
    };
    run(): Promise<void>;
}
