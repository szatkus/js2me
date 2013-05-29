(function () {
	function System() {
	}
	System.prototype = {
		$currentTimeMillis__J: function () {
			return new js2me.Long(0, (new Date()).getTime());
		},
		_clinit__V: function () {
			this.$outLjava_io_PrintStream_ = new javaRoot.$java.$io.$PrintStream({
				buffer: '',
				$write__B_V: function (b) {
					for (var i in b) {
						this.$write_B_V(b[i]);
					}
				},
				$write_B_V: function (b) {
					if (b == 10) {
						console.log(this.buffer);
						this.buffer = '';
					} else {
						if (typeof b == 'number') {
							this.buffer += String.fromCharCode(b);
						} else {
							this.buffer += b;
						}
					}
				}
				
			});
		},
		$arraycopy_Ljava_lang_Object_ILjava_lang_Object_II_V: function (src, srcPosition, dst, dstPosition, length) {
			if (src == null || dst == null) {
				throw new javaRoot.$java.$lang.$NullPointerException;
			}
			for (var i = 0; i < length; i++) {
				dst[dstPosition + i] = src[srcPosition + i];
			}
		},
		require: ['javaRoot.$java.$io.$PrintStream']
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$System'] = System;
})();

