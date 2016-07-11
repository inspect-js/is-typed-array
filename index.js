'use strict';

var typedArrays = /.*((Float|Uint|Int)(8Clamped|8|16|32|64))Array.*/,
	def = function (value) {
		var out,
			val = Object.prototype.toString.call(value);
		return (out = val.replace(typedArrays, '$1')) !== val && out;
	};

module.exports = Object.getPrototypeOf && Object.getOwnPropertyDescriptor && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	var proto, descriptor, out, val;
	/* eslint no-return-assign: 1 */
	return Object(value) === value && (
		Symbol.toStringTag in value ? (
				descriptor = Object.getOwnPropertyDescriptor(
					proto = Object.getPrototypeOf(value),
					Symbol.toStringTag
				) || Object.getOwnPropertyDescriptor(
					Object.getPrototypeOf(proto),
					Symbol.toStringTag
				)
			) && descriptor.get && (
				val = descriptor.get.call(value),
				out = val.replace(typedArrays, '$1')
			) !== val && out : def(value)
  );
} : def;
