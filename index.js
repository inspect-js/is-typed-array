'use strict';

var has = require('has');
var toStr = Object.prototype.toString;
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
var getpr = Object.getPrototypeOf;
var gOPD = Object.getOwnPropertyDescriptor;
var isTypedArray;
if (getpr && gOPD) {
	if (typeof Symbol === 'function') {
		if (typeof Symbol.toStringTag === 'symbol') {
			isTypedArray = function (value) {
				var typedArray, arr, proto, descriptor;
				/* jscs:disable disallowNodeTypes */
				for (typedArray in typedArrays) {
					if (has(typedArrays, typedArray)) {
						arr = new global[typedArray]();
						if (!(Symbol.toStringTag in arr)) {
							throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
						}
						proto = getpr(arr);
						descriptor = gOPD(proto, Symbol.toStringTag);
						if (!descriptor) {
							proto = getpr(proto);
							descriptor = gOPD(proto, Symbol.toStringTag);
						}
						if (descriptor) {
							descriptor = typedArrays[descriptor.get.call(Object(value))];
							if (descriptor) { return descriptor; }
						}
					}
				}
				/* jscs:enable disallowNodeTypes */
				return false;
			};
		}
	}
}
if (!isTypedArray) {
	isTypedArray = function (value) {
		return typedArrays[slice.call(toStr.call(Object(value)), 8, -1)] || false;
	};
}

module.exports = isTypedArray;
