
/**
 * Construct a new function runner
 * @constructor
 * @class FnRunner
 * @param {number} _timeout - the number of milliseconds until the callback is run
 * @param {function} _callback - the function to be called after each timeout
 * @param {boolean} [_startImmediately=false] - when true start runner immediately
 */
function FnRunner(_timeout, _callback, _startImmediately) {

  if(isNaN(_timeout)) throw new TypeError('Timeout must be a number.');
  if(typeof _callback !== 'function') throw new TypeError('Callback must be a function.');

  var timeout = _timeout;
  var callback = _callback;
  var timer = null;
  var isStopped = true;

  /**
   * Start the function runner
   *
   * @return {boolean} true if function runner started successfully
   */
  this.start = function() {
    if(isStopped) {
      isStopped = false;
      timer = setTimeout(run, timeout);
      return true;
    }
    return false;
  };

  /**
   * Stop the function runner
   *
   * @return {boolean} true if function runner stopped successfully
   */
  this.stop = function() {
    if(!isStopped && timer) {
      clearTimeout(timer);
      timer = null;
      isStopped = true;
      return true;
    }
    return false;
  };

  /**
   * Check the status of the function runner
   *
   * @return {boolean} true if function runner is not running
   */
  this.isStopped = function() {
    return isStopped;
  };

  function run() {
    callback();
    if(!isStopped) {
      timer = setTimeout(run, timeout);
    }
  }

  if(_startImmediately) {
    this.start();
  }
}

module.exports = FnRunner;
