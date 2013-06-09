js2me.execute = function (program, locals, constantPool, exceptions, restoreInfo) {
	var context = {
		stack: [],
		result: null,
		locals: locals,
		position: 0,
		finish: false,
		saveResult: false
	};
	js2me.suspendThread = false;
	if (restoreInfo) {
		context.stack = restoreInfo.stack;
		context.position = restoreInfo.position;
		try {
			executeFunction(function () {
				return js2me.restoreThread(js2me.currentThread);
			}, restoreInfo.saveResult);
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
			saveResult: context.saveResult
		}]);
		context.finish = true;
	}
	function tryCatchException(exception) {
		var handler = -1;
		for (var i = 0; i < exceptions.length && handler == -1; i++) {
			if (program.mapping[exceptions[i].startPc] <= context.position && program.mapping[exceptions[i].endPc] >= context.position) {
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
	
	function executeFunction(func, saveResult) {
		var result = func();
		if (js2me.suspendThread) {
			suspendCall(saveResult);
			return;
		}
		if (saveResult) {
			context.stack.push(result);
		}
		//console.log('END: ' + method.className + '->' + method.name);
		
	}
	
	
	var limit = 0;
	while (context.position < program.content.length && !context.finish) {
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
		limit++;
		if (limit > 100000 && !context.finish) {
			context.saveResult = false;
			suspendCall();
			var threadID = js2me.currentThread;
			js2me.suspendThread = true;
			setTimeout(function () {
				//console.log('aaa');
				js2me.restoreThread(threadID);
			}, 1);
		}
		
	}
	
	
	return context.result;
};
