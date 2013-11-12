js2me.generateMethodStub = function(newClass, stream, methodName, constantPool, exceptions, maxLocals, escapedName, argumentsTypes) {
	var program = null;
	var stub = function () {
		if (!js2me.calledMethods[methodName]) {
			js2me.calledMethods[methodName] = 0;
		}
		js2me.calledMethods[methodName]++;
		var locals = [];
		if (this.constructor != Function) {
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
		if (program == null || program.regenerate) {
			if (program == null) {
				console.log('Generating method ' + methodName);
			} else {
				console.log('Regenerating method ' + methodName);
			}
			program = js2me.generateProgram(new js2me.BufferStream(stream), methodName, constantPool, exceptions);
			program.name = methodName;
			stub.data = program;
			if (program.isSafe) {
				arguments.callee.isUnsafe = false;
			}
			// We can compile to native function!
			if (program.isSafe && program.content.length === 1) {
				console.log(methodName + ' is safe! Compiling to native :)');
				var methodBody = program.content[0];
				var limit = 5000;
				var args = [];
				for (var i = 0; i < maxLocals; i++) {
					var localName;
					//locals[0] == this for non-static
					if (this.constructor !== Function) {
						if (i > 0) {
							localName = 'local' + i;
						} else {
							localName = 'this';
						}
					} else  {
						localName = 'local' + i;
					}
					methodBody = methodBody.replace(new RegExp('context\\.locals\\[' + i + '\\]', 'g'), localName);
					if (localName != 'this') {
						if (args.length < argumentsTypes.length) {
							args.push(localName);
							if (argumentsTypes[args.length - 1] === 'D' || argumentsTypes[args.length - 1] === 'J') {
								i++;
							}
						} else {
							methodBody = 'var ' + localName + ';\n' + methodBody;
						}
					}
				}
				methodBody = methodBody.replace(new RegExp('context\\.result', 'g'), 'functionResult');
				var returnStatement = 'if (callback && callback.constructor === Function) {\n' +
					'	callback(functionResult);\n' +
					'}\n';
				methodBody = methodBody.replace(new RegExp('context\\.stack', 'g'), 'stack');
				methodBody = methodBody.replace(new RegExp('context\\.finish = true', 'g'), returnStatement);
				methodBody = methodBody.replace(new RegExp('context\\.saveResult', 'g'), 'var nothing');
				methodBody = methodBody.replace(new RegExp('context\\.constantPool', 'g'), 'constantPool');
				methodBody = 'var functionResult;\n' + methodBody;
				methodBody = 'var stack = [];\n' + methodBody;
				methodBody = 'var constantPool = ' + methodName + '.constantPool;\n' + methodBody;
				// dear Chromium developers, I love you!
				methodBody = '//@ sourceURL=' + methodName.replace(new RegExp('\\.prototype\\.|\\.', 'g'), '/') + '.js\n' + methodBody;
				args.push('callback');
				if (js2me.profile) {
					methodBody = 'return function ' + methodName.replace(new RegExp('\\.', 'g'), '_') + '(' + args.join(',') + ') {\n' + methodBody + '};';
				}
				args.push(methodBody);
				try {
					var nativeMethod = Function.apply(null, args);
					if (js2me.profile) {
						nativeMethod = nativeMethod();
					}
				} catch (e) {
					console.error(e);
					console.log(methodBody);
				}
				nativeMethod.constantPool = constantPool;
				newClass.prototype[escapedName] = nativeMethod;
				return nativeMethod.apply(this, arguments);
			}
		}
		return js2me.execute(program, locals, constantPool, exceptions, null, callback);
	};
	stub.isUnsafe = true;
	return stub;
}
