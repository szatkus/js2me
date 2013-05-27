(function () {
	function System() {
	}
	System.prototype = {
		$outLjava_io_PrintStream_: new javaRoot.$java.$io.$PrintStream({
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
			
		}),
		$currentTimeMillis__J: function () {
			return new js2me.Long(0, (new Date()).getTime());
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$System'] = System;
})();

