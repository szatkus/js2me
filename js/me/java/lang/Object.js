js2me.createClass({
	_init__V: function () {
	},
	$getClass__Ljava_lang_Class_: function () {
		return new javaRoot.$java.$lang.$Class(this.className);
	},
	$wait__V: function () {
		if (this.waiting == null) {
			this.waiting = [];
		}
		this.waiting.push(js2me.currentThread);
		js2me.suspendThread = true;
	},
	$hashCode__I: function () {
		
		if (js2me.lastHash == null) {
			js2me.lastHash = 1;
		}
		if (this.hashCode == null) {
			this.hashCode = js2me.lastHash;
			js2me.lastHash++;
		}
		return this.hashCode;
	},
	name: '$Object',
	package: 'javaRoot.$java.$lang'
});
