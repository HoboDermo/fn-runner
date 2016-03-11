var assert = require('assert');
var fnRunner = require('./fn-runner');

describe('constructor', function () {
  it('throws an error when timeout is not a number', function () {
    var createRunner = function() {
      new fnRunner('not a number', function() {});
    };
    assert.throws(createRunner, TypeError);
  });

  it('throws an error when callback is not a function', function () {
    var createRunner = function() {
      new fnRunner(1000, 'not a function');
    };
    assert.throws(createRunner, TypeError);
  });

  it('accepts a string representation of a number', function () {
    var runner = new fnRunner('100', function() {});
    assert.ok(runner instanceof fnRunner);
  });
});

describe('start', function(done) {
  it('runs the function periodically when started', function () {
    var counter = 0;
    var fn = function() { counter++; };
    var runner = new fnRunner(100, fn);

    var startResult = runner.start();

    setTimeout(function() {
      runner.stop();
      assert.ok(startResult);
      assert.strictEqual(counter, 5);
      done();
    }, 500);
  });

  it('returns false when function is already running', function () {
    var fn = function() { };
    var runner = new fnRunner(100, fn);

    runner.start();
    var startResult = runner.start();

    assert.equal(startResult, false);
  });
});

describe('stop', function() {
  it('stops running the function when stopped', function () {
    var counter = 0;
    var fn = function() { counter++; };
    var runner = new fnRunner(100, fn);

    runner.start();

    setTimeout(function() {
      var stopResult = runner.stop();

      setTimeout(function() {
        assert.ok(stopResult);
        assert.strictEqual(counter, 5);
        done();
      }, 500);

    }, 500);
  });

  it('returns false when the function is already stopped', function () {
    var fn = function() { };
    var runner = new fnRunner(100, fn);

    var stopResult = runner.stop();

    assert.equal(stopResult, false);
  });
});

describe('isStopped', function() {
  it('returns true for isStopped when not running at initialisation', function () {
    var fn = function() { };
    var runner = new fnRunner(100, fn);

    var isStoppedResult = runner.isStopped();

    assert.ok(isStoppedResult);
  });

  it('returns true for isStopped when not running after stop', function () {
    var fn = function() { };
    var runner = new fnRunner(100, fn);

    runner.start();
    runner.stop();
    var isStoppedResult = runner.isStopped();

    assert.ok(isStoppedResult);
  });

  it('returns false for isStopped when running', function () {
    var fn = function() { };
    var runner = new fnRunner(100, fn);

    runner.start();
    var isStoppedResult = runner.isStopped();

    assert.equal(isStoppedResult, false);
  });
});