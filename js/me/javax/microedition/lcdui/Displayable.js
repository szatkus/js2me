js2me.createClass({
	init: function () {
		this.choiceButton = document.getElementById('choice');
		this.backButton = document.getElementById('back');
		this.commands = [];
		this.commandListener = null;
		this.choiceCommands = [];
		this.backCommands = [];
		var displayable = this;
		displayable.currentCommands = [];
		var moreMenuListener = {
			$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V: function () {
				var command = displayable.currentCommands[displayable.moreList.$getSelectedIndex__I()];
				displayable.display.$setCurrent_Ljavax_microedition_lcdui_Displayable__V(displayable);
				displayable.commandListener.$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V(command, displayable);
			}
		};
		if (this.moreList == null) {
			javaRoot.$javax.$microedition.$lcdui.$Displayable.prototype.moreList = {};
			var list = new javaRoot.$javax.$microedition.$lcdui.$List();
			javaRoot.$javax.$microedition.$lcdui.$Displayable.prototype.moreList = list;
		}
		this.choiceButton.addEventListener('mousedown', function () {
			if (displayable.commandListener && displayable.active) {
				displayable.currentCommands = displayable.choiceCommands;
				if (displayable.choiceCommands.length == 1) {
					displayable.commandListener.$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V(displayable.choiceCommands[0], displayable);
				}
				if (displayable.choiceCommands.length > 1) {
					displayable.display.$setCurrent_Ljavax_microedition_lcdui_Displayable__V(displayable.moreList);
					displayable.moreList.$setCommandListener_Ljavax_microedition_lcdui_CommandListener__V(moreMenuListener);
					displayable.moreList.$deleteAll__V();
					for (var i = 0; i < displayable.currentCommands.length; i++) {
						displayable.moreList.$append_Ljava_lang_String_Ljavax_microedition_lcdui_Image__I(displayable.currentCommands[i].label, null);
					}
				}
			}
		});
		this.backButton.addEventListener('mousedown', function () {
			if (displayable.backCommands.length == 1 && displayable.commandListener) {
				displayable.commandListener.$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V(displayable.backCommands[0], displayable);
			}
		});
	},
	$setTitle_Ljava_lang_String__V: function (s) {
		this.title = s;
	},
	$getWidth__I: function () {
		return js2me.width;
	},
	$getHeight__I: function () {
		return js2me.height;
	},
	$addCommand_Ljavax_microedition_lcdui_Command__V: function (command) {
		if (this.commands.indexOf(command) == -1) {
			this.commands.push(command);
			this.refreshCommands();
		}
	},
	$removeCommand_Ljavax_microedition_lcdui_Command__V: function (command) {
		var index = this.commands.indexOf(command);
		if (index != -1) {
			var lastCommand = this.commands.pop();
			if (command != lastCommand) {
				this.commands[index] = lastCommand;
			}
			this.refreshCommands();
		}
	},
	$setCommandListener_Ljavax_microedition_lcdui_CommandListener__V: function (commandListener) {
		this.commandListener = commandListener;
	},
	$isShown__Z: function () {
		return this.element.parentNode != null;
	},
	refreshCommands: function () {
		//TODO: no multicommands
		if (!this.active) {
			return;
		}
		this.choiceCommands = [];
		this.backCommands = [];
		this.choiceButton.innerHTML = '';
		this.backButton.innerHTML = '';
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
	},
	require: ['javaRoot.$javax.$microedition.$lcdui.$List'],
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Displayable'
});
