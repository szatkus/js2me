(function () {
	function StringBuffer () {
	}
	StringBuffer.prototype = {
		_init__V: function () {
			this.capacity = 256;
			this.strings = [];
		},
		_init_I_V: function (length) {
			this._init__V();
			this.capacity = length;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$StringBuffer'] = StringBuffer ;
})();

