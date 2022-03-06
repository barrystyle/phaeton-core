`phaeton-core forging`
======================

Commands relating to Phaeton Core forging.

* [`phaeton-core forging:config`](#phaeton-core-forgingconfig)
* [`phaeton-core forging:disable ADDRESS`](#phaeton-core-forgingdisable-address)
* [`phaeton-core forging:enable ADDRESS HEIGHT MAXHEIGHTPREVIOUSLYFORGED MAXHEIGHTPREVOTED`](#phaeton-core-forgingenable-address-height-maxheightpreviouslyforged-maxheightprevoted)
* [`phaeton-core forging:status`](#phaeton-core-forgingstatus)

## `phaeton-core forging:config`

Generate delegate forging config for given passphrase and password.

```
USAGE
  $ phaeton-core forging:config

OPTIONS
  -c, --count=count            [default: 1000000] Total number of hashes to produce
  -d, --distance=distance      [default: 1000] Distance between each hashes
  -o, --output=output          Output file path

  -p, --passphrase=passphrase  Specifies a source for your secret passphrase. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --passphrase='my secret passphrase' (should only be used where security is not
                               important)

  -w, --password=password      Specifies a source for your secret password. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --password=pass:password123 (should only be used where security is not important)

  --pretty                     Prints JSON in pretty format rather than condensed.

EXAMPLES
  forging:config
  forging:config --password your_password
  forging:config --passphrase your_passphrase --password your_password --pretty
  forging:config --count=1000000 --distance=2000 --output /tmp/forging_config.json
```

_See code: [dist/commands/forging/config.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/forging/config.ts)_

## `phaeton-core forging:disable ADDRESS`

Disable forging for given delegate address.

```
USAGE
  $ phaeton-core forging:disable ADDRESS

ARGUMENTS
  ADDRESS  Address of an account in a base32 format.

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -w, --password=password    Specifies a source for your secret password. Command will prompt you for input if this
                             option is not set.
                             Examples:
                             - --password=pass:password123 (should only be used where security is not important)

  --overwrite                Overwrites the forger info

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815
  forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 --data-path ./data
  forging:disable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 --data-path ./data --password your_password
```

_See code: [dist/commands/forging/disable.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/forging/disable.ts)_

## `phaeton-core forging:enable ADDRESS HEIGHT MAXHEIGHTPREVIOUSLYFORGED MAXHEIGHTPREVOTED`

Enable forging for given delegate address.

```
USAGE
  $ phaeton-core forging:enable ADDRESS HEIGHT MAXHEIGHTPREVIOUSLYFORGED MAXHEIGHTPREVOTED

ARGUMENTS
  ADDRESS                    Address of an account in a base32 format.
  HEIGHT                     Last forged block height.
  MAXHEIGHTPREVIOUSLYFORGED  Delegates largest previously forged height.
  MAXHEIGHTPREVOTED          Delegates largest prevoted height for a block.

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -w, --password=password    Specifies a source for your secret password. Command will prompt you for input if this
                             option is not set.
                             Examples:
                             - --password=pass:password123 (should only be used where security is not important)

  --overwrite                Overwrites the forger info

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10
  forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10 --overwrite
  forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10 --data-path ./data
  forging:enable ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815 100 100 10 --data-path ./data --password your_password
```

_See code: [dist/commands/forging/enable.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/forging/enable.ts)_

## `phaeton-core forging:status`

Get forging information for the locally running node.

```
USAGE
  $ phaeton-core forging:status

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  forging:status
  forging:status --data-path ./sample --pretty
```

_See code: [dist/commands/forging/status.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/forging/status.ts)_
