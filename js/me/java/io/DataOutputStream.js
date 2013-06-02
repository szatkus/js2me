js2me.createClass({
	_init$Ljava_io_OutputStream_$V : function (out) {
		this.out = out;
	},
	$writeBoolean$Z$V: function (v) {
		if (v) {
			this.out.$write$I$V(1);
		} else {
			this.out.$write$I$V(0);
		}
	},
	$writeInt$I$V: function (value) {
		if (value < 0) {
			value += 0xFFFFFFFF;
		}
		var buffer = [];
		for (var i = 0; i < 4; i++) {
			buffer[i] = value & 0xFF;
			value = value >> 8;
		}
		buffer.reverse();
		this.out.$write$_B$V(buffer);
	},
	$writeByte$I$V: function (value) {
		if (value < 0) {
			value += 0xFF;
		}
		this.out.$write$_B$V(value);
	},
	$writeLong$J$V: function (value) {
		this.$writeInt$I$V(value.hi);
		this.$writeInt$I$V(value.lo);
	},
	$writeUTF$Ljava_lang_String_$V: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.out.$write$I$V((str.text.length & 0xFF00) >> 8);
		this.out.$write$I$V(str.text.length & 0xFF);
		this.out.$write$_B$V(str.$getBytes$$_B());
	},
	$flush$$V: function () {
		this.out.$flush$$V();
	},
	$close$$V: function () {
		this.out.$close$$V();
	},
	superClass: 'javaRoot.$java.$io.$OutputStream',
	package: 'javaRoot.$java.$io',
	name: '$DataOutputStream'
});

