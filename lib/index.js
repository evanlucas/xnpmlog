var log = require('npmlog')
  , util = require('util')

log.addLevel('trace', 500, { fg: 'brightCyan' }, 'trac')

var defaults = {
  prefixStyle: log.prefixStyle
, headingStyle: log.headingStyle
, loglevel: log.level
, stream: process.stderr
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

function Logger(component, opts) {
  if (!(this instanceof Logger))
    return new Logger(component, opts)

  if (!component) component = 'app'
  this.component = component
  this.log = log
  this.opts = util._extend(defaults, opts)
  this.log.level = this.opts.loglevel
  this.log.prefixStyle = this.opts.prefixStyle
  this.log.headingStyle = this.opts.headingStyle
  this.log.stream = this.opts.stream
  defaultLevels.forEach(function(l) {
    this[l] = function() {
      var args = Array.prototype.slice.call(arguments)
      this.write(l, args)
    }.bind(this)
  }.bind(this))
}

Logger.createLogger = function(comp, opts) {
  return new Logger(comp, opts)
}

Logger.prototype.child = function(comp, opts) {
  return new Logger(comp, opts)
}

Logger.prototype.pause = function() {
  this.log.pause()
}

Logger.prototype.resume = function() {
  this.log.resume()
}

Logger.prototype.rmLevel = function(level) {
  delete this.log.levels[level]
  delete this.log.style[level]
  delete this.log[level]
  delete this.log.disp[level]
  delete this[level]
}

Logger.prototype.addLevel = function(level, n, style, disp) {
  this.log.addLevel(level, n, style, disp)
  this[level] = function() {
    var args = Array.prototype.slice.call(arguments)
    this.write(level, args)
  }.bind(this)
}

Logger.prototype.write = function(level, args) {
  args = [this.component].concat(args)
  this.log[level].apply(this.log, args)
}
