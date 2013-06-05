js2me.createClass({
	_init$Ljava_lang_String_ZII$V: function (label, interactive, maxValue, initialValue) {
		if (maxValue < 0) {
			throw new javaRoot.$java.$lang.IllegalArgumentException();
		}
		this.gauge = document.createElement('input');
		this.gauge.type = 'range';
		this.gauge.min = 0;
		this.gauge.max = maxValue;
		if (interactive == 0) {
			this.gauge.disabled = true;
		}
		this.content.appendChild(this.gauge);
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'
});
