js2me.createClass({
	$getRuntime$$Ljava_lang_Runtime_: function () {
		return new javaRoot.$java.$lang.$Runtime();
	},
	$gc$$V: function () {
		// the total amount of memory currently available for current and future objects, measured in bytes.
		// here you are...
		return new js2me.Long(0, 999999999);
	},
	$freeMemory$$J: function () {
		return new js2me.Long(0, 2000000);
	}
});
