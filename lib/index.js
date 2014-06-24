var log = require('npmlog')
  , util = require('util')

log.addLevel('trace', 500, { fg: 'brightCyan' }, 'trac')

var defaults = {
  prefixStyle: log.prefixStyle
, headingStyle: log.headingStyle
, loglevel: log.level
, stream: process.stderr
}

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
}

Logger.prototype.addLevel = function(level, n, style, disp) {
  this.log.addLevel(level, n, style, disp)
}

Logger.prototype.write = function(level, args) {
  args = [this.component].concat(args)
  this.log[level].apply(this.log, args)
}

;['trace', 'verbose', 'info', 'error', 'warn', 'http'].forEach(function(l) {
  Logger.prototype[l] = function() {
    var args = Array.prototype.slice.call(arguments)
    var level = args.shift()
    this.write(level, args)
  }
})