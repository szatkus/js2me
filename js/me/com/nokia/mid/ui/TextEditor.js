js2me.createClass({
	/*
	 * public static TextEditor createTextEditor(int maxSize, int constraints, int width, int rows)
	 */
	$createTextEditor$IIII$Lcom_nokia_mid_ui_TextEditor_: function (maxSize, constraints, width, rows) {
		var editor = new javaRoot.$com.$nokia.$mid.$ui.$TextEditor();
		editor.maxSize = maxSize;
		editor.constraints = constraints;
		editor.width = width;
		editor.rows = rows;
		var element = document.createElement('input');
		var observer = new MutationObserver(function (data) {
			if (!this.parent) {
				return;
			}
			//TODO: do something smarter
			if (data[1].addedNodes.indexOf(this.parent.element) !== -1 || data[1].removedNodes.indexOf(this.parent.element) !== -1) {
				editor.refreshState();
			}
		});
		observer.observe(document.getElementById('screen'), {childList: true});
		element.className = 'TextEditor';
		element.maxLength = maxSize;
		element.style.width = width + "px";
		document.body.appendChild(element);
		editor.element = element;
		editor.margin = document.getElementById('screen').offsetLeft;
		editor.$setPosition$II$V(0, 0);
		
		return editor;
	},
	/*
	 * public java.lang.String getContent()
	 */
	$getContent$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.element.value);
	},
	/*
	 * public int getContentHeight()
	 */
	$getContentHeight$$I: function () {
		return 50;
	},
	/*
	 * public boolean hasFocus()
	 */
	$hasFocus$$Z: function () {
		if (this.element === document.activeElement) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public javax.microedition.lcdui.Font getFont()
	 */
	$getFont$$Ljavax_microedition_lcdui_Font_: function () {
		return javaRoot.$javax.$microedition.$lcdui.$Font.prototype.$getDefaultFont$$Ljavax_microedition_lcdui_Font_();
	},
	/*
	 * public int getForegroundColor()
	 */
	$getForegroundColor$$I: function () {
		return this.fgColor;
	},
	/*
	 * public int getHeight()
	 */
	$getHeight$$I: function () {
		return this.height;
	},
	/*
	 * public int getLineMarginHeight()
	 */
	$getLineMarginHeight$$I: function () {
		if (this.height) {
			return this.height;
		} else {
			return 0;
		}
	},
	/*
	 * public int getVisibleContentPosition()
	 */
	$getVisibleContentPosition$$I: function () {
		return 0;
	},
	/*
	 * public int getMaxSize()
	 */
	$getMaxSize$$I: function () {
		return this.maxSize;
	},
	/*
	 * public int getWidth()
	 */
	$getWidth$$I: function () {
		return this.width;
	},
	/*
	 * public void insert(java.lang.String text, int position)
	 */
	$insert$Ljava_lang_String_I$V: function (str, position) {
		this.element.value = this.element.value.substring(0, position) + str.text + this.element.value.substring(position);
	},
	/*
	 * public boolean isMultiline()
	 */
	$isMultiline$$Z: function () {
		return this.isMultiline;
	},
	/*
	 * public bool isVisible()
	 */
	$isVisible$$Z: function () {
		return this.isVisible;
	},
	/*
	 * public void setBackgroundColor(int color)
	 */
	$setBackgroundColor$I$V: function (color) {
		this.bgColor = color;
	},
	/*
	 * public void setCaret(int index)
	 */
	$setCaret$I$V: function (position) {
		this.element.selectionStart = position;
		this.element.selectionEnd = position;
	},
	/*
	 * public void setContent(java.lang.String content)
	 */
	$setContent$Ljava_lang_String_$V: function (str) {
		this.element.value = str.text;
	},
	/*
	 * public void setFocus(boolean focused)
	 */
	$setFocus$Z$V: function (value) {
		this.element.focus();
	},
	/*
	 * public void setFont(javax.microedition.lcdui.Font font)
	 */
	$setFont$Ljavax_microedition_lcdui_Font_$V: function () {
		// don't care about font
	},
	/*
	 * public void setForegroundColor(int color)
	 */
	$setForegroundColor$I$V: function (color) {
		this.fgColor = color;
		this.element.style.color = '#' + color.toString(16);
	},
	/*
	 * public int setMaxSize(int maxSize)
	 */
	$setMaxSize$I$I: function (maxSize) {
		this.maxSize = maxSize;
		this.element.maxLength = maxSize;
	},
	/*
	 * public void setMultiline(boolean aMultiline)
	 */
	$setMultiline$Z$V: function (value) {
		this.isMultiline = value;
		if (value) {
			console.error('TextEditor: multiple lines?');
		}
	},
	/*
	 * public void setParent(java.lang.Object theParent)
	 */
	$setParent$Ljava_lang_Object_$V: function (parent) {
		this.parent = parent;
		this.refreshState();
	},
	/*
	 * public void setPosition(int x, int y)
	 */
	$setPosition$II$V: function (x, y) {
		this.x = x;
		this.y = y;
		this.refreshState();
	},
	/*
	 * public void setSize(int width, int height)
	 */
	$setSize$II$V: function (width, height) {
		this.width = width;
		this.height = height;
		this.refreshState();
	},
	/*
	 * public void setTextEditorListener(TextEditorListener listener)
	 */
	$setTextEditorListener$Lcom_nokia_mid_ui_TextEditorListener_$V: function (listener) {
		this.listener = listener;
	},
	/*
	 * public void setVisible(boolean visible)
	 */
	$setVisible$Z$V: function (value) {
		this.isVisible = value;
		this.refreshState();
	},
	/*
	 * public int size()
	 */
	$size$$I: function () {
		return this.element.value.length;
	},
	refreshState: function () {
		if (this.parent) {
			this.element.style.left = (this.parent.element.offsetLeft + this.margin + this.x * this.parent.getScale()) + 'px';
			this.element.style.top = (this.y * this.parent.getScale()) + 'px';
			this.element.style.width = (this.width * this.parent.getScale()) + 'px';
			this.element.style.height = (this.height * this.parent.getScale()) + 'px';
			if (this.isVisible && this.parent.active) {
				this.element.style.display = 'inline';
			} else {
				this.element.style.display = '';
			}
		}
	},
	superClass: 'javaRoot.$com.$nokia.$mid.$ui.$CanvasItem'
});

