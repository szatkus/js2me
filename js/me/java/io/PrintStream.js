js2me.createClass({
	construct: function (output) {
		this.output = output;
	},
	$println$Ljava_lang_String_$V: function (x) {
		this.$print$Ljava_lang_String_$V(x);
		this.output.$write$B$V(10);
	},
	$print$Ljava_lang_String_$V: function (x) {
		for (var i = 0; i < x.text.length; i++) {
			this.output.$write$B$V(x.text.charCodeAt(i));
		}
	},
	$println$I$V: function (x) {
		this.$print$I$V(x);
		this.output.$write$B$V(10);
	},
	$print$I$V: function (x) {
		this.output.$write$_B$V(x.toString());
	},
	$println$J$V: function (x) {
		this.output.$write$_B$V(x.toString());
		this.output.$write$B$V(10);
	},
	$println$Ljava_lang_Object_$V: function (obj) {
		this.$println$Ljava_lang_String_$V(obj.$toString$$Ljava_lang_String_());
	},
	package: 'javaRoot.$java.$io',
	name: '$PrintStream'
});

