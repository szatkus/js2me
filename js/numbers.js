js2me.Long = function (hi, lo) {
	if (hi < 0) {
		hi += 4294967296;
	}
	this.hi = hi;
	if (lo < 0) {
		lo += 4294967296;
	}
	this.lo = lo;
	this.shl = function (shift) {
		var lo = this.lo;
		var hi = this.hi;
		for (var i = 0; i < shift; i++) {
			lo *= 2;
			hi *= 2;
		}
		var rest = Math.floor(lo / 0x100000000);
		lo = lo % 0x100000000;
		hi = hi % 0x100000000 + rest;
		return new js2me.Long(hi, lo);
	};
	this.shr = function (shift) {
		var lo = this.lo;
		var hi = this.hi;
		var base = 1;
		
		for (var i = 0; i < shift; i++) {
			lo /= 2;
			hi /= 2;
			base *= 2;
		}
		var rest = this.hi % base;
		for (var i = 0; i < (32 - shift); i++) {
			rest *= 2;
		}
		lo = Math.floor(lo);
		hi = Math.floor(hi);
		lo += rest;
		return new js2me.Long(hi, lo);
	};
	this.neg = function () {
		var result = new js2me.Long(0, 0);
		if (this.hi == 0 && this.lo == 0) {
			return result;
		}
		result.hi = 0xFFFFFFFF - this.hi;
		result.lo = 0xFFFFFFFF - this.lo;
		result.lo++;
		if (result.lo >= 0x100000000) {
			result.hi += Math.floor(result.lo / 0x100000000);
			result.lo = result.lo % 0x100000000;
		}
		return result;
	};
	this.add = function (b) {
		var result = new js2me.Long(0, 0);
		result.lo = this.lo + b.lo;
		result.hi = Math.floor(result.lo / 0x100000000)
		result.lo = result.lo % 0x100000000;
		result.hi += this.hi + b.hi;
		result.hi = result.hi % 0x100000000;
		return result;
	};
	this.div = function (b) {
		var result = new js2me.Long(0, 0);
		var sign = false;
		var a = this.copy();
		if (this.sign()) {
			sign = !sign;
			a = this.neg();
		}
		if (b.sign()) {
			sign = !sign;
			b = b.neg();
		}
		var c = b;
		var base = new js2me.Long(0, 1);
		while (c.cmp(a) != 1) {
			c = c.shl(1);
			base = base.shl(1);
		}
		while (a.cmp(b) != -1) {
			c = c.shr(1);
			base = base.shr(1);
			if (c.cmp(a) != 1) {
				a = a.sub(c);
				result = result.add(base);
			}
		}
		if (sign) {
			result = result.neg();
		}
		if (this.sign()) {
			a = a.neg();
		}
		return {
			div: result,
			rem: a
		};
	};
	this.mul = function (b) {
		var result = new js2me.Long(0, 0);
		var sign = false;
		var a = this.copy();
		if (this.sign()) {
			sign = !sign;
			a = this.neg();
		}
		if (b.sign()) {
			sign = !sign;
			b = b.neg();
		}
		result.hi = (a.hi * b.lo + a.lo * b.hi);
		result.lo = a.lo * b.lo;
		var rest = Math.floor(result.lo / 0x100000000);
		result.hi = (result.hi + rest) % 0x100000000;
		result.lo = result.lo % 0x100000000;
		if (sign) {
			result = result.neg();
		}
		return result;
	};
	this.sub = function (b) {
		var x = this.hi;
		if (x >= 0x80000000) {
			x -= 0x100000000;
		}
		var y = b.hi;
		if (y >= 0x80000000) {
			y -= 0x100000000;
		}
		var hi = (x - y);
		var lo = this.lo - b.lo;
		while (lo < 0) {
			lo += 0x100000000;
			hi--;
		}
		while (hi < 0) {
			hi += 0x100000000;
		}
		
		return new js2me.Long(hi, lo);
	};
	this.toString = function () {
		var digits = [];
		var sign = false;
		for (var i = 0; i < 22; i++) {
			digits[i] = 0;
		}
		if (this.hi < 2147483648) {

			var hi = this.hi;
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
			var lo = this.lo;
			var rest = 0;
			for (var i = 0; i < digits.length; i++) {
				digits[i] += lo % 10 + rest;
				rest = Math.floor(digits[i] / 10);
				digits[i] = digits[i] % 10;
				lo = Math.floor(lo / 10);
			}
		} else {
			sign = true;
			var hi = -(this.hi - 4294967296);
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
			var lo = this.lo;
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
	this.abs = function () {
		if (this.sign()) {
			return this.neg();
		}
		return this.copy();
	};
	this.sign = function () {
		return this.hi >= 2147483648;
	};
	this.copy = function () {
		return new js2me.Long(this.hi, this.lo);
	};
	this.toInt = function () {
		return this.hi * 0x100000000 + this.lo;
	};
	this.cmp = function (b) {
		if (this.hi == b.hi && this.lo == b.lo) {
			return 0;
		}
		if (this.hi > b.hi) {
			return 1;
		}
		if (this.hi == b.hi && this.lo > b.lo) {
			return 1;
		}
		return -1;
	};
};
js2me.Double = function (double) {
	this.double = double;
};
js2me.checkOverflow = function (value, bits) {
	var base = 1;
	for (var i = 0; i < bits - 1; i++) {
		base *= 2;
	}
	while (value >= base) {
		value -= base * 2;
	}
	while (value < -base) {
		value += base * 2;
	}
	return value;
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
	return new js2me.Double(fraction);
};
