'use strict';

/** Russian, for me | Русский, для меня
		Use the 'Array.forEach' expensive, not break by the execution
		and 'Array.every' raises the compiler version, easier to write cycle.
			Использовать 'Array.forEach' дорого, не обрывает выполнение,
			а 'Array.every' поднимает версию компилятора, проще написать цикл.
*/

var typedArrays = { Float32Array: true, Float64Array: true, Int8Array: true, Int16Array: true, Int32Array: true, Uint8Array: true, Uint8ClampedArray: true, Uint16Array: true, Uint32Array: true };

module.exports = Object.getPrototypeOf && Object.getOwnPropertyDescriptor && typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? function (value) {
	/* eslint no-redeclare: 1 */
	var value = Object(value);
	var proto, descriptor, arr, typedArray;
	/* eslint no-restricted-syntax: 1 */
	/* jscs:disable disallowNodeTypes */
	for (typedArray in typedArrays) {
		if (Object.prototype.hasOwnProperty.call(typedArrays, typedArray)) {
			arr = new global[typedArray]();
			if (!(Symbol.toStringTag in arr)) {
				throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
			}
			if ((
		descriptor = Object.getOwnPropertyDescriptor(
		(proto = Object.getPrototypeOf(arr), Object.getPrototypeOf(proto) || proto),
		Symbol.toStringTag)
		) && typedArrays[descriptor.get.call(value)]) { return true; }
		}
	}
	/* jscs:enable disallowNodeTypes
	*/
	return false;
} : function (value) {
	/* eslint no-redeclare: 1 */
	var value = Object(value);
	return !!typedArrays[String.prototype.slice.call(Object.prototype.toString.call(value), 8, -1)];
};
