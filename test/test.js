var test = require('tap').test
  , Logger = require('../')

test('works with no arguments', function(t) {
  var log = new Logger()
  t.ok(log instanceof Logger, 'instanceof Logger')
  t.equal(log.component, 'app')
  t.ok(log.opts, 'opts should exist')
  t.equal(log.opts.loglevel, 'info')
  t.ok(log.opts.hasOwnProperty('prefixStyle'), 'opts.prefixStyle exists')
  t.ok(log.opts.hasOwnProperty('headingStyle'), 'opts.headingStyle exists')
  t.equal(typeof log.opts.prefixStyle, 'object', 'prefixStyle is object')
  t.equal(log.opts.prefixStyle.fg, 'magenta')
  t.equal(typeof log.opts.headingStyle, 'object', 'headingStyle is object')
  t.equal(log.opts.headingStyle.fg, 'white')
  t.equal(log.opts.headingStyle.bg, 'black')
  t.end()
})

test('works with just a component', function(t) {
  var log = new Logger('blah')
  t.ok(log instanceof Logger, 'instanceof Logger')
  t.equal(log.component, 'blah')
  t.end()
})

test('works with opts', function(t) {
  var log = new Logger('blah', {
    loglevel: 'silly'
  })
  t.ok(log instanceof Logger, 'instanceof Logger')
  t.equal(log.component, 'blah')
  t.equal(log.log.level, 'silly')
  t.end()
})

test('works without new', function(t) {
  var log = Logger('blah')
  t.ok(log instanceof Logger, 'instanceof Logger')
  t.equal(log.component, 'blah')
  t.end()
})

test('has createLogger()', function(t) {
  var log = Logger.createLogger('child')
  t.ok(log instanceof Logger, 'instanceof Logger')
  t.equal(log.component, 'child')
  t.end()
})

test('can create a child', function(t) {
  var logger = Logger.createLogger('blah')
  t.ok(logger instanceof Logger, 'instanceof Logger')
  var log = logger.child('child')
  t.ok(log instanceof Logger, 'instanceof Logger')
  t.equal(log.component, 'child')
  t.end()
})

test('pause and resume should work', function(t) {
  var log = new Logger()
  log.pause()
  t.equal(log.log._paused, true, 'stream is paused')
  log.resume()
  t.equal(log.log._paused, false, 'stream is not paused')
  t.end()
})

test('can remove a level', function(t) {
  var log = new Logger()
  log.rmLevel('http')
  t.notOk(log.http, 'log.http should not exist')
  t.end()
})

test('can add a level', function(t) {
  var log = new Logger('haha', {
    loglevel: 'silent'
  })
  log.addLevel('http', 3000, {
    fg: 'green'
  , bg: 'black'
  })
  t.ok(log.http, 'log.http should exist')
  log.log.once('log.http', function() {
    t.end()
  })
  log.http('blah')
})

test('should have sugar for logging', function(t) {
  t.plan(12)
  var log = new Logger('test', {
    level: 'silent'
  , timestamps: false
  })

  log.log.on('log', function(m) {
    t.ok(m, 'got log message')
  })

  log.log.on('log.error', function(m) {
    t.equal(m.message, 'error')
  })

  log.log.on('log.warn', function(m) {
    t.equal(m.message, 'warn')
  })

  log.log.on('log.http', function(m) {
    t.equal(m.message, 'http')
  })

  log.log.on('log.info', function(m) {
    t.equal(m.message, 'info')
  })

  log.log.on('log.trace', function(m) {
    t.equal(m.message, 'test biscuits')
  })

  log.log.on('log.verbose', function(m) {
    t.equal(m.message, 'test 24')
  })

  log.log.on('error', function(err) {
    t.error(err)
  })

  log.trace('test %s', 'biscuits')
  log.verbose('test %d', 24)
  log.info('info')
  log.http('http')
  log.warn('warn')
  log.error('error')
})
