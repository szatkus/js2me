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
	/*
	 * public void addCommand(Command cmd)
	 */
	$addCommand$Ljavax_microedition_lcdui_Command_$V: function (command) {
		this.command = command;
	},
	/*
	 * public String getLabel()
	 */
	$getLabel$$Ljava_lang_String_: function (str) {
		return new javaRoot.$java.$lang.$String(this.label.innerHTML);
	},
	$setDefaultCommand$Ljavax_microedition_lcdui_Command_$V: function (command) {
		this.command = command;
	},
	/*
	 * public void setItemCommandListener(ItemCommandListener l)
	 */
	$setItemCommandListener$Ljavax_microedition_lcdui_ItemCommandListener_$V: function (listener) {
		this.itemListener = listener;
	},
	/*
	 * public void setLayout(int layout)
	 */
	$setLayout$I$V: function (layout) {
		if (layout == this.$LAYOUT_RIGHTI) {
			this.content.style.textAlign = 'right';
		}
		if (layout == this.$LAYOUT_CENTERI) {
			this.content.style.textAlign = 'center';
		}
	},
	/*
	 * public void setLabel(String label)
	 */
	$setLabel$Ljava_lang_String_$V: function (str) {
		if (str != null) {
			this.label.innerHTML = str.text;
		} else {
			this.label.innerHTML = '';
		}
	}
});
	

