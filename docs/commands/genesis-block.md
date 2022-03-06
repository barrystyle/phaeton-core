`phaeton-core genesis-block`
============================

Download genesis block.

* [`phaeton-core genesis-block:download`](#phaeton-core-genesis-blockdownload)

## `phaeton-core genesis-block:download`

Download genesis block.

```
USAGE
  $ phaeton-core genesis-block:download

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -f, --force                Delete and overwrite existing blockchain data

  -n, --network=network      Default network config to use. Environment variable "PHAETON_NETWORK" can also be used.

  -u, --url=url              The url to the genesis block.

EXAMPLES
  genesis-block:download --network mainnet -f
  genesis-block:download --network --data-path ./phaeton/
  genesis-block:download --url http://mydomain.com/genesis_block.json.gz --data-path ./phaeton/ --force
```

_See code: [dist/commands/genesis-block/download.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/genesis-block/download.ts)_
