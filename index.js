'use strict';

var typedArrays = /.*((Float|Uint|Int)(8Clamped|8|16|32|64))Array.*/;

module.exports = Object.getPrototypeOf && Object.getOwnPropertyDescriptor && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	var proto, descriptor;
	/* eslint no-return-assign: 1 */
	return Object(value) === value && (
		(descriptor = Object.getOwnPropertyDescriptor(
			(proto = Object.getPrototypeOf(value), Object.getPrototypeOf(proto) || proto),
			Symbol.toStringTag)
		) && (
		descriptor = descriptor.get.call(value),
		proto = descriptor.replace(typedArrays, '$1')) !== descriptor && proto);
} : function (value) {
	var out;
	var val = String.prototype.toString.call(value);
	return (out = val.replace(typedArrays, '$1')) !== val && out;
};
