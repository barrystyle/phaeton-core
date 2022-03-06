`phaeton-core node`
===================

Commands relating to Phaeton Core node.

* [`phaeton-core node:info`](#phaeton-core-nodeinfo)

## `phaeton-core node:info`

Get node information from a running application.

```
USAGE
  $ phaeton-core node:info

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  node:info
  node:info --data-path ./phaeton
```

_See code: [dist/commands/node/info.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/node/info.ts)_
