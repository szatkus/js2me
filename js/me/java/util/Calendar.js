js2me.createClass({
	$YEARI: 1,
	$MONTHI: 2,
	$DATEI: 5,
	$DAY_OF_MONTHI: 5,
	$DAY_OF_WEEKI: 7,
	$HOURI: 10,
	$HOUR_OF_DAYI: 11,
	$AM_PMI: 9,
	$MINUTEI: 12,
	$SECONDI: 13,
	$MILLISECONDI: 14,
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
		if (field == this.$DAY_OF_MONTHI) {
			return this.date.getDate();
		}
		if (field == this.$MONTHI) {
			return this.date.getMonth();
		}
		if (field == this.$MILLISECONDI) {
			return this.date.getMilliseconds();
		}
		throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException('Calendar: field not supported ' + field);
	},
	/*
	 * public final Date getTime()
	 */
	$getTime$$Ljava_util_Date_: function () {
		return new javaRoot.$java.$util.$Date(new Date(this.date.getTime()));
	},
	/*
	 * set(int field, int value) 
	 */
	$set$II$V: function (field, value) {
		if (field == this.$YEARI) {
			return this.date.setFullYear(value);
		}
		if (field == this.$HOURI) {
			return this.date.setHours(value);
		}
		if (field == this.$HOUR_OF_DAYI) {
			return this.date.setHours(value);
		}
		if (field == this.$MINUTEI) {
			return this.date.setMinutes(value);
		}
		if (field == this.$SECONDI) {
			return this.date.setSeconds(value);
		}
		if (field == this.$DAY_OF_MONTHI) {
			return this.date.setDate(value);
		}
		if (field == this.$MONTHI) {
			return this.date.setMonth(value);
		}
		if (field == this.$MILLISECONDI) {
			return this.date.getMilliseconds(value);
		}
		throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException('Calendar: field not supported ' + field);
	},
	/*
	 * public final void setTime(Date date)
	 */
	$setTime$Ljava_util_Date_$V: function (date) {
		this.date = date.date;
	},
});
