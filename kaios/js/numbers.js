"use strict";
js2me.longToString = function (a) {
	var digits = [];
	var sign = false;
	for (var i = 0; i < 22; i++) {
		digits[i] = 0;
	}
	if (a.hi < 2147483648) {

		var hi = a.hi;
		var i = 0;
		while (hi > 0) {
			digits[i] = hi % 10;
			hi = Math.floor(hi / 10);
			i++;
		}
		for (var i = 0; i < 32; i++) {
			var rest = 0;
			for (var j = 0; j < digits.length; j++) {
				digits[j] *= 2;
				digits[j] += rest;
				rest = Math.floor(digits[j] / 10);
				digits[j] = digits[j] % 10;
			}
		}
		var lo = a.lo;
		var rest = 0;
		for (var i = 0; i < digits.length; i++) {
			digits[i] += lo % 10 + rest;
			rest = Math.floor(digits[i] / 10);
			digits[i] = digits[i] % 10;
			lo = Math.floor(lo / 10);
		}
	} else {
		sign = true;
		var hi = -(a.hi - 4294967296);
		var i = 0;
		while (hi > 0) {
			digits[i] = hi % 10;
			hi = Math.floor(hi / 10);
			i++;
		}
		for (var i = 0; i < 32; i++) {
			var rest = 0;
			for (var j = 0; j < digits.length; j++) {
				digits[j] *= 2;
				digits[j] += rest;
				rest = Math.floor(digits[j] / 10);
				digits[j] = digits[j] % 10;
			}
		}
		var lo = a.lo;
		var rest = 0;
		for (var i = 0; i < digits.length; i++) {
			digits[i] -= lo % 10 + rest;
			rest = 0
			while (digits[i] < 0) {
				digits[i] += 10;
				rest++;
			}
			lo = Math.floor(lo / 10);
		}
	}
	var last = 0;
	for (var i = 0; i < digits.length; i++) {
		if (digits[i] > 0) {
			last = i;
		}
		digits[i] += 48;
	}
	digits = digits.slice(0, last + 1);
	if (sign) {
		digits.push(45);
	}
	return digits.reverse();
};
js2me.ladd = function (a, b) {
	var result = {hi: 0, lo: 0};
	result.lo = a.lo + b.lo;
	result.hi = Math.floor(result.lo / 0x100000000)
	result.lo = result.lo % 0x100000000;
	result.hi += a.hi + b.hi;
	result.hi = result.hi % 0x100000000;
	return result;
};
js2me.lcmp = function (a, b) {
	function normalize(x) {
		if (x >= 0x80000000) {
			return x -= 0x100000000;
		} else {
			return x;
		}
	}
	if (a.hi === b.hi && a.lo === b.lo) {
		return 0;
	}
	if (normalize(a.hi) > normalize(b.hi)) {
		return 1;
	}
	if (normalize(a.hi) === normalize(b.hi) && normalize(a.lo) > normalize(b.lo)) {
		return 1;
	}
	return -1;
};
js2me.ldiv = function (t, b) {
	var result = {hi: 0, lo: 0};
	var sign = false;
	var a = {hi: t.hi, lo: t.lo};
	if (t.hi >= 2147483648) {
		sign = !sign;
		a = js2me.lneg(t);
	}
	if (t.hi >= 2147483648) {
		sign = !sign;
		b = js2me.lneg(b);
	}
	var c = b;
	var base = {hi: 0, lo: 1};
	while (js2me.lcmp(c, a) != 1 && c.hi < 0x80000000) {
		c = js2me.lshl(c, 1);
		base = js2me.lshl(base, 1);
	}
	while (js2me.lcmp(a, b) != -1) {
		c.lo = Math.floor(c.lo / 2);
		if (c.hi % 2 === 1) {
			c.lo += 0x80000000;
		}
		c.hi = Math.floor(c.hi / 2);
		base = js2me.lshr(base, 1);
		if (js2me.lcmp(c, a) != 1) {
			a = js2me.lsub(a, c);
			result = js2me.ladd(result, base);
		}
	}
	if (sign) {
		result = js2me.lneg(result);
	}
	if (t.hi >= 2147483648) {
		a = js2me.lneg(a);
	}
	return {
		div: result,
		rem: a
	};
};
js2me.lmul = function (a, b) {
	var result = {hi: 0, lo: 0};
	var sign = false;
	var c = {hi: a.hi, lo: a.lo};
	if (a.hi >= 2147483648) {
		sign = !sign;
		c = js2me.lneg(a);
	}
	if (b.hi >= 2147483648) {
		sign = !sign;
		b = js2me.lneg(b);
	}
	result.hi = (c.hi * b.lo + c.lo * b.hi);
	result.lo = c.lo * b.lo;
	var rest = Math.floor(result.lo / 0x100000000);
	result.hi = (result.hi + rest) % 0x100000000;
	result.lo = result.lo % 0x100000000;
	if (sign) {
		result = js2me.lneg(result);
	}
	return result;
};
js2me.lneg = function (a) {
	var result = {hi: 0, lo: 0};
	if (a.hi == 0 && a.lo == 0) {
		return result;
	}
	result.hi = 0xFFFFFFFF - a.hi;
	result.lo = 0xFFFFFFFF - a.lo;
	result.lo++;
	if (result.lo >= 0x100000000) {
		result.hi += Math.floor(result.lo / 0x100000000);
		result.lo = result.lo % 0x100000000;
	}
	return result;
};
js2me.lshl = function (a, shift) {
	var lo = a.lo;
	var hi = a.hi;
	for (var i = 0; i < shift; i++) {
		lo *= 2;
		hi *= 2;
	}
	var rest = Math.floor(lo / 0x100000000);
	lo = lo % 0x100000000;
	hi = hi % 0x100000000 + rest;
	return {hi: hi, lo: lo};
};
js2me.lshr = function (a, shift, isArithmetic) {
	if (shift === 0) {
		return a;
	}
	var lo = a.lo;
	var hi = a.hi;
	var base = Math.pow(2, shift);
	var fillWithOnes = false;
	
	if (isArithmetic && hi >= 0x80000000) {
		fillWithOnes = true;
	}
	
	hi = Math.floor(hi / base);
	if (fillWithOnes) {
		hi += 0xFFFFFFFF - Math.pow(2, 32 - shift) + 1;
	}
	lo = Math.floor(lo / base);
	var rest = a.hi % base;
	rest *= Math.pow(2, 32 - shift);
	lo += rest;
	return {hi: hi, lo: lo};
};
js2me.lsub = function (a, b) {
	var x = a.hi;
	if (x >= 0x80000000) {
		x -= 0x100000000;
	}
	var y = b.hi;
	if (y >= 0x80000000) {
		y -= 0x100000000;
	}
	var hi = (x - y);
	var lo = a.lo - b.lo;
	while (lo < 0) {
		lo += 0x100000000;
		hi--;
	}
	while (hi < 0) {
		hi += 0x100000000;
	}
	
	return {hi: hi, lo: lo};
};
js2me.lxor = function (a, b) {
	var hi = 0;
	var hi1 = a.hi;
	var hi2 = b.hi;
	var lo = 0;
	var lo1 = a.lo;
	var lo2 = b.lo;
	var base = 1;
	for (var i = 0; i < 32; i++) {
		if (hi1 %2 !== hi2 % 2) {
			hi += base;
		}
		if (lo1 %2 !== lo2 % 2) {
			lo += base;
		}
		base  *= 2;
		hi1 = Math.floor(hi1 / 2);
		hi2 = Math.floor(hi2 / 2);
		lo1 = Math.floor(lo1 / 2);
		lo2 = Math.floor(lo2 / 2);
	}
	return {
		hi: hi,
		lo: lo
	};
};
js2me.dataToFloat = function (value) {
	var sign = (value & 0x80000000) != 0;
	var exponent = ((value & 0x7f800000) >> 23) - 127;
	var fraction = (value & 0x007fffff);
	for (var j = 0; j < 23; j++) {
		fraction /= 2;
	}
	fraction += 1;
	while (exponent != 0) {
		if (exponent > 0) {
			fraction *= 2;
			exponent--;
		} else {
			fraction /= 2;
			exponent++;
		}
	}
	if (sign) {
		fraction *= -1;
	}
	return fraction;
};
js2me.dataToDouble = function (hiData, loData) {
	var sign = (hiData & 0x80000000) != 0;
	var exponent = ((hiData & 0x7ff00000) >> 20) - 1023;
	hiData = (hiData & 0x000fffff) * 0x100000000;
	var fraction = 1;
	for (var j = 0; j < 52; j++) {
		hiData /= 2;
		loData /= 2;
	}
	fraction += hiData;
	fraction += loData;
	while (exponent != 0) {
		if (exponent > 0) {
			fraction *= 2;
			exponent--;
		} else {
			fraction /= 2;
			exponent++;
		}
	}
	if (sign) {
		fraction *= -1;
	}
	return {double: fraction};
};
js2me.FPToBytes = function (value, exponentLength, fractionLength) {
	var bytes = [];
	bytes[0] = 0;
	if (value < 0) {
		bytes[0] += 128;
		value =  -value;
	}
	var exp = 0;
	while (value < 1) {
		value *= 2;
		exp--;
	}
	while (value >= 2) {
		value /= 2;
		exp++;
	}
	exp += Math.pow(2, exponentLength - 1) - 1;
	bytes[1] = exp % Math.pow(2, exponentLength - 7);
	bytes[0] += Math.floor(exp / Math.pow(2, exponentLength - 7));
	value -= 1;
	value *= Math.pow(2, 8 - ((1 + exponentLength) % 8));
	bytes[1] += Math.floor(value);
	value = value % 1;
	var length = Math.floor((exponentLength  + fractionLength + 1) / 8)
	for (var i = 2; i < length; i++) {
		value *= 256;
		bytes[i] = Math.floor(value);
		value = value % 1;
	}
	return bytes;
};
js2me.dconst0 = {double: 0};
js2me.dconst1 = {double: 1};
