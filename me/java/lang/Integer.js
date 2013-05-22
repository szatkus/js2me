(function () {
	function Integer() {
	}
	Integer.prototype = {
		$toString_I_Ljava_lang_String_: function (i) {
			return i.toString();
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Integer'] = Integer;
})();

