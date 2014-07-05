js2me.createClass({
	init: function (noMoreLists) {
		this.choiceButton = document.getElementById('choice');
		this.backButton = document.getElementById('back');
		this.commands = [];
		this.choiceCommands = [];
		this.backCommands = [];
		var displayable = this;
		displayable.currentCommands = [];
	},
	/*
	 * public void setTitle(String s)
	 */
	$setTitle$Ljava_lang_String_$V: function (s) {
		this.title = s;
	},
	/*
	 * public String getTitle()
	 */
	$getTitle$$Ljava_lang_String_: function () {
		return this.title;
	},
	/*
	 * public int getWidth()
	 */
	$getWidth$$I: function () {
		return js2me.config.width;
	},
	/*
	 * public int getHeight()
	 */
	$getHeight$$I: function () {
		return js2me.config.height;
	},
	/*
	 * public void addCommand(Command cmd)
	 */
	$addCommand$Ljavax_microedition_lcdui_Command_$V: function (command) {
		if (this.commands.indexOf(command) == -1) {
			this.commands.push(command);
			this.refreshCommands();
		}
	},
	/*
	 * public void removeCommand(Command cmd)
	 */
	$removeCommand$Ljavax_microedition_lcdui_Command_$V: function (command) {
		var index = this.commands.indexOf(command);
		if (index != -1) {
			var lastCommand = this.commands.pop();
			if (command != lastCommand) {
				this.commands[index] = lastCommand;
			}
			this.refreshCommands();
		}
	},
	/*
	 * public void setCommandListener(CommandListener l)
	 */
	$setCommandListener$Ljavax_microedition_lcdui_CommandListener_$V: function (commandListener) {
		this.commandListener = commandListener;
	},
	/*
	 * public boolean isShown()
	 */
	$isShown$$Z: function () {
		if (this.element.parentNode != null) {
			return 1;
		} else {
			return 0;
		}
	},
	refreshCommands: function () {
		//TODO: no multicommands
		if (!this.active) {
			return;
		}
		this.choiceCommands = [];
		this.backCommands = [];
		this.choiceButton.innerHTML = '&nbsp;';
		this.backButton.innerHTML = '&nbsp;';
		for (var i in this.commands) {
			var command = this.commands[i];
			if (command.commandType == command.$BACKI || command.commandType == command.$EXITI ||
				command.commandType == command.$CANCELI || command.commandType == command.$STOPI) {
				this.backCommands.push(command);
			} else {
				this.choiceCommands.push(command);
			}
			
		}
		if (this.choiceCommands.length == 1) {
			this.choiceButton.innerHTML = this.choiceCommands[0].label.text;
		}
		if (this.choiceCommands.length > 1) {
			this.choiceButton.innerHTML = 'More...';
		}
		if (this.backCommands.length == 1) {
			this.backButton.innerHTML = this.backCommands[0].label.text;
		}
		if (this.backCommands.length > 1) {
			this.backButton.innerHTML = 'More...';
		}
	}
});
