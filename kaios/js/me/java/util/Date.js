js2me.createClass({
	construct: function (date) {
		this.date = date || new Date();
	},
	/*
	 * public Date()
	 */
	_init$$V: function () {
		this.date = new Date();
	},
	/*
	 * public Date(long date)
	 */
	_init$J$V: function (date) {
		this.date = new Date(date.hi * 0x100000000 + date.lo);
	},
	/*
	 * public boolean equals(Object obj)
	 */
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (!obj  || obj.className != this.className || obj.date.getTime() != this.date.getTime()) {
			return 0;
		} else {
			return 1;
		}
	},
	/*
	 * public long getTime()
	 */
	$getTime$$J: function () {
		var hi = Math.floor(this.date.getTime() / 0x100000000);
		var lo = this.date.getTime() % 0x100000000;
		return {hi: hi, lo: lo};
	},
	/*
	 * public int hashCode()
	 */
	$hashCode$$I: function () {
		var time = this.$getTime$$J();
		return time.hi ^ time.lo;
	},
	/*
	 * public void setTime(long time)
	 */
	$setTime$J$V: function (date) {
		this._init$J$V(date);
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.date.toString());
	},
});
