js2me.createClass({
	$exit$I$V: function (status) {
		console.log('EXIT ' + status);
		js2me.kill = true;
	},
	$freeMemory$$J: function () {
		return new js2me.Long(0, 500000);
	},
	$gc$$V: function () {
		// Calling the gc method suggests that the Java Virtual Machine expend effort toward recycling unused objects (...)
		// Ignore the suggestion...
	},
	$getRuntime$$Ljava_lang_Runtime_: function () {
		return new javaRoot.$java.$lang.$Runtime();
	},
	$totalMemory$$J: function () {
		// the total amount of memory currently available for current and future objects, measured in bytes.
		// here you are...
		return new js2me.Long(0, 1000000);
	}
});
