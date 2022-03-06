`phaeton-core blockchain`
=========================

Commands relating to Phaeton Core blockchain data.

* [`phaeton-core blockchain:download`](#phaeton-core-blockchaindownload)
* [`phaeton-core blockchain:export`](#phaeton-core-blockchainexport)
* [`phaeton-core blockchain:hash`](#phaeton-core-blockchainhash)
* [`phaeton-core blockchain:import FILEPATH`](#phaeton-core-blockchainimport-filepath)
* [`phaeton-core blockchain:reset`](#phaeton-core-blockchainreset)

## `phaeton-core blockchain:download`

Download snapshot from <URL>.

```
USAGE
  $ phaeton-core blockchain:download

OPTIONS
  -n, --network=network  [default: mainnet] Default network config to use. Environment variable "PHAETON_NETWORK" can
                         also be used.

  -o, --output=output    Directory path to specify where snapshot is downloaded. By default outputs the files to current
                         working directory.

  -u, --url=url          The url to the snapshot.

EXAMPLES
  download
  download --network betanet
  download --url https://snapshots.phaeton.io/mainnet/blockchain.db.tar.gz --output ./downloads
```

_See code: [dist/commands/blockchain/download.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/blockchain/download.ts)_

## `phaeton-core blockchain:export`

Export to <FILE>.

```
USAGE
  $ phaeton-core blockchain:export

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -o, --output=output        The output directory. Default will set to current working directory.

EXAMPLES
  blockchain:export
  blockchain:export --data-path ./data --output ./my/path/
```

_See code: [dist/commands/blockchain/export.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/blockchain/export.ts)_

## `phaeton-core blockchain:hash`

Generate SHA256 hash from <PATH>.

```
USAGE
  $ phaeton-core blockchain:hash

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

EXAMPLES
  blockchain:hash
  blockchain:hash --data-path ./data
```

_See code: [dist/commands/blockchain/hash.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/blockchain/hash.ts)_

## `phaeton-core blockchain:import FILEPATH`

Import from <FILE>.

```
USAGE
  $ phaeton-core blockchain:import FILEPATH

ARGUMENTS
  FILEPATH  Path to the gzipped blockchain data.

OPTIONS
  -d, --data-path=data-path  Specifies which data path the application should use. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -f, --force                Delete and overwrite existing blockchain data

EXAMPLES
  blockchain:import ./path/to/blockchain.db.tar.gz
  blockchain:import ./path/to/blockchain.db.tar.gz --data-path ./phaeton/
  blockchain:import ./path/to/blockchain.db.tar.gz --data-path ./phaeton/ --force
```

_See code: [dist/commands/blockchain/import.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/blockchain/import.ts)_

## `phaeton-core blockchain:reset`

Reset the blockchain data.

```
USAGE
  $ phaeton-core blockchain:reset

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -y, --yes                  Skip confirmation prompt.

EXAMPLES
  blockchain:reset
  blockchain:reset --data-path ./phaeton
  blockchain:reset --yes
```

_See code: [dist/commands/blockchain/reset.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/blockchain/reset.ts)_
