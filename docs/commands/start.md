`phaeton-core start`
====================

Start Phaeton Core Node.

* [`phaeton-core start`](#phaeton-core-start)

## `phaeton-core start`

Start Phaeton Core Node.

```
USAGE
  $ phaeton-core start

OPTIONS
  -c, --config=config                                    File path to a custom config. Environment variable
                                                         "PHAETON_CONFIG_FILE" can also be used.

  -d, --data-path=data-path                              Directory path to specify where node data is stored.
                                                         Environment variable "PHAETON_DATA_PATH" can also be used.

  -l, --log=trace|debug|info|warn|error|fatal            File log level. Environment variable "PHAETON_FILE_LOG_LEVEL"
                                                         can also be used.

  -n, --network=network                                  [default: mainnet] Default network config to use. Environment
                                                         variable "PHAETON_NETWORK" can also be used.

  -p, --port=port                                        Open port for the peer to peer incoming connections.
                                                         Environment variable "PHAETON_PORT" can also be used.

  --api-ipc                                              Enable IPC communication. This will also load up plugins in
                                                         child process and communicate over IPC.

  --api-ws                                               Enable websocket communication for api-client.

  --api-ws-port=api-ws-port                              Port to be used for api-client websocket.

  --console-log=trace|debug|info|warn|error|fatal        Console log level. Environment variable
                                                         "PHAETON_CONSOLE_LOG_LEVEL" can also be used.

  --enable-forger-plugin                                 Enable Forger Plugin. Environment variable
                                                         "PHAETON_ENABLE_FORGER_PLUGIN" can also be used.

  --enable-http-api-plugin                               Enable HTTP API Plugin. Environment variable
                                                         "PHAETON_ENABLE_HTTP_API_PLUGIN" can also be used.

  --enable-monitor-plugin                                Enable Monitor Plugin. Environment variable
                                                         "PHAETON_ENABLE_MONITOR_PLUGIN" can also be used.

  --enable-report-misbehavior-plugin                     Enable ReportMisbehavior Plugin. Environment variable
                                                         "PHAETON_ENABLE_REPORT_MISBEHAVIOR_PLUGIN" can also be used.

  --http-api-plugin-port=http-api-plugin-port            Port to be used for HTTP API Plugin. Environment variable
                                                         "PHAETON_HTTP_API_PLUGIN_PORT" can also be used.

  --http-api-plugin-whitelist=http-api-plugin-whitelist  List of IPs in comma separated value to allow the connection.
                                                         Environment variable "PHAETON_HTTP_API_PLUGIN_WHITELIST" can
                                                         also be used.

  --monitor-plugin-port=monitor-plugin-port              Port to be used for Monitor Plugin. Environment variable
                                                         "PHAETON_MONITOR_PLUGIN_PORT" can also be used.

  --monitor-plugin-whitelist=monitor-plugin-whitelist    List of IPs in comma separated value to allow the connection.
                                                         Environment variable "PHAETON_MONITOR_PLUGIN_WHITELIST" can
                                                         also be used.

  --overwrite-config                                     Overwrite network configs if they exist already

  --seed-peers=seed-peers                                Seed peers to initially connect to in format of comma separated
                                                         "ip:port". IP can be DNS name or IPV4 format. Environment
                                                         variable "PHAETON_SEED_PEERS" can also be used.

EXAMPLES
  start
  start --network devnet --data-path /path/to/data-dir --log debug
  start --network devnet --api-ws
  start --network devnet --api-ws --api-ws-port 8888
  start --network devnet --port 9000
  start --network devnet --port 9002 --seed-peers 127.0.0.1:9001,127.0.0.1:9000
  start --network testnet --overwrite-config
  start --network testnet --config ~/my_custom_config.json
```

_See code: [dist/commands/start.ts](https://github.com/Phaeton-Blockchain/plaak-phaeton-core/blob/v0.0.9/dist/commands/start.ts)_
