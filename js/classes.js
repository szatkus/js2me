(function () {
	/**
	 * Loads a class from a stream into Java root.
	 * @param {BufferStream} stream The class file format compliant with JVM specifications.
	 */
	function loadJavaClass(stream) {
		var newClass = js2me.convertClass(stream);
		var className = newClass.prototype.className;
		var package = js2me.findPackage(className.substr(0, className.lastIndexOf('.')));
		package[className.substr(className.lastIndexOf('.') + 1)] = newClass;
		return newClass;
	}
	var classLock = {};
	/**
	 * Loads a class (native or Javaish).
	 * @param {string} className Name of the class.
	 * @param {function(class)} callback Call after loading the class.
	 */
	js2me.loadClass = function (className, callback, errorCallback) {
		var error = null;
		try {
			var classObj = js2me.findClass(className);
			try {
				callback(classObj);
			} catch (e) {
				console.error(e);
				error = e;
			}
		} catch (e) {
			console.debug(className + ' + ' + js2me.currentThread);
			var threadId = js2me.currentThread;
			if (classLock[className] instanceof Array) {
				classLock[className].push({
					threadId: threadId,
					successCallback: callback,
					errorCallback: errorCallback
				});
				return;
			}
			classLock[className] = [];
			function done(classObj) {
				callback(classObj);
				for (var i in classLock[className]) {
					var lock = classLock[className][i];
					(function (lock) {
						js2me.restoreStack[lock.threadId].unshift(function () {
							lock.successCallback(classObj);
						});
						setTimeout(function () {
							js2me.restoreThread(lock.threadId);
						}, 1);
					})(lock);
				}
			}
			var resourceName = className.replace('javaRoot.$', '').replace(/\.\$/g, '/') + '.class';
			if (js2me.resources[resourceName]) {
				js2me.loadResource(resourceName, function (data) {
					js2me.currentThread = threadId;
					var classObj = loadJavaClass(new js2me.BufferStream(data));
					initializeClass(classObj, done);
					console.debug(className + ' - ' + js2me.currentThread);
				});
			} else {
				loadNativeClasses([className], function() {
					js2me.currentThread = threadId;
					try {
						var classObj = js2me.findClass(className);
					} catch (e) {
						errorCallback();
						return;
					}
					initializeClass(classObj, done);
				});
			}
		}
		if (error) {
			throw error;
		}
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
			var require = [];
			if (classes.constructor === Array) {
				var array = classes;
				classes = {};
				for (var i in array) {
					classes[array[i]] = true;
				}
			}
			function checkRequirements(loaded) {
				loadNativeClasses(require, function () {
					callback(loaded);
				});
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
							var classObj = package[proto.name] = js2me.classBucket;
							
							js2me.classBucket = null;
							classObj.prototype.implicitInitList = [];
							for (var i in classObj.prototype) {
								if (classObj.prototype[i] != null && classObj.prototype[i].constructor == Function) {
									var source = classObj.prototype[i].toString();
									var requirements = source.match(new RegExp('javaRoot(\\.\\$[a-zA-Z0-9]+)+', 'g'));
									for (var j = 0; requirements && j < requirements.length; j++) {
										require.push(requirements[j]);
										classObj.prototype.implicitInitList.push(requirements[j]);
									}
								}
							}
							if (classObj.prototype.interfaces instanceof Array) {
								require = require.concat(classObj.prototype.interfaces);
								classObj.prototype.implicitInitList = classObj.prototype.implicitInitList.concat(classObj.prototype.interfaces);
							}
							if (classObj.prototype.superClass) {
								require.push(classObj.prototype.superClass);
							}
							remain--;
							if (remain === 0) {
								checkRequirements(true);
							}
							
						};
						element.onerror = function () {
							console.error('Error loading ' + className + ' class.');
							remain--;
							if (remain === 0) {
								checkRequirements(true);
							}
						}
						document.head.appendChild(element);
					})(className);
				}
			}
			if (remain === 0) {
				callback(false);
			}
		}
		/**
		 * Initializes given class.
		 * @param {constructor} classObj Class constructor.
		 * @param {function(class)} callback Function to execute when class is ready to use.
		 */
		function initializeClass(classObj, callback) {
			function retry() {
				var threadId = js2me.currentThread;
				if (!js2me.restoreStack[threadId] || js2me.restoreStack[threadId].length === 0) {
					initializeClass(classObj, callback);
				} else {
					js2me.restoreStack[threadId].unshift(function () {
						initializeClass(classObj, callback);
					});
					js2me.restoreThread(threadId);
				}
			}
			
			if (classObj === javaRoot.$java.$lang.$Object || classObj.prototype.initialized) {
				classObj.prototype.initialized = true;
				callback(classObj);
				return;
			}
			
			if (!classObj.prototype.superClass) {
				classObj.prototype.superClass = 'javaRoot.$java.$lang.$Object';
			}
			if (classObj.prototype.__proto__ === Object.prototype) {
				js2me.loadClass(classObj.prototype.superClass, function (superClass) {
					classObj.prototype.__proto__ = superClass.prototype;
					if (!superClass.prototype.initialized) {
						initializeClass(superClass, retry);
						return;
					}
					retry();
				});
				return;
			}
			if (classObj.prototype.implicitInitList && classObj.prototype.implicitInitList.length > 0) {
				var className = classObj.prototype.implicitInitList.pop();
				var reqClass = js2me.findClass(className);
				if (reqClass instanceof Function) {
					initializeClass(reqClass, retry);
					return;
				}
			}
			classObj.prototype.initialized = true;
			if (classObj.prototype._clinit$$V) {
				classObj.prototype._clinit$$V(retry);
			} else {
				callback(classObj);
			}
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
				if (classObj instanceof Function) {
					initializeClass(classObj, finish);
				} else {
					finish();
				}
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
				callback();
				return;
				//throw new Error('Dependencies cannot be satisfied.');
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
			loadNativeClasses(standardClasses, function () {
				js2me.initClasses(callback);
			});
		};
})();
