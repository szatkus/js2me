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
		hints: [],
		position: 0,
		finish: false,
		saveResult: false,
		constantPool: constantPool
	};
	js2me.suspendThread = false;
	if (restoreInfo) {
		context.stack = restoreInfo.stack;
		context.position = restoreInfo.position;
		context.saveResult = restoreInfo.saveResult;
		callback = restoreInfo.callback;
		try {
			var result = js2me.restoreThread(js2me.currentThread);
			if (js2me.suspendThread) {
				suspendCall();
			} else {
				if (restoreInfo.saveResult) {
					context.stack.push(result);
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
			stack: context.stack,
			position: context.position,
			saveResult: context.saveResult,
			callback: callback
		}]);
		context.finish = true;
	}
	function tryCatchException(exception) {
		var handler = -1;
		for (var i = 0; i < exceptions.length && handler == -1; i++) {
			if (program.mapping[exceptions[i].startPc] <= context.position - 1 && program.mapping[exceptions[i].endPc] >= context.position - 1) {
				var obj = {__proto__: exception};
				while (obj.__proto__.className) {
					obj = obj.__proto__;
					if (exceptions[i].catchType == null || exceptions[i].catchType.className == obj.className) {
						handler = exceptions[i].handler;
					}
				}
			}
		}
		if (handler >= 0) {
			context.stack.push(exception);
			context.position = program.mapping[handler];
		} else {
			throw exception;
		}
	}
	
	var length = program.content.length;
	while (context.position < length && !context.finish) {
		try {
			var func = program.content[context.position]
			context.position++;
			func(context);
		} catch (exception) {
			tryCatchException(exception);
		}
		
		if (js2me.suspendThread) {
			suspendCall();
		}
		
	}
	if (context.regenerate) {
		program.regenerate = true;
		program.hints = context.hints;
	}
	if (callback != null && !js2me.suspendThread) {
		callback(context.result);
	}
	
	return context.result;
};
