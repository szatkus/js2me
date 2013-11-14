(function () {
	/**
	 * Loads a class from a stream into Java root.
	 * @param {BufferStream} stream The class file format compliant with JVM specifications.
	 */
	js2me.loadJavaClass = function (stream) {
		var newClass = js2me.convertClass(stream);
		var className = newClass.prototype.className;
		var package = js2me.findPackage(className.substr(0, className.lastIndexOf('.')));
		package[className.substr(className.lastIndexOf('.') + 1)] = newClass;
	}
	/**
	 * Finds a package by its name.
	 * @param {string} path Package name.
	 * @param {object} [current=window] Entry point to search
	 * @return {object} Package object.
	 */
	js2me.findPackage = function (path, current) {
		if (!current) {
			current = window;
		}
		if (!path) {
			return current;
		}
		var name = path.substr(0, path.indexOf('.')) || path;
		if (!current[name]) {
			current[name] = {};
		}
		if (path.indexOf('.') > 0) {
			return js2me.findPackage(path.substr(path.indexOf('.') + 1), current[name]);
		} else {
			return current[name];
		}
	};
	var classCache = {};
	/**
	 * Finds a class by its full name.
	 * @param {string} path Class name.
	 * @return {constructor} Class constructor.
	 */
	js2me.findClass = function (path) {
		if (classCache[path] != null) {
			return classCache[path];
		}
		var package = this.findPackage(path.substr(0, path.lastIndexOf('.')));
		var classObj = package[path.substr(path.lastIndexOf('.') + 1)];
		if (!classObj) {
			throw new javaRoot.$java.$lang.$ClassNotFoundException(path);
		}
		classCache[path] = classObj;
		return classObj;
	};
	/**
	 * Finds classes which implement given class (including that class).
	 * @param {string} path Class name.
	 * @return {[constructor]} Class constructors.
	 */
	js2me.findSubclasses = function (path) {
		var result = [];		
		iterateClasses(javaRoot, 'javaRoot', function (classObj) {
			if (classObj instanceof Function && classObj.prototype.isImplement(path)) {
				result.push(classObj);
			}
		});
		return result;
	};
	/**
	 * Creates a constructor from given prototype and put into class bucket (i. e. result of executing current js file).
	 * @param {object} proto Object which is used as prototype.
	 */
	js2me.createClass = function (proto) {
		var classObj = function () {
			if (proto.construct) {
				proto.construct.apply(this, arguments);
			}
		};
		classObj.prototype = proto;
		proto.type = 'class';
		proto.initialized = false;
		js2me.classBucket = classObj;
	};
	/**
	 * Same as createClass but also change type into "interface".
	 * @param {object} proto Object which is used as prototype.
	 */
	js2me.createInterface = function (proto) {
		js2me.createClass(proto);
		proto.type = 'interface';
	};
	/**
	 * Iterates over some classes and packages and call a given function for each.
	 * @param {object} obj Entry point for iteration (use javaRoot if you want to iterate over whole space).
	 * @param {string} name Global name of entry point.
	 * @param {function(obj, name)} action Function to be executed for each found class and package.
	 */
	function iterateClasses(obj, name, action) {
		action(obj, name);
		for (var i in obj) {
			if (i[0] == '$') {
				iterateClasses(obj[i], name + '.' + i, action);
			}
		}
	};
	/**
	 * Loads given native classes.
	 * @param {object/array} classes Array of class names or object which each field name are class name.
	 * @param {function(loaded)} callback Function to be executed after loading. Parameter "loaded" is false if every
	 * class on list was already loaded.
	 */
	function loadNativeClasses(classes, callback) {
			var remain = 0;
			if (classes.constructor == Array) {
				var array = classes;
				classes = {};
				for (var i in array) {
					classes[array[i]] = true;
				}
			}
			for (var className in classes) {
				try {
					js2me.findClass(className);
				} catch (e) {
					(function (className) {
						//console.log(className);
						remain++;
						var classPath = className.replace(js2me.JAVA_ROOT, 'js/me').replace(/\$/g, '').replace(/\./g, '/') + '.js';
						var element = document.createElement('script');
						element.src = classPath;
						element.onload = function () {
							if (js2me.classBucket == null) {
								throw new javaRoot.$java.$lang.$ClassNotFoundException(className + ' not found');
							}
							var proto = js2me.classBucket.prototype;
							proto.className = className;
							var splitPoint = className.lastIndexOf('.');
							proto.package = className.substring(0, splitPoint);
							proto.name = className.substring(splitPoint + 1);
							var package = js2me.findPackage(proto.package, window);
							package[proto.name] = js2me.classBucket;
							
							js2me.classBucket = null;
							remain--;
							if (remain == 0) {
								callback(true);
							}
						};
						element.onerror = function () {
							js2me.showError('Error loading ' + className + ' class.');
						}
						document.head.appendChild(element);
					})(className);
				}
			}
			if (remain == 0) {
				callback(false);
			}
		}
		/**
		 * Initializes given class.
		 * @param {constructor} classObj Class constructor.
		 * @param {function} callback Function to execute when class is ready to use.
		 */
		js2me.initializeClass = function (classObj, callback) {
			
			function retry() {
				js2me.initializeClass(classObj, callback);
			}
			if (classObj.prototype && !classObj.prototype.initialized) {
				if (!classObj.prototype.superClass && classObj != javaRoot.$java.$lang.$Object) {
					classObj.prototype.superClass = 'javaRoot.$java.$lang.$Object';
				}
				if (classObj.prototype.superClass) {
					var superClass = js2me.findClass(classObj.prototype.superClass);
					classObj.prototype.__proto__ = superClass.prototype;
					if (!superClass.prototype.initialized) {
						js2me.initializeClass(superClass, retry);
						return;
					}
				}
				
				if (classObj.prototype._clinit$$V && !classObj.prototype.initializing) {
					classObj.prototype.initializing = true;
					classObj.prototype._clinit$$V(retry);
					return;
				}
				
			}
			classObj.prototype.initialized = true;
			callback();
		};
		/**
		 * Initializes all classes from Java root.
		 */
		js2me.initClasses = function (callback) {
			var remain = 0;
			function finish() {
				remain--;
				if (remain == 0) {
					callback();
				}
			}
			iterateClasses(javaRoot, js2me.JAVA_ROOT, function (obj, name) {
				remain++;
			});
			iterateClasses(javaRoot, js2me.JAVA_ROOT, function (obj, name) {
				var classObj = js2me.findClass(name);
				initializeClass(classObj, finish);
			});
			
		}
		/**
		 * Checks dependencies of all classes and loads required classes.
		 * @param {function} callback Function called when everything is ok.
		 * @param {number} [limit=10] Limits iterations of class checking.
		 */
		js2me.checkClasses = function (callback, limit) {
			if (limit == null) {
				limit = 10;
			}
			if (limit == 0) {
				throw new Error('Dependencies cannot be satisfied.');
			}
			var classes = {};
			iterateClasses(javaRoot, 'javaRoot', function (obj) {
				if (obj.prototype) {
					if (obj.prototype.require == null) {
						obj.prototype.require = [];
						for (var i in obj.prototype) {
							if (obj.prototype[i] != null && obj.prototype[i].constructor == Function) {
								var source = obj.prototype[i].toString();
								var requirements = source.match(new RegExp('javaRoot(\\.\\$[a-zA-Z]+)+', 'g'));
								for (var j = 0; requirements && j < requirements.length; j++) {
									obj.prototype.require.push(requirements[j]);
								}
							}
						}
					}
					if (obj.prototype.interfaces instanceof Array) {
						obj.prototype.require = obj.prototype.require.concat(obj.prototype.interfaces);
					}
					if (!obj.prototype.superClass && obj != javaRoot.$java.$lang.$Object) {
						obj.prototype.superClass = 'javaRoot.$java.$lang.$Object';
					}
					try {
						if (obj.prototype.superClass) {
							var superClass = js2me.findClass(obj.prototype.superClass);
							obj.prototype.__proto__ = superClass.prototype;
						}
					} catch (e) {
						classes[obj.prototype.superClass] = true;
					}
					if (obj.prototype.require) {
						for (var i = 0; i < obj.prototype.require.length; i++) {
							classes[obj.prototype.require[i]] = true;
						}
					}
					
				}
			});
			loadNativeClasses(classes, function (isNewClasses) {
				if (isNewClasses) {
					js2me.checkClasses(callback, limit - 1);
				} else {
					callback();
				}
			});
		}
		
		js2me.checkMethods = function () {
			for (var methodPath in js2me.usedMethods) {
				// yeah, yeah, I know...
				var ref = eval(methodPath.replace('->', '.prototype.'));
				if (ref == null) {
					console.log('Method not found: ' + methodPath);
				}
			}
		};
		
		/**
		 * Prepares a JVM to usage. Basicaly loads some basic classes and sets initial state.
		 * @param {function} callback Function to execute when machine is ready.
		 */
		js2me.setupJVM = function (callback) {
			js2me.resources = {};
			js2me.threads = [];
			js2me.currentThread = 0;
			js2me.restoreStack = [];
			js2me.kill = false;
			js2me.usedMethods = {};
			js2me.usedByteCodes = {};
			javaRoot = {};
			var standardClasses = [
			'javaRoot.$java.$lang.$Object',
			'javaRoot.$java.$lang.$String',
			'javaRoot.$java.$lang.$Thread',
			'javaRoot.$java.$lang.$ClassNotFoundException',
			'javaRoot.$java.$lang.$ClassCastException',
			'javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException',
			'javaRoot.$java.$lang.$NegativeArraySizeException',
			'javaRoot.$java.$lang.$ArrayObject',
			'javaRoot.$java.$lang.$ArithmeticException',
			'javaRoot.$java.$lang.$ArrayStoreException'
			];
			loadNativeClasses(standardClasses, callback);
		};
})();
