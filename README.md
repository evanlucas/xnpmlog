# xnpmlog
[![Build Status](https://circleci.com/gh/GAWMiners/xnpmlog.png?circle-token=c10da093071aea746ba068d9108b6161023378fe)](https://circleci.com/gh/GAWMiners/xnpmlog)

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
