(function () {
	function PrintStream(output) {
		this.output = output;
	}
	PrintStream.prototype = {
		$println_Ljava_lang_String__V: function (x) {
			this.$print_Ljava_lang_String__V(x);
			this.output.$write_B_V(10);
		},
		$print_Ljava_lang_String__V: function (x) {
			this.output.$write__B_V(x);
		},
		$println_I_V: function (x) {
			this.$print_I_V(x);
			this.output.$write_B_V(10);
		},
		$print_I_V: function (x) {
			this.output.$write__B_V(x.toString());
		},
		$println_J_V: function (x) {
			var digits = [];
			for (var i = 0; i < 22; i++) {
				digits[i] = 0;
			}
			if (x.hi < 2147483648) {

				var hi = x.hi;
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
				var lo = x.lo;
				var rest = 0;
				for (var i = 0; i < digits.length; i++) {
					digits[i] += lo % 10 + rest;
					rest = Math.floor(digits[i] / 10);
					digits[i] = digits[i] % 10;
					lo = Math.floor(lo / 10);
				}
			} else {
				this.output.$write_B_V('-');
				var hi = -(x.hi - 4294967296);
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
				var lo = x.lo;
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
			this.output.$write__B_V(digits.slice(0, last + 1).reverse());
			this.output.$write_B_V(10);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$io')['$PrintStream'] = PrintStream;
})();

