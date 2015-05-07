'use strict';

var test = require('tape');
var isTypedArray = require('./');

test('isTypedArray', function(t) {
    t.ok(isTypedArray(new Float32Array));
    t.notOk(isTypedArray([]));
    t.end();
});

