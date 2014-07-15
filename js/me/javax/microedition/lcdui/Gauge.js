js2me.createClass({
	/*
	 * public Gauge(String label, boolean interactive, int maxValue, int initialValue)
	 */
	_init$Ljava_lang_String_ZII$V: function (label, interactive, maxValue, initialValue) {
		if (maxValue < 0 && maxValue != -1) {
			throw new javaRoot.$java.$lang.IllegalArgumentException();
		}
		this.gauge = document.createElement('input');
		this.gauge.type = 'range';
		this.gauge.min = 0;
		this.gauge.max = maxValue;
		if (interactive == 0) {
			this.gauge.disabled = true;
		}
		this.$setValue$I$V(initialValue);
		this.content.appendChild(this.gauge);
	},
	/*
	 * public void setValue(int value)
	 */
	$setValue$I$V: function (value) {
		this.gauge.value = value;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item',
	require: ['javaRoot.$java.$lang.IllegalArgumentException']
});
