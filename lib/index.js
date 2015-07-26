var log = require('npmlog')
  , util = require('util')

log.addLevel('trace', 500, { fg: 'brightCyan' }, 'trac')
log.addLevel('verbose', 1000, { fg: 'brightBlue' }, 'verb')
log.addLevel('info', 2000, { fg: 'brightGreen' }, 'info')
log.addLevel('warn', 4000, { fg: 'brightYellow', bg: null }, 'warn')
log.addLevel('error', 5000, { fg: 'brightRed' }, 'ERR!')

var defaults = {
  prefixStyle: log.prefixStyle
, headingStyle: log.headingStyle
, loglevel: log.level
, stream: process.stderr
, timestamp: true
, heading: ''
}

var defaultLevels = [
  'silly'
, 'trace'
, 'verbose'
, 'info'
, 'http'
, 'warn'
, 'error'
, 'silent'
]

module.exports = Logger

/**
 * Constructor
 *
 * _opts_ can contain:
 *
 * | Name | Type | Description |
 * | ---- | ---- | ----------- |
 * | loglevel | String | Set the log level (info) |
 * | prefixStyle | Object | Set prefix style ({ fg: 'magenta' }) |
 * | headingStyle | Object | Set heading style ({ fg: 'white', bg: 'black' }) |
 * | stream | Stream | The stream (process.stderr) |
 * | timestamp | Boolean | Include timestamp in logs (true) |
 * | heading | String | The log heading |
 *
 * @param {String} component The component
 * @param {Object} opts The opts
 * @api public
 */
function Logger(component, opts) {
  if (!(this instanceof Logger))
    return new Logger(component, opts)

  if (!component) component = 'app'
  this.component = component
  this.log = log
  opts = opts || {}
  if (opts.hasOwnProperty('timestamps'))
    opts.timestamp = opts.timestamps
  this.opts = util._extend(defaults, opts)
  this.log.level = this.opts.level || this.opts.loglevel
  this.log.prefixStyle = this.opts.prefixStyle
  this.log.headingStyle = this.opts.headingStyle
  this.log.stream = this.opts.stream
  this.timestamp = this.opts.timestamp
  this.heading = this.opts.heading
  this.log.heading = this.heading
  defaultLevels.forEach(function(l) {
    this[l] = function() {
      var args = Array.prototype.slice.call(arguments)
      this.write(l, args)
    }.bind(this)
  }.bind(this))
}

/**
 * Creates a logger
 *
 * Example
 *
 * ```js
 * var Logger = require('xnpmlog')
 * var log = Logger.createLogger('test')
 * ```
 *
 * @param {String} comp The component
 * @param {Object} opts The opts
 * @api public
 */
Logger.createLogger = function(comp, opts) {
  return new Logger(comp, opts)
}

/**
 * Creates a child logger
 *
 * Example
 *
 * ```js
 * var logger = require('xnpmlog')('app')
 * var log = logger.child('users-controller')
 * ```
 *
 * @param {String} comp The component
 * @param {Object} opts The opts
 * @api public
 */
Logger.prototype.child = function(comp, opts) {
  opts = opts || {}
  opts.heading = opts.heading || this.heading
  return new Logger(comp, opts)
}

/**
 * Pauses the log stream
 *
 * @api public
 */
Logger.prototype.pause = function() {
  this.log.pause()
}

/**
 * Resumes the log stream
 *
 * @api public
 */
Logger.prototype.resume = function() {
  this.log.resume()
}

/**
 * Removes the given log _level_
 *
 * @param {String} level The log level to remove
 * @api public
 */
Logger.prototype.rmLevel = function(level) {
  delete this.log.levels[level]
  delete this.log.style[level]
  delete this.log[level]
  delete this.log.disp[level]
  delete this[level]
}

/**
 * Adds a new log level
 *
 * @param {String} level The log level
 * @param {Number} n The numeric level
 * @param {Object} style The ansi style object
 * @param {String} disp Optional replacement for _level_ in the output
 * @api public
 */
Logger.prototype.addLevel = function(level, n, style, disp) {
  this.log.addLevel(level, n, style, disp)
  this[level] = function() {
    var args = Array.prototype.slice.call(arguments)
    this.write(level, args)
  }.bind(this)
}

Logger.prototype.write = function(level, args) {
  if (this.timestamp) args = [[timestamp(), this.component].join(' ')].concat(args)
  else args = [this.component].concat(args)
  this.log[level].apply(this.log, args)
}

// The following were taken straight from node core (lib/utils.js)
function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10)
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec']

function timestamp() {
  var d = new Date()
  var time = [ pad(d.getHours())
             , pad(d.getMinutes())
             , pad(d.getSeconds())
             ].join(':')
  return [d.getDate(), months[d.getMonth()], time].join(' ')
}
