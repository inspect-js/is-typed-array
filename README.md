# is-typed-array <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

[![browser support][9]][10]

Is this value a JS Typed Array? This module works cross-realm/iframe, does not depend on `instanceof` or mutable properties, and despite ES6 Symbol.toStringTag.

## Example

```js
var isTypedArray = require('is-typed-array');
var assert = require('assert');

assert.notOk(isTypedArray(undefined));
assert.notOk(isTypedArray(null));
assert.notOk(isTypedArray(false));
assert.notOk(isTypedArray(true));
assert.notOk(isTypedArray([]));
assert.notOk(isTypedArray({}));
assert.notOk(isTypedArray(/a/g));
assert.notOk(isTypedArray(new RegExp('a', 'g')));
assert.notOk(isTypedArray(new Date()));
assert.notOk(isTypedArray(42));
assert.notOk(isTypedArray(NaN));
assert.notOk(isTypedArray(Infinity));
assert.notOk(isTypedArray(new Number(42)));
assert.notOk(isTypedArray('foo'));
assert.notOk(isTypedArray(Object('foo')));
assert.notOk(isTypedArray(function () {}));
assert.notOk(isTypedArray(function* () {}));
assert.notOk(isTypedArray(x => x * x));
assert.notOk(isTypedArray([]));

assert.ok(isTypedArray(new Int8Array()));
assert.ok(isTypedArray(new Uint8Array()));
assert.ok(isTypedArray(new Uint8ClampedArray()));
assert.ok(isTypedArray(new Int16Array()));
assert.ok(isTypedArray(new Uint16Array()));
assert.ok(isTypedArray(new Int32Array()));
assert.ok(isTypedArray(new Uint32Array()));
assert.ok(isTypedArray(new Float32Array()));
assert.ok(isTypedArray(new Float64Array()));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/is-typed-array
[2]: http://versionbadg.es/ljharb/is-typed-array.svg
[3]: https://travis-ci.org/ljharb/is-typed-array.svg
[4]: https://travis-ci.org/ljharb/is-typed-array
[5]: https://david-dm.org/ljharb/is-typed-array.svg
[6]: https://david-dm.org/ljharb/is-typed-array
[7]: https://david-dm.org/ljharb/is-typed-array/dev-status.svg
[8]: https://david-dm.org/ljharb/is-typed-array#info=devDependencies
[9]: https://ci.testling.com/ljharb/is-typed-array.png
[10]: https://ci.testling.com/ljharb/is-typed-array
[11]: https://nodei.co/npm/is-typed-array.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/is-typed-array.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/is-typed-array.svg
[downloads-url]: http://npm-stat.com/charts.html?package=is-typed-array
