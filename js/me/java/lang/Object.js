js2me.createClass({
	_init$$V: function () {
	},
	$getClass$$Ljava_lang_Class_: function () {
		return new javaRoot.$java.$lang.$Class(this.className);
	},
	$toString$$Ljava_lang_String_: function () {
		var text = this.className + ':' + this.$hashCode__I();
		return new javaRoot.$java.$lang.$String(text);
	},
	$wait$$V: function () {
		if (this.waiting == null) {
			this.waiting = [];
		}
		this.waiting.push(js2me.currentThread);
		js2me.suspendThread = true;
	},
	$hashCode$$I: function () {
		
		if (js2me.lastHash == null) {
			js2me.lastHash = 1;
		}
		if (this.hashCode == null) {
			this.hashCode = js2me.lastHash;
			js2me.lastHash++;
		}
		return this.hashCode;
	},
	$notify$$V: function () {
		var threadId = this.waiting.pop();
		setTimeout(function () {
			js2me.restoreThread(threadId);
		}, 1);
	},
	name: '$Object',
	package: 'javaRoot.$java.$lang'
});
