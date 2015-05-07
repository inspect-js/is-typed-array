'use strict';

var isTypedArray = function (obj) {
    return obj && obj.buffer && obj.buffer.constructor === ArrayBuffer;
};

module.exports = isTypedArray;
