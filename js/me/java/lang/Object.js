js2me.createClass({
	/*
	 * public Object()
	 */
	_init$$V: function () {
	},
	classCache: [],
	/*
	 * public final Class getClass()
	 */
	$getClass$$Ljava_lang_Class_: function () {
		var cls = this.classCache[this.className];
		if (cls == null) {
			cls = new javaRoot.$java.$lang.$Class(this.className);
			this.classCache[this.className] = cls;
		}
		return cls;
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var text = this.className + ':' + this.$hashCode$$I();
		return new javaRoot.$java.$lang.$String(text);
	},
	/*
	 * 
	 */
	$wait$J$V: js2me.markUnsafe(function (timeout) {
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
	}),
	/*
	 * 
	 */
	$wait$$V: js2me.markUnsafe(function () {
		this.$wait$J$V({hi: 0, lo: 0});
	}),
	/*
	 * public int hashCode()
	 */
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
	/*
	 * public final void notify()
	 */
	$notify$$V: function () {
		var threadId = this.waiting.pop();
		setTimeout(function () {
			js2me.restoreThread(threadId);
		}, 1);
	},
	/*
	 * public boolean equals(Object obj)
	 */
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (this == obj) {
			return 1;
		} else {
			return 0;
		}
	},
	isImplement: function (className) {
		if (this.className == className) {
			return true;
		}
		for (var i = 0; this.interfaces && i < this.interfaces.length; i++) {
			var interface = js2me.findClass(this.interfaces[i]).prototype;
			if (interface.isImplement(className)) {
				return true;
			}
		}
		if (this.superClass) {
			var superClass = js2me.findClass(this.superClass).prototype;
			if (superClass.isImplement(className)) {
				return true;
			}
		}
		return false;
	}
});
