js2me.createClass({
	$YEARI: 1,
	$MONTH: 2,
	$DATEI: 5,
	$DAY_OF_WEEKI: 7,
	$HOURI: 10,
	$AM_PMI: 9,
	$MINUTEI: 12,
	$SECONDI: 13,
	$MILISECONDI: 14,
	construct: function () {
		this.date = new Date();
	},
	$getInstance$$Ljava_util_Calendar_: function () {
		return new javaRoot.$java.$util.$Calendar();
	},
	$setTime$Ljava_util_Date_$V: function (date) {
		this.date = date.date;
	},
	$get$I$I: function (field) {
		if (field == this.$YEARI) {
			return this.date.getFullYear();
		}
		throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException('Calendar: field not supported ' + field);
	}
});
