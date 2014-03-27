js2me.createClass({
	$YEARI: 1,
	$MONTH: 2,
	$DATEI: 5,
	$DAY_OF_WEEKI: 7,
	$HOURI: 10,
	$HOUR_OF_DAYI: 11,
	$AM_PMI: 9,
	$MINUTEI: 12,
	$SECONDI: 13,
	$MILISECONDI: 14,
	construct: function () {
		this.date = new Date();
	},
	/*
	 * public static Calendar getInstance()
	 */
	$getInstance$$Ljava_util_Calendar_: function () {
		return new javaRoot.$java.$util.$Calendar();
	},
	/*
	 * public static Calendar getInstance(TimeZone zone)
	 */
	$getInstance$Ljava_util_TimeZone_$Ljava_util_Calendar_: function () {
		return new javaRoot.$java.$util.$Calendar();
	},
	/*
	 * public final void setTime(Date date)
	 */
	$setTime$Ljava_util_Date_$V: function (date) {
		this.date = date.date;
	},
	/*
	 * public final Date getTime()
	 */
	$get$I$I: function (field) {
		if (field == this.$YEARI) {
			return this.date.getFullYear();
		}
		if (field == this.$HOURI) {
			return this.date.getHours() % 12;
		}
		if (field == this.$HOUR_OF_DAYI) {
			return this.date.getHours();
		}
		if (field == this.$MINUTEI) {
			return this.date.getMinutes();
		}
		if (field == this.$SECONDI) {
			return this.date.getSeconds();
		}
		if (field == this.$DAY_OF_WEEKI) {
			return this.date.getDay() + 1;
		}
		throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException('Calendar: field not supported ' + field);
	}
});
