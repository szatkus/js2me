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
	$wait$J$V: function (timeout) {
		var threadId = js2me.currentThread;
		if (this.waiting == null) {
			this.waiting = [];
		}
		this.waiting.push(threadId);
		var waiting = this.waiting;
		js2me.suspendThread = true;
		if (timeout.lo > 0) {
			setTimeout(function () {
				var i = 0;
				while (waiting[i] != threadId) {
				}
				waiting[i] = waiting[waiting.length - 1];
				waiting.pop();
				js2me.restoreThread(threadId);
			}, timeout.lo);
		}
	},
	$wait$$V: function () {
		
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
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (this == obj) {
			return 1;
		} else {
			return 0;
		}
	},
	name: '$Object',
	package: 'javaRoot.$java.$lang'
});
