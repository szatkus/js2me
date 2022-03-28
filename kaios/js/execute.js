/**
 * Executes given program.
 * program An object returned by js2me.generateProgram
 * locals An array of local variables
 * constantPool 
 * exceptions
 * restoreInfo
 * callback
 */
js2me.execute = function (program, locals, constantPool, exceptions, restoreInfo, callback) {
	var context = {
		stack: [],
		result: null,
		locals: locals,
		position: 0,
		finish: false,
		saveResult: false,
		constantPool: constantPool,
		parameters: program.parameters
	};
	js2me.isThreadSuspended = false;
	if (restoreInfo) {
		context = restoreInfo.context;
		context.finish = false;
		callback = restoreInfo.callback;
		try {
			var result = js2me.restoreThread(js2me.currentThread);
			if (js2me.isThreadSuspended) {
				suspendCall();
			} else {
				if (context.saveResult) {
					context.stack.push(result);
					context.saveResult = false;
				}
			}
		} catch (exception) {
			tryCatchException(exception);
		}
		
	}
	
	function suspendCall() {
		if (js2me.restoreStack[js2me.currentThread] == null) {
			js2me.restoreStack[js2me.currentThread] = [];
		}
		var restoreStack = js2me.restoreStack[js2me.currentThread];
		restoreStack.push([program, locals, constantPool, exceptions, { 
			context: context,
			callback: callback
		}]);
		context.finish = true;
	}
	function tryCatchException(exception) {
		var handler = -1;
		for (var i = 0; i < exceptions.length && handler == -1; i++) {
			if (exceptions[i].startPc <= context.position - 1 && exceptions[i].endPc >= context.position - 1) {
				var obj = exception;
				var run = true;
				while (run) {
					if (exceptions[i].catchType == null || exceptions[i].catchType.className == obj.className) {
						handler = exceptions[i].handler;
						run = false;
					}
					if (obj.superClass) {
						obj = js2me.findClass(obj.superClass).prototype;
					} else {
						run = false;
					}
				}
			}
		}
		if (handler >= 0) {
			context.stack.push(exception);
			context.position = handler;
		} else {
			if (callback != null) {
				callback(exception);
			}
			throw exception;
		}
	}

	var length = program.content.length;
	while (context.position < length && !context.finish) {
		try {
			var func = program.content[context.position];
			context.position++;
			func(context);
		} catch (exception) {
			tryCatchException(exception);
		}
		
		if (js2me.isThreadSuspended) {
			suspendCall();
		}
		
	}
	if (context.regenerate) {
		program.regenerate = true;
	}
	if (callback != null && !js2me.isThreadSuspended) {
		callback(context.result);
	}
	
	return context.result;
};
