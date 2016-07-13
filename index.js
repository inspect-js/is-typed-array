'use strict';

var toStr = Object.prototype.toString,
	typedArrays = {
		Float32Array: true,
		Float64Array: true,
		Int8Array: true,
		Int16Array: true,
		Int32Array: true,
		Uint8Array: true,
		Uint8ClampedArray: true,
		Uint16Array: true,
		Uint32Array: true
	},
	slice = String.prototype.slice,
	gOPD = Object.getOwnPropertyDescriptor;

module.exports = Object.getPrototypeOf && gOPD && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	var typedArray, arr, proto, descriptor;
	/* eslint max-statements: ['error', 16] */
	/* eslint no-restricted-syntax: ['warn', 'ForInStatement'] */
	/* jscs:disable disallowNodeTypes */
	for (typedArray in typedArrays) {
		if (Object.prototype.hasOwnProperty.call(typedArrays, typedArray)) {
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
				descriptor = typedArrays[descriptor.get.call(Object(value))];
				if (descriptor) { return descriptor; }
			}
		}
	}
	/* jscs:enable disallowNodeTypes */
	return false;
} : function (value) {
	return typedArrays[slice.call(toStr.call(Object(value)), 8, -1)] || false;
};
