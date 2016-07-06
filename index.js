'use strict';

var toStr = Object.prototype.toString;

module.exports = function (value) {
	var name = toStr.call(value).replace(/\[.+?(\w+)\]/, '$1');
	return name === Object(value).constructor.name && (/.*array.*/img).test(name);
};
