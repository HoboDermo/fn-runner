# fn-runner

[![Build Status](https://travis-ci.org/HoboDermo/fn-runner.svg?branch=master)](https://travis-ci.org/HoboDermo/fn-runner)

> A simple task runner to run a function periodically


## Install

```sh
$ npm install --save fn-runner
```


## Usage

```js
var fn = function () {
    //Logic
};

var runner1 = new fnRunner(1000, fn);

runner1.start(); //Run fn() every 1000ms
runner1.isStopped();
//=> false

runner1.stop(); //Stop running fn()
runner1.isStopped();
//=> true

var runner2 = new fnRunner(1000, fn, true);

runner2.isStopped();
//=> false

runner2.stop(); //Stop running fn()
runner2.isStopped();
//=> true
```


## License

MIT © Diarmuid Delaney