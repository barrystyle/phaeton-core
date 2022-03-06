`phaeton-core forger-info`
==========================

Commands relating to Phaeton Core forger-info data.

* [`phaeton-core forger-info:export`](#phaeton-core-forger-infoexport)
* [`phaeton-core forger-info:import SOURCEPATH`](#phaeton-core-forger-infoimport-sourcepath)

## `phaeton-core forger-info:export`

Export to <FILE>.

```
USAGE
  $ phaeton-core forger-info:export

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -o, --output=output        The output directory. Default will set to current working directory.

EXAMPLES
  forger-info:export
  forger-info:export --data-path ./data --output ./my/path/
```

_See code: [dist/commands/forger-info/export.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/forger-info/export.ts)_

## `phaeton-core forger-info:import SOURCEPATH`

Import from <FILE>.

```
USAGE
  $ phaeton-core forger-info:import SOURCEPATH

ARGUMENTS
  SOURCEPATH  Path to the forger-info zip file that you want to import.

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  -f, --force                To overwrite the existing data if present.

EXAMPLES
  forger-info:import ./my/path
  forger-info:import --data-path ./data --force
```

_See code: [dist/commands/forger-info/import.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/forger-info/import.ts)_
