(function () {
	function OutputStream() {
	}
	OutputStream.prototype = {
		$write__B_V: function (buffer) {
			for (var i = 0; i < buffer.length; i++) {
				this.$write_I_V(buffer[i]);
			}
		},
		$flush__V: function () {
		},
		$close__V: function () {
		}
	};
	js2me.findPackage('javaRoot.$java.$io')['$OutputStream'] = OutputStream ;
})();

