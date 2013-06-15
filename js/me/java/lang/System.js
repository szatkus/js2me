js2me.createClass({
	$currentTimeMillis$$J: function () {
		var time = (new Date()).getTime();
		return new js2me.Long(Math.floor(time / 0x100000000), time % 0x100000000);
	},
	_clinit$$V: function (callback) {
		javaRoot.$java.$lang.$System.prototype.$outLjava_io_PrintStream_ = new javaRoot.$java.$io.$PrintStream({
			buffer: '',
			$write$_B$V: function (b) {
				for (var i in b) {
					this.$write$B$V(b[i]);
				}
			},
			$write$B$V: function (b) {
				if (b == 10) {
					console.log(this.buffer);
					this.buffer = '';
				} else {
					if (typeof b == 'number') {
						this.buffer += String.fromCharCode(b);
					} else {
						this.buffer += b;
					}
				}
			}
			
		});
		callback();
	},
	$arraycopy$Ljava_lang_Object_ILjava_lang_Object_II$V: function (src, srcPosition, dst, dstPosition, length) {
		if (src == null || dst == null) {
			throw new javaRoot.$java.$lang.$NullPointerException;
		}
		for (var i = 0; i < length; i++) {
			dst[dstPosition + i] = src[srcPosition + i];
		}
	},
	$gc$$V: function () {
		// Calling the gc method suggests that the Java Virtual Machine expend effort toward recycling unused objects (...)
		// Ignore the suggestion...
	},
	$getProperty$Ljava_lang_String_$Ljava_lang_String_: function (key) {
		console.log('Asking for property ' + key.text);
		if (key.text == 'microedition.platform') {
			return new javaRoot.$java.$lang.$String('js2me/m3');
		}
	},
	require: ['javaRoot.$java.$io.$PrintStream'],
	package: 'javaRoot.$java.$lang',
	name: '$System'
});

