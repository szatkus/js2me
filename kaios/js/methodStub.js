js2me.generateMethodStub = function(newClass, stream, methodName, constantPool, exceptions, maxLocals, escapedName, argumentsTypes, accessFlags) {
	var data = {
		stream: new js2me.BufferStream(stream), 
		methodName: methodName,
		constantPool: constantPool,
		exceptions: exceptions,
		parent: newClass,
		name: escapedName,
		maxLocals: maxLocals,
		argumentsTypes: argumentsTypes,
		isStatic: (accessFlags & 8) !== 0,
		isSynchronized: (accessFlags & 0x20) !== 0
	};
	constantPool = undefined;
	stream = undefined;
	var stub = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, guard) {
		
		var locals = [];
		if (!data.isStatic) {
			locals.push(this);
		}
		if (guard !== undefined) {
			console.error('Too many arguments');
		}
		if (js2me.currentThread === -10) {
			console.debug(data.methodName);
		}
		var args = [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9];
		for (var i = 0; i < argumentsTypes.length; i++) {
			locals.push(args[i]);
			if (args[i] && (args[i].double != null || args[i].hi != null)) {
				locals.push(args[i]);
			}
		}
		var callback = null;
		if (args[argumentsTypes.length] && args[argumentsTypes.length].constructor === Function) {
			callback = args[argumentsTypes.length];
		}
		var result;
		if (data.content == null || data.regenerate) {
			js2me.generateProgram(data);
		}
		if (data.isSynchronized) {
			var l = this.monitorQueue ? this.monitorQueue.length : 0;
			var callee = this;
			
			js2me.enterMonitor(callee);
			var oldCallback = callback || function () {};
			callback = function () {
				js2me.exitMonitor(callee);
				oldCallback();
			}
			if (js2me.isThreadSuspended) {
				js2me.suspendThread(function () {
					return js2me.execute(data, locals, data.constantPool, exceptions, null, callback);
				});
				return;
			}	
		}
		if (data.nativeMethod) {
			return data.nativeMethod.apply(this, args);
		} else {
			return js2me.execute(data, locals, data.constantPool, exceptions, null, callback);
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
		try {
			var classObj = js2me.findClass(className);
		} catch (e) {}
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
