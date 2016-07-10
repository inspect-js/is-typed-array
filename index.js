'use strict';

var typedArrays = function (value) {
	/* eslint no-return-assign: 1 */
	var reg = /.*((Float|Uint|Int)(8Clamped|8|16|32|64))Array.*/;
	return reg.test(value);
/**
	// If use 'return (reg = value.replace(reg, "$1")) !== value && reg;'
	// function will return the name of the data stored in the array, it is true
	// or false.
	//	Если использовать 'return (reg = value.replace(reg, "$1")) !== value && reg;'
	//	функция будет возвращать имя хранимых данных в массиве, это true или false.
*/
};

module.exports = Object.getPrototypeOf && Object.getOwnPropertyDescriptor && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	var proto, descriptor;
	/* eslint no-return-assign: 1 */
	return Object(value) === value && (
		(descriptor = Object.getOwnPropertyDescriptor(
			(proto = Object.getPrototypeOf(value), Object.getPrototypeOf(proto) || proto),
			Symbol.toStringTag)
		) && typedArrays(descriptor.get.call(value))
	);
} : function (value) {
	return typedArrays({}.toString.call(value));
};
