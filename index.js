'use strict';

/** Russian, for me | Русский, для меня
	My English is bad. What do we do?
		У меня плохой Английский. Что мы делаем?

	1) In the cycle by a list of names TypedArray, get an object.
		В цикле по списку имён TypedArra, получаем объект.

	2) From the descriptor object take the function returns the name of type the object.
		Из дескриптора объекта берем функцию возвращающую имя типа объекта.

	3) Check the object type name with the type names of the values in the same list.
		Проверяем имя типа объекта значения с именами в том же списке.

	Cycles use expensive
		Циклы использовать дорого

	Two queries to a single object in the function.
		Два запроса к одному объекту в функции.

	Simply perform step two and three for the value.
		Проще выполнить пункт два и три для значения.
*/
// For strings cheaper functions for strings
// 	Для строк дешевле функции для строк
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
