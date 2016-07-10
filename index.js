'use strict';

var typedArrays = /[Float[32|64]|Uint8Clamped|[Int|Uint][8|16|32]]Array/;

module.exports = Object.getPrototypeOf && Object.getOwnPropertyDescriptor && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	var proto, descriptor;
	/* eslint no-return-assign: 1 */
	return !!(Object(value) === value && (
		(descriptor = Object.getOwnPropertyDescriptor(
			(proto = Object.getPrototypeOf(value), Object.getPrototypeOf(proto) || proto),
			Symbol.toStringTag)
		) && typedArrays.test(descriptor.get.call(value))
	));
} : function (value) {
	return !!(Object(value) === value && typedArrays.test({}.toString.call(value)));
};
