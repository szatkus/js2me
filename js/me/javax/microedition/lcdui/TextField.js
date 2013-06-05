js2me.createClass({
	_init$Ljava_lang_String_Ljava_lang_String_II$V: function (label, text, maxSize, constraints) {
		//TODO: constraints
		this.$setLabel$Ljava_lang_String_$V(label);
		this.input = document.createElement('input');
		this.input.maxLength = maxSize;
		this.input.value = text.text;
		this.content.appendChild(this.input);
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item',
	name: '$TextField',
	package: 'javaRoot.$javax.$microedition.$lcdui'
});
	

