js2me.generateMethodStub = function(newClass, stream, methodName, constantPool, exceptions, maxLocals, escapedName, argumentsTypes, accessFlags) {
	var data = {
		stream: new js2me.BufferStream(stream), 
		methodName: methodName,
		constantPool: constantPool,
		exceptions: exceptions,
		parent: newClass,
		name: escapedName,
		hints: [],
		maxLocals: maxLocals,
		argumentsTypes: argumentsTypes,
		isStatic: (accessFlags & 8) !== 0
	};
	var stub = function () {
		var locals = [];
		if (!data.isStatic) {
			locals.push(this);
		}
		for (var i = 0; i < arguments.length; i++) {
			locals.push(arguments[i]);
			if (arguments[i] && (arguments[i].double != null || arguments[i].hi != null)) {
				locals.push(arguments[i]);
			}
		}
		var callback = null;
		if (arguments.length > 0 && typeof arguments[arguments.length - 1] == 'function') {
			callback = arguments[arguments.length - 1];
		}
		var result;
		if (data.content == null || data.regenerate) {
			js2me.generateProgram(data);
		}
		if (data.nativeMethod) {
			return data.nativeMethod.apply(this, arguments);
		} else {
			return js2me.execute(data, locals, constantPool, exceptions, null, callback);
		}
	};
	stub.isUnsafe = !localStorage.getItem(js2me.storageName + methodName);
	stub.data = data;
	return stub;
};
js2me.generateAllMethods = function (force) {
	var generated = 0;
	for (var i in js2me.usedMethods) {
		var separator = i.indexOf('.prototype.');
		var className = i.substr(0, separator);
		var classObj = js2me.findClass(className);
		var methodName = i.substr(separator + 11);
		var data;
		if (classObj && classObj.prototype[methodName] && (data = classObj.prototype[methodName].data)) {
			if (data.content == null || data.regenerate || force) {
				js2me.generateProgram(classObj.prototype[methodName].data);
				generated++;
			}
		}
	}
	console.log(generated + ' methods have been generated.');
	return generated;
};
