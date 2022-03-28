js2me.createClass({
	/*
	 * public void exit(int status)
	 */
	$exit$I$V: function (status) {
		console.log('EXIT ' + status);
		js2me.kill = true;
	},
	/*
	 * public long freeMemory()
	 */
	$freeMemory$$J: function () {
		return {hi: 0, lo: 500000};
	},
	/*
	 * public void gc()
	 */
	$gc$$V: function () {
		// Calling the gc method suggests that the Java Virtual Machine expend effort toward recycling unused objects (...)
		// Ignore the suggestion...
	},
	/*
	 * public static Runtime getRuntime()
	 */
	$getRuntime$$Ljava_lang_Runtime_: function () {
		return new javaRoot.$java.$lang.$Runtime();
	},
	/*
	 * public long totalMemory()
	 */
	$totalMemory$$J: function () {
		// the total amount of memory currently available for current and future objects, measured in bytes.
		// here you are...
		return {hi: 0, lo: 1000000};
	}
});
