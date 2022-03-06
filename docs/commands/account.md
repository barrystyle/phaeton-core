`phaeton-core account`
======================

Commands relating to Phaeton Core accounts.

* [`phaeton-core account:create`](#phaeton-core-accountcreate)
* [`phaeton-core account:get ADDRESS`](#phaeton-core-accountget-address)
* [`phaeton-core account:show`](#phaeton-core-accountshow)
* [`phaeton-core account:validate ADDRESS`](#phaeton-core-accountvalidate-address)

## `phaeton-core account:create`

Return randomly-generated mnemonic passphrase with its corresponding public/private key pair and Phaeton address.

```
USAGE
  $ phaeton-core account:create

OPTIONS
  -c, --count=count  [default: 1] Number of accounts to create.

EXAMPLES
  account:create
  account:create --count=3
```

_See code: [dist/commands/account/create.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/account/create.ts)_

## `phaeton-core account:get ADDRESS`

Get account information for a given address.

```
USAGE
  $ phaeton-core account:get ADDRESS

ARGUMENTS
  ADDRESS  Address of an account in a hex format.

OPTIONS
  -d, --data-path=data-path  Directory path to specify where node data is stored. Environment variable
                             "PHAETON_DATA_PATH" can also be used.

  --pretty                   Prints JSON in pretty format rather than condensed.

EXAMPLE
  account:get ab0041a7d3f7b2c290b5b834d46bdc7b7eb85815
```

_See code: [dist/commands/account/get.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/account/get.ts)_

## `phaeton-core account:show`

Show account information for a given passphrase.

```
USAGE
  $ phaeton-core account:show

OPTIONS
  -p, --passphrase=passphrase  Specifies a source for your secret passphrase. Command will prompt you for input if this
                               option is not set.
                               Examples:
                               - --passphrase='my secret passphrase' (should only be used where security is not
                               important)

EXAMPLE
  account:show
```

_See code: [dist/commands/account/show.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/account/show.ts)_

## `phaeton-core account:validate ADDRESS`

Validate base32 address.

```
USAGE
  $ phaeton-core account:validate ADDRESS

ARGUMENTS
  ADDRESS  Address in base32 format to validate.

EXAMPLE
  account:validate phaeoaknq582o6fw7sp82bm2hnj7pzp47mpmbmux2g
```

_See code: [dist/commands/account/validate.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/account/validate.ts)_
