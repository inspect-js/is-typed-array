'use strict';

var has = require('has');

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
var tryTypedArrays = function tryTypedArrays(value) {
	if (Object.getPrototypeOf) {
		var typedArray, arr, proto, descriptor;
		/* jscs:disable disallowNodeTypes */
		for (typedArray in typedArrays) {
			if (has(typedArrays, typedArray)) {
				arr = new global[typedArray]();
				if (!(Symbol.toStringTag in arr)) {
					throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
				}
				proto = Object.getPrototypeOf(arr);
				descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					proto = Object.getPrototypeOf(proto);
					descriptor = gOPD(proto, Symbol.toStringTag);
				}
				if (descriptor) {
					return typedArrays[descriptor.get.call(Object(value))];
				}
			}
		}
	}
	/* jscs:enable disallowNodeTypes */
	return false;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) { return !!typedArrays[slice.call(toStr.call(value), 8, -1)]; }
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};
