# fn-runner

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

var runner = new fnRunner(1000, fn);

runner.start(); //Run fn() every 1000ms
runner.isStopped();
//=> true

runner.stop(); //Stop running fn()
runner.isStopped();
//=> false
```


## License

MIT © Diarmuid Delaney