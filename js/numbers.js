js2me.Long = function (hi, lo) {
	this.hi = hi;
	if (lo < 0) {
		lo += 4294967296;
	}
	this.lo = lo;
	this.shl = function (shift) {
		var lo = this.lo << shift;
		var rest = Math.floor(lo / 0xffffffff);
		lo = lo % 0xffffffff;
		var hi = this.hi << shift;
		hi = hi % 0xffffffff + rest;
		return new js2me.Long(hi, lo);
	};
	this.shr = function (shift) {
		var lo = this.lo >> shift;
		lo += (this.hi % (0xffffffff >> (32 - shift))) << (32 - shift);
		var hi = this.hi >> shift;
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
		if (b.hi != 0) {
			result.lo = Math.floor(a.toInt() / b.toInt());
		} else {
			result.hi = a.hi / b.lo;
			result.lo = Math.floor(a.lo / b.lo);
			if ((result.hi % 1) < 1) {
				result.lo += Math.round((result.hi % 1) * 0x100000000);
				result.hi = Math.floor(result.hi);
			}
		}
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
		while (hi < 0) {
			hi += 0x100000000;
		}
		hi = hi % 0xffffffff;
		var lo = this.lo - b.lo;
		while (lo < 0) {
			lo += 0x100000000;
			hi--;
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
