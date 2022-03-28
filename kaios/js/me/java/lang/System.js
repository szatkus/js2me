js2me.createClass({
	properties: {
		'microedition.configuration': 'cdc',
		'microedition.encoding': 'UTF-8',
		'microedition.locale': 'en-US',
		'microedition.platform': 'js2me/1.1',
		'file.separator': '/',
		'fileconn.dir.memorycard': 'file:///sdcard/'
	},
	$outLjava_io_PrintStream_: 'out',
	/*
	 * public static long currentTimeMillis()
	 */
	$currentTimeMillis$$J: function () {
		var time = Date.now();
		return {hi: ~~(time / 0x100000000), lo: time % 0x100000000};
	},
	_clinit$$V: function (callback) {
		// disable output in app
		js2me.statics['$out'] = new javaRoot.$java.$io.$PrintStream({
			buffer: '',
			$write$_B$V: function (b) {
				if (!js2me.config.app) {
					for (var i in b) {
						this.$write$I$V(b[i]);
					}
				}
			},
			$write$I$V: function (b) {
				if (!js2me.config.app) {
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
			}
			
		});
		callback();
	},
	/*
	 * public static void gc()
	 */
	$gc$$V: function () {
		javaRoot.$java.$lang.$Runtime.prototype.$getRuntime$$Ljava_lang_Runtime_().$gc$$V();
	},
	/*
	 * public static void arraycopy(Object src, int src_position, Object dst, int dst_position, int length)
	 */
	$arraycopy$Ljava_lang_Object_ILjava_lang_Object_II$V: function (src, srcPosition, dst, dstPosition, length) {
		if (src == null || dst == null) {
			throw new javaRoot.$java.$lang.$NullPointerException;
		}
		var buffer = [];
		for (var i = 0; i < length; i++) {
			buffer[i] = src[srcPosition + i];
		}
		for (var i = 0; i < length; i++) {
			dst[dstPosition + i] = buffer[i];
		}
	},
	/*
	 * public static String getProperty(String key)
	 */
	$getProperty$Ljava_lang_String_$Ljava_lang_String_: function (key) {
		console.log('Asking for property ' + key.text);
		if (key.text === 'fileconn.dir.private') {
			return new javaRoot.$java.$lang.$String('file:///dirs/' + js2me.manifest['midlet-name'] + '/');
		}
		if (this.properties[key.text]) {
			return new javaRoot.$java.$lang.$String(this.properties[key.text]);
		} else {
			return null;
		}
	},
	require: ['javaRoot.$java.$io.$PrintStream', 'javaRoot.$java.$lang.$Runtime']
});

