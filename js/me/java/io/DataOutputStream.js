js2me.createClass({
	_init_Ljava_io_OutputStream__V : function (out) {
		this.out = out;
	},
	$writeBoolean_Z_V: function (v) {
		if (v) {
			this.out.$write_I_V(1);
		} else {
			this.out.$write_I_V(0);
		}
	},
	$writeInt_I_V: function (value) {
		if (value < 0) {
			value += 0xFFFFFFFF;
		}
		var buffer = [];
		for (var i = 0; i < 4; i++) {
			buffer[i] = value & 0xFF;
			value = value >> 8;
		}
		buffer.reverse();
		this.out.$write__B_V(buffer);
	},
	$writeUTF_Ljava_lang_String__V: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.out.$write_I_V((str.text.length & 0xFF00) >> 8);
		this.out.$write_I_V(str.text.length & 0xFF);
		for (var i = 0; i < str.text.length; i++) {
			var char = str.text.charCodeAt(i);
			if (char >= 0x01 && char <= 0x007F) {
				this.out.$write_I_V(char);
			}
			if (char == 0 || (char >= 0x0080 && char <= 0x07FF)) {
				this.out.$write_I_V(0xC0 | (0x1F & (char >> 6)));
				this.out.$write_I_V(0x80 | (0x3F & char));
			}
			if (char >= 0x0800 && char <= 0xFFFF) {
				this.out.$write_I_V(0xE0 | (0x0F & (char >> 12)));
				this.out.$write_I_V(0x80 | (0x3F & (char >>  6)));
				this.out.$write_I_V(0x80 | (0x3F & char));
			}
			if (char > 0xFFFF) {
				throw new javaRoot.$java.$io.$UTFDataFormatException();
			}
		}
		
	},
	$flush__V: function () {
		this.out.$flush__V();
	},
	$close__V: function () {
		this.out.$close__V();
	},
	superClass: 'javaRoot.$java.$io.$OutputStream',
	package: 'javaRoot.$java.$io',
	name: '$DataOutputStream'
});

