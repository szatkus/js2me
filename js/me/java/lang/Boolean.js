js2me.createClass({
	$TRUELjava_lang_Boolean_: 'true',
	$FALSELjava_lang_Boolean_: 'false',
	_clinit$$V: function (callback) {
		js2me.statics.$true = new javaRoot.$java.$lang.$Boolean();
		js2me.statics.$true.value = 1;
		js2me.statics.$false = new javaRoot.$java.$lang.$Boolean();
		js2me.statics.$false.value = 0;
		callback();
	},
	/*
	 * public Boolean(boolean value)
	 */
	_init$Z$V: function (value) {
		this.value = value;
	},
	/*
	 * public boolean booleanValue()
	 */
	$booleanValue$$Z: function () {
		return this.value;
	},
	/*
	 * public boolean equals(Object obj)
	 */
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (obj && obj.className === 'javaRoot.$java.$lang.$Boolean' && obj.value === this.value) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public int hashCode()
	 */
	$hashCode$$I: function () {
		if (this.value === 1) {
			return 1231;
		} else {
			return 1237;
		}
	},
	$toString$$Ljava_lang_String_: function () {
		if (this.value === 1) {
			return new javaRoot.$java.$lang.$String('true');
		} else {
			return new javaRoot.$java.$lang.$String('false');
		}
	}
});
