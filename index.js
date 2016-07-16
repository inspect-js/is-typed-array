'use strict';

var getprototypeof = require('getprototypeof');

var toStr = Object.prototype.toString;
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var typedArrays = {
	Float32Array: true,
	Float64Array: true,
	Int8Array: true,
	Int16Array: true,
	Int32Array: true,
	Uint8Array: true,
	Uint8ClampedArray: true,
	Uint16Array: true,
	Uint32Array: true
};

var slice = String.prototype.slice;
var gOPD = Object.getOwnPropertyDescriptor;

module.exports = function isTypedArray(value) {
	var out;
	if (Object(value) === value) {
		var proto, descriptor;
		if (hasToStringTag && gOPD) {
			if (Symbol.toStringTag in value) {
				proto = getprototypeof(value);
				descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					proto = getprototypeof(proto);
					descriptor = gOPD(proto, Symbol.toStringTag);
				}
				if (descriptor && descriptor.get) {
					out = descriptor.get.call(value);
				}
			}
		} else {
			out = slice.call(toStr.call(value), 8, -1);
		}
	}
	return !!typedArrays[out];
};
