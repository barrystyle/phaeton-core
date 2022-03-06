`phaeton-core config`
=====================

Commands relating to Phaeton Core node configuration.

* [`phaeton-core config:show`](#phaeton-core-configshow)

## `phaeton-core config:show`

Show application config.

```
USAGE
  $ phaeton-core config:show

OPTIONS
  -c, --config=config        File path to a custom config. Environment variable "PHAETON_CONFIG_FILE" can also be used.

  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLES
  config:show
  config:show --pretty
  config:show --config ./custom-config.json --data-path ./data
```

_See code: [dist/commands/config/show.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/config/show.ts)_
