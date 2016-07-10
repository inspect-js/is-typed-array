'use strict';

/** Russian, for me | Русский, для меня
*/

var typedArrays = { Float32Array: true, Float64Array: true, Int8Array: true, Int16Array: true, Int32Array: true, Uint8Array: true, Uint8ClampedArray: true, Uint16Array: true, Uint32Array: true };
/**
	// This file does not change the logic, only the optimization of variable's
	// declaration.
	//	Этот файл не меняет логику, только оптимизацию объявления переменной.
*/
var forEach = require('foreach');

module.exports = Object.getPrototypeOf && Object.getOwnPropertyDescriptor && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	// Check 'Object.getPrototypeOf' and 'Object.getOwnPropertyDescriptor' does
	// not make sense if the compiler supports the 'Symbol' and 'Symbol.toStringTag'
	// This is a test capabilities they need to be checked for the maximum criterion
	// 	Проверять 'Object.getPrototypeOf' и 'Object.getOwnPropertyDescriptor' не
	// 	имеет смысла если компилятор поддерживает 'Symbol' и 'Symbol.toStringTag'
	//  Это проверка возможностей, их нужно проверять по максимальному критерию.
/**
	I do not change the name of the variable to read the differences
		Не меняю имя переменной, для чтения отличий
*/
	/* eslint no-redeclare: 1 */
	// 	We depart from checking to null and undefined
	// 		Уходим от проверки на null и undefined
	var value = Object(value);
	var proto, descriptor, arr, anyTrue;
/**
	// Do not use two cycles of one object in function.
	// Не используйте два цикла одного объекта в функции.
	var toStrTags = {};
*/
	forEach(typedArrays, function (_, typedArray) {
		// Creating objects can be eliminated if through 'try' values
		// 'typedArrays' will be similar to the keys.
		//	Создане объектов можно исключить, если через 'try' значения
		//	'typedArrays' будут аналогичны ключам.
		arr = new global[typedArray]();
		if (!(Symbol.toStringTag in arr)) {
			throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
		}
/**
		// Use ternary
		// Используйте тернар
		proto = Object.getPrototypeOf(arr);
		descriptor = Object.getOwnPropertyDescriptor(proto, Symbol.toStringTag);
		if (!descriptor) {
			descriptor = Object.getOwnPropertyDescriptor(
				Object.getPrototypeOf(proto),
				Symbol.toStringTag
			);
		}
	  toStrTags[typedArray] = descriptor.get;
*/
		// equivalently ternary
		// эквивалентный тернар
/**
		// If I decided to stay here
		// 	Если я бы решил остаться здесь
    // Please explain why not use:
    //	Пожалуйста поясните почему не используете:
		value instanceof arr                  // by constructor
		arr.prototype.isPrototypeOf(value)    // by prototype
*/
		/* eslint no-unused-expressions: 1 */
		!anyTrue && (
			descriptor = Object.getOwnPropertyDescriptor(
			(proto = Object.getPrototypeOf(arr), Object.getPrototypeOf(proto) || proto),
			Symbol.toStringTag)
		) && typedArrays[descriptor.get.call(value)] && (anyTrue = true);
	}
	);
/**
	// Do not use two cycles of one object in function.
	// Не используйте два цикла одного объекта в функции.
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try { anyTrue = getter.call(value) === typedArray; } catch (e) {}
		}
	}
	);
*/
	return anyTrue;
} : function (value) {
	return !!(Object(value) === value && typedArrays[String.prototype.slice.call(Object.prototype.toString.call(value), 8, -1)]);
};
