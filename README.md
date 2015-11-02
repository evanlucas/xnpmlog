# xnpmlog

[![Build Status](https://travis-ci.org/evanlucas/xnpmlog.svg)](https://travis-ci.org/evanlucas/xnpmlog)
[![Coverage Status](http://coveralls.io/repos/evanlucas/xnpmlog/badge.svg?branch=master&service=github)](http://coveralls.io/github/evanlucas/xnpmlog?branch=master)

[npmlog](https://github.com/npm/npmlog) with the ability to create child loggers

xnpmlog only works on iojs and node v4+. To use xnpmlog with node 0.10 or 0.12,
install `xnpmlog@1`.

### Author
Evan Lucas

### License
MIT

## Installation
```bash
$ npm install --save xnpmlog
```

## Tests
```bash
$ npm test
```

## Coverage
```bash
$ npm run cover
```

## API

### Logger

Constructor

_opts_ can contain:

| Name | Type | Description |
| ---- | ---- | ----------- |
| loglevel | String | Set the log level (info) |
| prefixStyle | Object | Set prefix style ({ fg: 'magenta' }) |
| headingStyle | Object | Set heading style ({ fg: 'white', bg: 'black' }) |
| stream | Stream | The stream (process.stderr) |
| timestamp | Boolean | Include timestamp in logs (true) |
| heading | String | The log heading ('') |

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| component | String | The component |
| opts | Object | The opts |


***

### Logger.createLogger()

Creates a logger

Example

```js
var Logger = require('xnpmlog')
var log = Logger.createLogger('test')
```

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| comp | String | The component |
| opts | Object | The opts |


***

### Logger.child()

Creates a child logger

Example

```js
var logger = require('xnpmlog')('app')
var log = logger.child('users-controller')
```

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| comp | String | The component |
| opts | Object | The opts |


***

### Logger.pause()

Pauses the log stream



***

### Logger.resume()

Resumes the log stream



***

### Logger.rmLevel()

Removes the given log _level_

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| level | String | The log level to remove |


***

### Logger.addLevel()

Adds a new log level

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| level | String | The log level |
| n | Number | The numeric level |
| style | Object | The ansi style object |
| disp | String | Optional replacement for _level_ in the output |


***
