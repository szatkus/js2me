js2me.createClass({
	$LAYOUT_DEFAULTI: 0,
	$LAYOUT_LEFTI: 1,
	$LAYOUT_RIGHTI: 2,
	$LAYOUT_CENTERI: 3,
	$LAYOUT_NEWLINE_BEFOREI: 0x100,
	$LAYOUT_NEWLINE_AFTERI: 0x200,
	construct: function () {
		this.element = document.createElement('div');
		this.element.className = 'item';
		this.label = document.createElement('div');
		this.label.className = 'label';
		this.content = document.createElement('div');
		this.content.className = 'content';
		this.element.appendChild(this.label);
		this.element.appendChild(this.content);
	},
	$setLabel$Ljava_lang_String_$V: function (str) {
		this.label.innerHTML = str.text;
	},
	$getLabel$$Ljava_lang_String_: function (str) {
		return new javaRoot.$java.$lang.$String(this.label.innerHTML);
	},
	name: '$Item',
	package: 'javaRoot.$javax.$microedition.$lcdui'
});
	

