js2me.createClass({
	construct: function () {
		this.date = new Date();
	},
	/*
	 * public static TimeZone getTimeZone(String ID)
	 */
	$getTimeZone$Ljava_lang_String_$Ljava_util_TimeZone_: function (id) {
		console.log(id);
		return new javaRoot.$java.$util.$TimeZone();
	}
});
