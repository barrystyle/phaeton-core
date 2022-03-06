`phaeton-core hash-onion`
=========================

Create hash onions to be used by the forger.

* [`phaeton-core hash-onion`](#phaeton-core-hash-onion)

## `phaeton-core hash-onion`

Create hash onions to be used by the forger.

```
USAGE
  $ phaeton-core hash-onion

OPTIONS
  -c, --count=count        [default: 1000000] Total number of hashes to produce
  -d, --distance=distance  [default: 1000] Distance between each hashes
  -o, --output=output      Output file path
  --pretty                 Prints JSON in pretty format rather than condensed.

EXAMPLES
  hash-onion --count=1000000 --distance=2000 --pretty
  hash-onion --count=1000000 --distance=2000 --output ~/my_onion.json
```

_See code: [dist/commands/hash-onion.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/hash-onion.ts)_
