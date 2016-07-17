'use strict';

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
var tryTypedArrays = function isTypedArray(value) {
	var typedArray;
	if (Object.getPrototypeOf) {
		if (Symbol.toStringTag in value) {
			//
			//
			var proto = Object.getPrototypeOf(value);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = Object.getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			if (descriptor && descriptor.get) {
				typedArray = descriptor.get.call(value);
			}
		}
	}
	return !!typedArrays[typedArray];
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) { return !!typedArrays[slice.call(toStr.call(value), 8, -1)]; }
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};
