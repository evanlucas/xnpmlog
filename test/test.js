var should = require('should')
  , Logger = require('../')

describe('xnpmlog', function() {
  it('should work with no arguments', function() {
    var log = new Logger()
    log.should.be.instanceOf(Logger)
    log.should.have.property('component', 'app')
    log.should.have.property('opts')
    log.opts.should.have.property('loglevel', 'info')
    log.opts.should.have.properties(['prefixStyle', 'headingStyle'])
    log.opts.prefixStyle.should.be.type('object')
    log.opts.prefixStyle.should.have.property('fg', 'magenta')
    log.opts.headingStyle.should.be.type('object')
    log.opts.headingStyle.should.have.properties({
      fg: 'white'
    , bg: 'black'
    })
  })

  it('should work with just a component', function() {
    var log = new Logger('blah')
    log.should.be.instanceOf(Logger)
    log.should.have.property('component', 'blah')
  })

  it('should work with opts', function() {
    var log = new Logger('blah')
    log.should.be.instanceOf(Logger)
    log.should.have.property('component', 'blah')
  })

  it('should work with using new', function() {
    var log = Logger('blah')
    log.should.be.instanceOf(Logger)
    log.should.have.property('component', 'blah')
  })

  it('should be able to createLogger()', function() {
    var log = Logger.createLogger('child')
    log.should.be.instanceOf(Logger)
    log.should.have.property('component', 'child')
  })

  it('should be able to create a child', function() {
    var logger = Logger.createLogger('blah')
    var log = logger.child('child')
    log.should.be.instanceOf(Logger)
    log.should.have.property('component', 'child')
  })

  it('should be able to pause and resume', function() {
    var log = new Logger()
    log.pause()
    log.log._paused.should.be.true
    log.resume()
    log.log._paused.should.be.false
  })

  it('should be able to remove a level', function() {
    var log = new Logger()
    log.rmLevel('http')
    should.not.exist(log.log.http)
  })

  it('should be able to add a level', function(done) {
    var log = new Logger('haha', {
      loglevel: 'silent'
    })
    log.addLevel('http', 3000, {
      fg: 'green'
    , bg: 'black'
    })
    should.exist(log.log.http)
    log.log.once('log.http', function() {
      done()
    })
    log.http('blah')
  })

  it('should have sugar for logging', function(done) {
    var log = new Logger('test', {
      level: 'silent'
    , timestamp: false
    })

    var count = 0
    function next(level) {
      results[level] = results[level] + 1
      count++
      if (count === 12) done()
    }

    var results = {
      error: 0
    , warn: 0
    , http: 0
    , info: 0
    , trace: 0
    , verbose: 0
    }

    log.log.on('log', function(m) {
      next(m.level)
    })

    log.log.on('log.error', function(m) {
      next('error')
    })

    log.log.on('log.warn', function(m) {
      next('warn')
    })

    log.log.on('log.http', function(m) {
      next('http')
    })

    log.log.on('log.info', function(m) {
      next('info')
    })

    log.log.on('log.trace', function(m) {
      m.message.should.equal('test biscuits')
      next('trace')
    })

    log.log.on('log.verbose', function(m) {
      m.message.should.equal('test 24')
      next('verbose')
    })

    log.log.on('error', function(err) {
      done(err)
    })

    log.trace('test %s', 'biscuits')
    log.verbose('test %d', 24)
    log.info('test')
    log.http('test')
    log.warn('test')
    log.error('test')
  })
})
