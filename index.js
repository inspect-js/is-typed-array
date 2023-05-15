'use strict';

var availableTypedArrays = require('available-typed-arrays');

var hasToStringTag = require('has-tostringtag/shams')();
var gOPD = require('gopd');

var g = typeof globalThis === 'undefined' ? global : globalThis;
var typedArrays = availableTypedArrays();

var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	Array.prototype.forEach.call(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	// note: can update syntax to friendlier for..of when dropping support for node 0.10
	var keys = Object.keys(toStrTags);
	for (var i = 0; i < keys.length; i++) {
		var typedArray = keys[i];
		var getter = toStrTags[typedArray];
		try {
			if (getter.call(value) === typedArray) {
				return true;
			}
		} catch (e) { /**/ }
	}
	return false;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = String.prototype.slice.call(Object.prototype.toString.call(value), 8, -1);
		return Array.prototype.indexOf.call(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};
