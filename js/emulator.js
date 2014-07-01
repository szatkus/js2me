(function () {    
	var mapping = [];
	mapping[38] = -1;
	mapping[37] = -3;
	mapping[39] = -4;
	mapping[40] = -2;
	mapping[32] = -5;
	mapping[48] = 48;
	mapping[49] = 49;
	mapping[50] = 50;
	mapping[51] = 51;
	mapping[52] = 52;
	mapping[53] = 53;
	mapping[54] = 54;
	mapping[55] = 55;
	mapping[56] = 56;
	mapping[57] = 57;
	mapping[88] = -7;
	mapping[90] = -6;
	document.onkeydown = function (e) {
		if (mapping[e.which]) {
			if (js2me.config.workers) {
				js2me.worker.postMessage(['sendKeyPressEvent', mapping[e.which]]);
			} else {
				js2me.sendKeyPressEvent(mapping[e.which]);
			}
		}
	};
	document.onkeyup = function (e) {
		if (mapping[e.which]) {
			if (js2me.config.workers) {
				js2me.worker.postMessage(['sendKeyReleasedEvent', mapping[e.which]]);
			} else {
				js2me.sendKeyReleasedEvent(mapping[e.which]);
			}
		}
	};
	window.addEventListener('load', function () {
		document.getElementById('alert').style.display = 'none';
		document.getElementById('alert').addEventListener('click', function () {
			document.getElementById('alert').style.display = 'none';
		});
		var settingsDialog = document.getElementById('settings');
		var screenSizeSelector = document.querySelector('select.screen-size');
		var generateMethodsButton = document.querySelector('button.generate-methods');
		var joypad = document.getElementById('joypad');
		joypad.style.display = 'none';
		document.getElementById('settings-button').addEventListener('click', function () {
			settingsDialog.style.top = 0;
			var screenSize = loadConfig('width') + ',';
			screenSize += loadConfig('height') + ',';
			screenSize += loadConfig('fullHeight');
			var options = screenSizeSelector.options;
			for (var i = 0; i < options.length; i++) {
				if (options[i].value == screenSize) {
					screenSizeSelector.selectedIndex = i;
				}
			}
			generateMethodsButton.disabled = (js2me.manifest == null);
		});
		document.getElementById('open-joypad').addEventListener('click', function () {
			
			if (joypad.style.display === 'none') {
				joypad.style.display = '';
			} else {
				joypad.style.display = 'none';
			}
		});
		generateMethodsButton.addEventListener('click', function () {
			generateMethodsButton.innerHTML = 'Please wait...';
			generateMethodsButton.classList.add('disabled');
			setTimeout(function () {
				js2me.generateAllMethods(true);
				generateMethodsButton.innerHTML = 'Generate methods';
				generateMethodsButton.classList.remove('disabled');
			}, 1);
		});
		settings.querySelector('button.done').addEventListener('click', function () {
			var screenSize = screenSizeSelector.value.split(',');
			localStorage.setItem(js2me.storageName + 'width', screenSize[0]);
			localStorage.setItem(js2me.storageName + 'height', screenSize[1]);
			localStorage.setItem(js2me.storageName + 'fullHeight', screenSize[2]);
			settings.style.top = '100%';
		});
		window.addEventListener('keyup', function () {
			js2me.sendKeyReleasedEvent();
		});
		var buttonsMapping = {
			up: -1,
			down: -2,
			left: -3,
			right: -4,
			ok: -5,
			choice: -6,
			back: -7,
			num1: 49,
			num2: 50,
			num3: 51,
			num4: 52,
			num5: 53,
			num6: 54,
			num7: 55,
			num8: 56,
			num9: 57,
			num0: 48,
		};
		var keypad = document.getElementById('keypad');
		for (var i in buttonsMapping) {
			(function (key) {
				var button = keypad.querySelector('#' + i);
				button.addEventListener('touchstart', function() {
					js2me.sendKeyPressEvent(key);
				});
				button.addEventListener('touchend', function() {
					js2me.sendKeyReleasedEvent(key);
				});
			})(buttonsMapping[i]);
		}
		document.getElementById('top').style.display = 'none';
		document.querySelector('#show.topbutton').addEventListener('click', function () {
			document.getElementById('top').style.display = '';
		});
		document.querySelector('#hide.topbutton').addEventListener('click', function () {
			document.getElementById('top').style.display = 'none';
		});
		document.querySelector('#exit.topbutton').addEventListener('click', function () {
			location.reload();
		});
		var parts = location.search.substr(1).split('&');
		for (var i = 0; i < parts.length; i++) {
			var value = decodeURIComponent(parts[i].split('=')[1]);
			if (!isNaN(parseInt(value))) {
				value = parseInt(value);
			}
			js2me.config[parts[i].split('=')[0]] = value;
		}
		var buttons = document.getElementsByTagName('a');
		if (localStorage.getItem('height') == null) {
			localStorage.setItem('height', js2me.config.height)
		}
		if (localStorage.getItem('width') == null) {
			localStorage.setItem('width', js2me.config.width)
		}
		if (localStorage.getItem('fullHeight') == null) {
			localStorage.setItem('fullHeight', js2me.config.fullHeight)
		}
		
		function loadConfig(name) {
			return (js2me.config[name] = parseInt(localStorage.getItem(js2me.storageName + name)) ||
					parseInt(localStorage.getItem(name)));
		}
		
		var screen = document.getElementById('screen');			
		if (js2me.config.selector) {
			screen.innerHTML = 'Select JAR file:<br><img id="file-selector" src="img/arrow_up.png" width="128" height="128">';
		} else {
			screen.innerHTML = '<div id="jar-list">No JARs found on SD card</div>';
		}
		
		js2me.engine = 'js/program_' + js2me.config.engine + '.js';
		
		loadConfig('width');
		loadConfig('height');
		loadConfig('fullHeight');
		//document.getElementById('screen').innerHTML = '';
		
		if (js2me.config.src) {
			var request = new XMLHttpRequest;
			request.onreadystatechange = function() {
				if (request.readyState === 4){
					var blob;
					var builder = (window.BlobBuilder || window.WebKitBlobBuilder || null);
					if (builder) {
						builder = new builder();
						builder.append(request.response);
						blob = builder.getBlob();
					} else {
						blob = new Blob([request.response]);
					}
					js2me.launchJAR(blob);
				}
			};
			request.open('GET', js2me.config.src);
			// blob didn't work in phantomjs
			request.responseType = 'arraybuffer';
			request.send();
		} else {
			if (js2me.config.selector) {
				document.getElementById('file-selector').addEventListener('click', function () {
					var pick = new MozActivity({
						name: 'pick',
						data: {
						   //type: ['*/*']
						 }
					});
					pick.onsuccess = function () {
						js2me.launchJAR(this.result.blob);
					};
				});
			} else {
				var jarList = document.getElementById('jar-list');
				var storage = navigator.getDeviceStorage('sdcard');
				var cursor = storage.enumerate();
				var isClearList = true;
				cursor.onsuccess = function () {
					if (this.result.name.lastIndexOf('.jar') === this.result.name.length - 4) {
						if (isClearList) {
							isClearList = false;
							jarList.innerHTML = '';
						}
						var file = this.result;
						var item = document.createElement('div');
						item.className = 'item';
						item.innerHTML = file.name.substring(file.name.lastIndexOf('/') + 1)
						item.addEventListener('click', function () {
							js2me.launchJAR(file);
						});
						jarList.appendChild(item);
					}
					if (!this.done) {
						this.continue();
					}
				}
				cursor.onerror = function () {
					console.error("No file found: " + this.error);
				};
			};
		}
	});
	js2me.setFullscreen = function (enabled) {
		//TODO
		var screen = document.getElementById('screen');
	};
	js2me.showError = function (message) {
		document.getElementById('alert').style.display = '';
		document.querySelector('#alert .message').innerHTML = message;
	};
})();
