(function () {
	function DataOutputStream() {
	}
	DataOutputStream.prototype = {
		_init_Ljava_io_OutputStream__V : function (out) {
			this.out = out;
		},
		$writeBoolean_Z_V: function (v) {
			if (v) {
				this.out.$write_I_V(1);
			} else {
				this.out.$write_I_V(0);
			}
		},
		superClass: javaRoot.$java.$io.$OutputStream,
		//__proto__: javaRoot.$java.$io.$OutputStream.prototype
	};
	js2me.findPackage('javaRoot.$java.$io')['$DataOutputStream'] = DataOutputStream ;
})();

