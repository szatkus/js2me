"use strict";
js2me.classDependencies = {};
js2me.generateProgram = function (data) {
	var generators = [];
	var stream = data.stream;
	var methodName = data.methodName;
	var constantPool = data.constantPool;
	var exceptions = data.exceptions;
	
	data.regenerate = false;
	
	if (data.content == null) {
		console.log('Generating method ' + methodName);
	} else {
		console.log('Regenerating method ' + methodName);
	}
	
	function generateOverflowChecking(bits) {
		var base = 1;
		for (var i = 0; i < bits - 1; i++) {
			base *= 2;
		}
		return 'while (value >= ' + base + ') {\n' +
			'	value -= ' + (base * 2) + ';\n' +
			'}\n' +
			'while (value < -' + base + ') {\n' +
			'	value += ' + (base * 2) + ';\n' +
			'}\n';
	};
	
	function generateArrayLoad() {
		return 'var index = context.stack.pop();\n' +
			'var array = context.stack.pop();\n' +
			'if (array == null) {\n' +
			'	throw new javaRoot.$java.$lang.$NullPointerException();\n' +
			'}\n' +
			'if (index < 0 || index >= array.length) {\n' +
			'	throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException(index + "/" + array.length);\n' +
			'}\n' +
			'context.stack.push(array[index]);\n';
	}
	function generateArrayStore(isObject) {
		var body = 'var value = context.stack.pop();\n' +
			'var index = context.stack.pop();\n' +
			'var array = context.stack.pop();\n' +
			'if (array == null) {\n' +
			'	throw new javaRoot.$java.$lang.$NullPointerException();\n' +
			'}\n' +
			'if (index < 0 || index >= array.length) {\n' +
			'	throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException(index + "/" + array.length);\n' +
			'}\n';
		if (isObject) {
			body += 'if (value && value.constructor !== Array && !value.isImplement(array.className)) {\n' +
				'	throw new javaRoot.$java.$lang.$ArrayStoreException();\n' +
				'}\n';
		}
		body += 'array[index] = value;\n';
		return body;	
	}
	function generateAB(code) {
		return function () {
			return 'var b = context.stack.pop();\n' +
				'var a = context.stack.pop();\n' +
				code;
		};
	}
	function generateReturn() {
		return 'var functionResult = context.stack.pop();\n' +
			'context.result = functionResult;\n' +
			'context.finish = true;\n' +
			'return functionResult;\n';
	}
	// aaload
	generators[0x32] = function (context) {
		return generateArrayLoad();
	}
	// aastore
	generators[0x53] = function () {
		return generateArrayStore(true);
	}
	// aconst_null
	generators[0x01] = 'context.stack.push(null);\n';
	function generateLoad(index) {
		return 'context.stack.push(context.locals[' + index + ']);\n';
	}
	// aload
	generators[0x19] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	}
	// aload_0
	generators[0x2a] = function () {
		return generateLoad(0);
	}
	// aload_1
	generators[0x2b] = function () {
		return generateLoad(1);
	}
	// aload_2
	generators[0x2c] = function () {
		return generateLoad(2);
	}
	// aload_3
	generators[0x2d] = function () {
		return generateLoad(3);
	};
	// anewarray
	generators[0xbd] = function () {
		var type = constantPool[stream.readUint16()];
		//if (type.className == 'javaRoot.$javax.$microedition.$media.$Player') debugger;
		return 'var length = context.stack.pop();\n' +
			'if (length < 0) {\n' +
			'	throw new javaRoot.$java.$lang.$NegativeArraySizeException();\n' +
			'}\n' +
			'var array = new Array(length);\n' +
			'array.className = "' + type.className + '";\n' +
			'for (var i = 0; i < array.length; i++) array[i] = null;\n' +
			'context.stack.push(array);\n';
	};
	// areturn
	generators[0xb0] = generateReturn;
	// arraylength
	generators[0xbe] = function () {
		return 'var array = context.stack.pop();\n' +
			'if (array == null) {\n' +
			'	throw new javaRoot.$java.$lang.$NullPointerException();\n' +
			'}\n' +
			'context.stack.push(array.length);\n';
	};
	// astore
	generators[0x3a] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// astore_0
	generators[0x4b] = function () {
		return generateStore(0);
	};
	// astore_1
	generators[0x4c] = function () {
		return generateStore(1);
	};
	// astore_2
	generators[0x4d] = function () {
		return generateStore(2);
	};
	// astore_3
	generators[0x4e] = function () {
		return generateStore(3);
	};
	// athrow
	generators[0xbf] = 'throw context.stack.pop();\n';
	// baload
	generators[0x33] = function (context) {
		return generateArrayLoad();
	};
	// bastore
	generators[0x54] = function (context) {
		return generateArrayStore();
	};
	// bipush
	generators[0x10] = function () {
		var value = stream.readInt8();
		return 'context.stack.push(' + value + ');\n';
	};
	// caload
	generators[0x34] = function (context) {
		return generateArrayLoad();
	};
	// castore
	generators[0x55] = function (context) {
		return generateArrayStore();
	};
	// checkcast
	generators[0xc0] = function () {
		var type = constantPool[stream.readUint16()];
		return function (context) {
			var ref = context.stack.pop();
			if (ref != null) {
				if (ref.constructor == Array) {
					context.stack.push(ref);
					return;
				}
				var refClass = js2me.findClass(ref.className).prototype;
				var cmpClass = js2me.findClass(type.className).prototype;
				if (refClass.isImplement(cmpClass.className)) {
					context.stack.push(ref);
				} else {
					throw new javaRoot.$java.$lang.$ClassCastException();
				}
			} else {
				context.stack.push(ref);
			}
		}
	};
	// d2i
	generators[0x8e] = function (context) {
		var value = context.stack.pop();
		if (isNaN(value)) {
			context.stack.push(0);
			return;
		}
		if (value < -0x80000000) {
			context.stack.push(-0x80000000);
			return;
		}
		if (value > 0x7fffffff) {
			context.stack.push(0x7fffffff);
			return;
		}
		context.stack.push(value);
	};
	// d2l
	generators[0x8f] = function (context) {
		var value = context.stack.pop();
		if (isNaN(value)) {
			context.stack.push(new js2me.Long(0, 0));
			return;
		}
		if (value < -0x8000000000000000) {
			context.stack.push(new js2me.Long(0x80000000, 0));
			return;
		}
		if (value >= 0x8000000000000000) {
			context.stack.push(new js2me.Long(0x7fffffff, 0xffffffff));
			return;
		}
		if (value < 0) {
			value = Math.abs(value);
			var result = new js2me.Long(Math.floor(value / 0x100000000), Math.floor(value % 0x100000000));
			context.stack.push(result.neg());
		} else {
			value = Math.abs(value);
			var result = new js2me.Long(Math.floor(value / 0x100000000), Math.floor(value % 0x100000000));
			context.stack.push(result);
		}
	};
	// dadd
	generators[0x63] = function () {
		return 'var b = context.stack.pop();\n' + 
			'var a = context.stack.pop();\n' +
			'context.stack.push({double: a.double + b.double});\n';
	};
	// daload
	generators[0x31] = function (context) {
		return generateArrayLoad();
	};
	// dastore
	generators[0x52] = function (context) {
		return generateArrayStore();
	};
	function generateCompareFloats(isDouble, onNaN) {
		var body = 'var b = context.stack.pop()';
		if (isDouble) {
			body += '.double';
		}
		body += ';\n';
		body += 'var a = context.stack.pop()';
		if (isDouble) {
			body += '.double';
		}
		body += ';\n';
		body += 'var result;\n';
		body += 'if (isNaN(a) || isNaN(b)) {\n';
		body += '	result = ' + onNaN + ';\n';
		body += '}\n'
		body += 'if (a > b) {\n';
		body += '	result = 1;\n';
		body += '}\n';
		body += 'if (a === b) {\n';
		body += '	result = 0;\n';
		body += '}\n';
		body += 'if (a < b) {\n';
		body += '	result = -1;\n';
		body += '}\n';
		body += 'context.stack.push(result);\n';
		return body;
	}
	// dcmpg
	generators[0x98] = function (context) {
		return generateCompareFloats(true, 1);
	};
	// dcmpl
	generators[0x97] = function (context) {
		return generateCompareFloats(true, -1);
	};
	// dconst_0
	generators[0x0e] = 'context.stack.push(js2me.dconst0);\n';
	// dconst_1
	generators[0x0f] = 'context.stack.push(js2me.dconst1);\n';
	// ddiv
	generators[0x6f] = function () {
		return 'var b = context.stack.pop();\n' + 
			'var a = context.stack.pop();\n' +
			'context.stack.push({double: a.double / b.double});\n';
	};
	// dload
	generators[0x18] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	}
	// dload_0
	generators[0x26] = function () {
		return generateLoad(0);
	}
	// dload_1
	generators[0x27] = function () {
		return generateLoad(1);
	}
	// dload_2
	generators[0x28] = function () {
		return generateLoad(2);
	}
	// dload_3
	generators[0x29] = function () {
		return generateLoad(3);
	};
	// dmul
	generators[0x6b] = function () {
		return 'var b = context.stack.pop();\n' + 
			'var a = context.stack.pop();\n' +
			'context.stack.push({double: a.double * b.double});\n';
	};
	// dneg
	generators[0x77] = function () {
		return 'var value = context.stack.pop();\n' +
			'context.stack.push({double: -value.double});\n';
	};
	// drem
	generators[0x73] = function () {
		return 'var b = context.stack.pop();\n' + 
			'var a = context.stack.pop();\n' +
			'context.stack.push({double: a.double % b.double});';
	};
	// dreturn
	generators[0xaf] = generateReturn;
	// dstore
	generators[0x39] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// dstore_0
	generators[0x47] = function () {
		return generateStore(0);
	};
	// dstore_1
	generators[0x48] = function () {
		return generateStore(1);
	};
	// dstore_2
	generators[0x49] = function () {
		return generateStore(2);
	};
	// dstore_3
	generators[0x4a] = function () {
		return generateStore(3);
	};
	// dsub
	generators[0x67] = function () {
		return 'var b = context.stack.pop();\n' + 
			'var a = context.stack.pop();\n' +
			'context.stack.push({double: a.double - b.double});\n';
	};
	// dup
	generators[0x59] = 'var tmp = context.stack.pop();\n' +
		'context.stack.push(tmp);\n' +
		'context.stack.push(tmp);\n';
	// dup_x1
	generators[0x5a] = 'var a = context.stack.pop();\n' +
		'var b = context.stack.pop();\n' +
		'context.stack.push(a);\n' +
		'context.stack.push(b);\n' +
		'context.stack.push(a);\n';
	// dup_x2
	generators[0x5b] = 'var a = context.stack.pop();\n' +
		'var b = context.stack.pop();\n' +
		'var c = context.stack.pop();\n' +
		'if (a.hi == null && a.double == null) {\n' +
		'	var stack0 = a;\n' +
		'	var stack1 = c;\n' +
		'	var stack2 = b;\n' +
		'	var stack3 = a;\n' +
		'} else {\n' +
		'	var stack0 = c;\n' +
		'	var stack1 = a;\n' +
		'	var stack2 = b;\n' +
		'	var stack3 = a;\n' +
		'}\n' +
		'context.stack.push(stack0);\n' +
		'context.stack.push(stack1);\n' +
		'context.stack.push(stack2);\n' +
		'context.stack.push(stack3);\n';
	// dup2
	generators[0x5c] = 'var a = context.stack.pop();\n' +
		'if (a.hi == null && a.double == null) {//STOP\n' +
		'	var b = context.stack.pop();\n' +
		'	context.stack.push(b);\n' +
		'	context.stack.push(a);\n' +
		'	context.stack.push(b);\n' +
		'	context.stack.push(a);\n' +
		'} else {\n' +
		'	context.stack.push(a);\n' +
		'	context.stack.push(a);\n' +
		'}//STOP\n';
	// dup2_x1
	generators[0x5d] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		if (a.hi == null && a.double == null) {
			var c = context.stack.pop();
			context.stack.push(b);
			context.stack.push(a);
			context.stack.push(c);
			context.stack.push(b);
			context.stack.push(a);
		} else {
			context.stack.push(a);
			context.stack.push(b);
			context.stack.push(a);
		}
	};
	// dup2_x2
	// who the hell came up with this op!?
	generators[0x5e] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		if (a.hi == null && a.double == null) {
			if (b.hi == null && b.double == null) {
				context.stack.push(a);
				context.stack.push(b);
				context.stack.push(a);
			} else {
				var c = context.stack.pop();
				context.stack.push(a);
				context.stack.push(c);
				context.stack.push(b);
				context.stack.push(a);
			}
		} else {
			var c = context.stack.pop();
			if (c.hi == null && c.double == null) {
				context.stack.push(b);
				context.stack.push(a);
				context.stack.push(c);
				context.stack.push(b);
				context.stack.push(a);
			} else {
				var d = context.stack.pop();
				context.stack.push(b);
				context.stack.push(a);
				context.stack.push(d);
				context.stack.push(c);
				context.stack.push(b);
				context.stack.push(a);
			}
		}
	};
	// fadd
	generators[0x62] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a + b);
	};
	// faload
	generators[0x30] = function (context) {
		return generateArrayLoad();
	};
	// fastore
	generators[0x51] = function (context) {
		return generateArrayStore();
	};
	// fcmpg
	generators[0x96] = function (context) {
		return generateCompareFloats(false, 1);
	};
	// fcmpl
	generators[0x95] = function (context) {
		return generateCompareFloats(false, -1);
	};
	// fconst_0
	generators[0x0b] = function (context) {
		context.stack.push(0);
	};
	// fconst_1
	generators[0x0c] = function (context) {
		context.stack.push(1);
	};
	// fconst_2
	generators[0x0d] = function (context) {
		context.stack.push(2);
	};
	// fdiv
	generators[0x6e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a / b);
	};
	// fload
	generators[0x17] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	}
	// fload_0
	generators[0x22] = function () {
		return generateLoad(0);
	}
	// fload_1
	generators[0x23] = function () {
		return generateLoad(1);
	}
	// fload_2
	generators[0x24] = function () {
		return generateLoad(2);
	}
	// fload_3
	generators[0x25] = function () {
		return generateLoad(3);
	};
	// fmul
	generators[0x6a] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a * b);
	};
	// fneg
	generators[0x76] = function (context) {
		var value = context.stack.pop();
		context.stack.push(-value);
	};
	// frem
	generators[0x72] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a % b);
	};
	// freturn
	generators[0xae] = generateReturn;
	// fstore
	generators[0x38] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// fstore_0
	generators[0x43] = function () {
		return generateStore(0);
	};
	// fstore_1
	generators[0x44] = function () {
		return generateStore(1);
	};
	// fstore_2
	generators[0x45] = function () {
		return generateStore(2);
	};
	// fstore_3
	generators[0x46] = function () {
		return generateStore(3);
	};
	// fsub
	generators[0x66] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a - b);
	};
	// getfield
	generators[0xb4] = function () {
		var field = constantPool[stream.readUint16()];
		try {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			return 'var obj = context.stack.pop();\n' +
					'if (obj == null) {\n' +
					'	throw new javaRoot.$java.$lang.$NullPointerException();\n' +
					'}\n' +
					'context.stack.push(obj.$' + fieldId + ');\n';
		} catch (e) {}
		return function (context) {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			var obj = context.stack.pop();
			if (obj == null) {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}
			context.stack.push(obj['$' + fieldId]);
		};
	};
	// getstatic
	generators[0xb2] = function () {
		var field = constantPool[stream.readUint16()];
		try {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			if (classObj.prototype && classObj.prototype.initialized) {
				return 'context.stack.push(' + field.className + '.prototype.$' + fieldId+ ');\n'
			}
		} catch (e) {}
		return generateLoadClass(field.className, function (context, classObj) {
			var fieldId = classObj.prototype[field.name];
			context.stack.push(classObj.prototype['$' + fieldId]);
		});
	};
	function generateGoto(type) {
		return function () {
			var index = stream.index + stream.readInt16() - 1;
			jumpTo[index]++;
			jumpTarget[currentOpIndex] = index;
			var body = 'context.position = /*' + index + '*/; return "jump";';
			if (type) {
				if (type.indexOf(' ') === -1) {
					body = 'var b = context.stack.pop();\n' +
						'var a = context.stack.pop();\n' +
						//'if (a !== b && a == null && b == null) debugger;\n' +
						'//STOP\nif (a ' + type + ' b) {' + body + '}//STOP\n';
				} else {
					body = 'var a = context.stack.pop();\n' +
						'//STOP\nif (a ' + type + ') {' + body + '}//STOP\n';
				}
			}
			return body;
		}
	}
	function goto(context, index) {
		context.position = positionMapping[index];
		/*var now = +new Date;
		if (!(now - js2me.lastStop < 1000)) {
			js2me.lastStop = now;
			context.saveResult = false;
			var threadID = js2me.currentThread;
			js2me.isThreadSuspended = true;
			setTimeout(function () {
				js2me.restoreThread(threadID);
			}, 1);
		}*/
	}
	// goto
	generators[0xa7] = generateGoto();
	// i2l
	generators[0x85] = function () {
		return 'var value = context.stack.pop();\n' +
			'var result;\n' +
			'if (value >= 0) {\n' +
			'	result = {hi: 0, lo: value};\n' +
			'} else {\n' +
			'	result = {hi: 0xffffffff, lo: value + 4294967296};\n' +
			'}\n' +
			'context.stack.push(result);\n';
	};
	// i2f
	generators[0x86] = '\n';
	// i2d
	generators[0x87] = 'var value = context.stack.pop();\n' +
		'context.stack.push({double: value});\n';
	// f2i
	generators[0x8b] = 'var value = context.stack.pop();\n' +
		'context.stack.push(~~value);\n';
	// f2d
	generators[0x8d] = 'var value = context.stack.pop();\n' +
		'context.stack.push({double: value});\n';
	// i2b
	generators[0x91] = 'var value = context.stack.pop();\n' +
		'value = (value + 2147483648) % 256;\n' +
		'var result;\n' +
		'if (value > 127) {\n' +
		'	result = value - 256;\n' +
		'} else {\n' +
		'	result = value;\n' +
		'}\n' +
		'context.stack.push(result)\n';
	// i2c
	generators[0x92] = 'var value = context.stack.pop();\n' +
		'context.stack.push(value);\n';
	// i2s
	generators[0x93] = 'var value = context.stack.pop();\n' +
		'value = (value + 2147483648) % 65536;\n' +
		'var result;\n' +
		'if (value > 32767) {\n' +
		'	result = value - 65536;\n' +
		'} else {\n' +
		'	result = value;\n' +
		'}\n' +
		'context.stack.push(result)\n';
	// iadd
	generators[0x60] = generateAB('var value = (a + b) | 0;\n' +
		'context.stack.push(value);\n');	
	// iand
	generators[0x7e] = generateAB('context.stack.push(a & b);\n');
	// iaload
	generators[0x2e] = generateAB('context.stack.push(a[b]);\n');
	// iastore
	generators[0x4f] = 'var value = context.stack.pop();\n' +
		'var index = context.stack.pop();\n' +
		'var array = context.stack.pop();\n' +
		'array[index] = value;\n';
	function generateConst(constant) {
		return 'context.stack.push(' + constant + ');\n';
	}
	// iconst_m1
	generators[0x02] = generateConst(-1);
	// iconst_0
	generators[0x03] = generateConst(0);
	// iconst_1
	generators[0x04] = generateConst(1);
	// iconst_2
	generators[0x05] = generateConst(2);
	// iconst_3
	generators[0x06] = generateConst(3);
	// iconst_4
	generators[0x07] = generateConst(4);
	// iconst_5
	generators[0x08] = generateConst(5);
	// idiv
	generators[0x6c] = generateAB('if (b === 0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");\n' + 
		'var value = ~~(a / b);\n' + 
		generateOverflowChecking(32) +
		'context.stack.push(value);\n');
	// if_acmpeq
	generators[0xa5] = generateGoto('===');
	// if_acmpne
	generators[0xa6] = generateGoto('!==');
	// if_icmpeq
	generators[0x9f] = generateGoto('===');
	// if_icmpne
	generators[0xa0] = generateGoto('!==');
	// if_icmplt
	generators[0xa1] = generateGoto('<');
	// if_icmpge
	generators[0xa2] = generateGoto('>=');
	// if_icmpgt
	generators[0xa3] = generateGoto('>');
	// if_icmple
	generators[0xa4] = generateGoto('<=');
	// ifeq
	generators[0x99] = generateGoto('=== 0');
	// ifne
	generators[0x9a] = generateGoto('!== 0');
	// iflt
	generators[0x9b] = generateGoto('< 0');
	// ifge
	generators[0x9c] = generateGoto('>= 0');
	// ifgt
	generators[0x9d] = generateGoto('> 0');
	// ifle
	generators[0x9e] = generateGoto('<= 0');
	// ifnonnull
	generators[0xc7] = generateGoto('!= null');
	// ifnull
	generators[0xc6] = generateGoto('== null');
	// iinc
	generators[0x84] = function () {
		var index = stream.readUint8();
		var value = stream.readInt8();
		return 'var value = (context.locals[' + index + '] + ' + value +') | 0;\n' +
			'context.locals[' + index + '] = value;\n';
	};
	// iload
	generators[0x15] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	};
	// iload_0
	generators[0x1a] = function () {
		return generateLoad(0);
	};
	// iload_1
	generators[0x1b] = function () {
		return generateLoad(1);
	}
	// iload_2
	generators[0x1c] = function () {
		return generateLoad(2);
	}
	// iload_3
	generators[0x1d] = function () {
		return generateLoad(3);
	}
	// imul
	generators[0x68] = generateAB('var value = (a * b) | 0;\n' +
		'context.stack.push(value);\n');
	// ineg
	generators[0x74] = function () {
		return 'var value = -context.stack.pop();\n' +
			generateOverflowChecking(32) +
			'context.stack.push(value);\n';
	};
	// instanceof
	generators[0xc1] = function () {
		var type = constantPool[stream.readUint16()];
		return function (context) {
			var ref = context.stack.pop();
			
			if (ref != null) {
				if (ref.constructor == Array) {
					context.stack.push(ref);
					return;
				}
				var refClass = js2me.findClass(ref.className).prototype;
				var cmpClass = js2me.findClass(type.className).prototype;
				if (refClass.isImplement(cmpClass.className)) {
					context.stack.push(1);
				} else {
					context.stack.push(0);
				}
			} else {
				context.stack.push(0);
			}
		};
	}
	function generateInvoke(isStatic, isVirtual, isGarbage) {
		try {
			var methodInfo = constantPool[stream.readUint16()];
			if (isGarbage) {
				stream.readUint16();
			}
			var argumentsCount = methodInfo.type.argumentsTypes.length;
			var body = '';
			for (var i = argumentsCount - 1; i >= 0; i--) {
				body += 'var args' + i + ' = context.stack.pop();\n';
			}
			if (js2me.profile) {
				//body += 'js2me.calledMethods["' + methodInfo.className + '.prototype.' + methodInfo.name + '"] = js2me.calledMethods["' + methodInfo.className + '.prototype.' + methodInfo.name + '"] + 1 || 1;\n';
			}
			//body += 'console.debug("'+methodInfo.className + '->' + methodInfo.name +'");console.debug(args);\n';
			
			if (!isStatic) {
				body += 'var obj = context.stack.pop();\n' +
				'if (obj == null) {\n' +
				'	throw new javaRoot.$java.$lang.$NullPointerException();\n' +
				'}\n' +
				'if (obj.constructor == Array) {\n' +
				'	obj = new javaRoot.$java.$lang.$ArrayObject(obj);\n' +
				'}\n';
			}
			
			var isSaveResult = (methodInfo.type.returnType != 'V');
			body += 'context.saveResult = ' + isSaveResult + ';\n';
			var args = '';
			for (var i = 0; i < argumentsCount; i++) {
				args += ', args' + i;
			}
			body += 'var result = ';
			if (isVirtual) {
				body += 'obj.' + methodInfo.name + '(' + args.substr(1) + ');\n';
			} else {
				if (isStatic) {
					body += methodInfo.className + '.prototype.' + methodInfo.name + '(' + args.substr(1) + ');\n';
				} else {
					body += methodInfo.className + '.prototype.' + methodInfo.name + '.call(obj' + args + ');\n';
				}
			}
			var result;
			var classObj;
			var isInvocationSafe = false;
			try {
				classObj = js2me.findClass(methodInfo.className);
				isInvocationSafe = true;
				if (isVirtual) {
					var subclasses = js2me.findSubclasses(methodInfo.className);
				} else {
					var subclasses = [js2me.findClass(methodInfo.className)];
				}
				for (var i = 0; i < subclasses.length; i++) {
					if (subclasses[i].prototype[methodInfo.name] && subclasses[i].prototype[methodInfo.name].isUnsafe) {
						isInvocationSafe = false;
					}
				}
			} catch (e) {}
			if (isInvocationSafe) {
				if (isSaveResult) {
					body += 'context.stack.push(result);\n';
				}
				if (js2me.profile) {
					body +=	'if (js2me.isThreadSuspended) {\n' +
						'	throw new Error("Safe method ' + methodInfo.className + '->' + methodInfo.name + ' just suspended the thread!");\n' + 
						'}\n';
				}
				isSubfunctionSafe = true;
			} else {
				body += 'if (context.saveResult && !js2me.isThreadSuspended) {\n' +
					'	context.stack.push(result);\n' +
					'	context.saveResult = false;\n' +
					'}\n';
				jumpFrom[currentOpIndex]++;
				isSubfunctionSafe = false;
			}
			if (classObj) {
				return body;
			} else {
				var func = new Function('context', body);
				return generateLoadClass(methodInfo.className, function (context, classObj) {
					func(context);
				});
			}
		}  catch (e) {
			console.error(e.message);
		}
	}
	// invokeinterface
	generators[0xb9] = function () {
		return generateInvoke(false, true, true);
	};
	// invokespecial
	generators[0xb7] = function () {
		return generateInvoke(false, false);
	};
	// invokestatic
	generators[0xb8] = function () {
		return generateInvoke(true, false);
	};
	// invokevirtual
	generators[0xb6] = function () {
		return generateInvoke(false, true);
	};
	// ior
	generators[0x80] = generateAB('js2me.stat++;context.stack.push(a | b);\n');
	// irem
	generators[0x70] = generateAB('if (b === 0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");\n' + 
		'context.stack.push(a % b);\n');
	// ireturn
	generators[0xac] = generateReturn;
	// ishl
	generators[0x78] = generateAB('context.stack.push(a << (b % 32));\n');
	// ishr
	generators[0x7a] = generateAB('context.stack.push(a >> (b % 32));\n');
	function generateStore(index) {
		return 'context.locals[' + index + '] = context.stack.pop();\n';
	}
	// istore
	generators[0x36] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	}
	// istore_0
	generators[0x3b] = function () {
		return generateStore(0);
	}
	// istore_1
	generators[0x3c] = function () {
		return generateStore(1);
	};
	// istore_2
	generators[0x3d] = function () {
		return generateStore(2);
	};
	// istore_3
	generators[0x3e] = function () {
		return generateStore(3);
	};
	// isub
	generators[0x64] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();\n' +
		'context.stack.push(a - b);\n';
	// iushr
	generators[0x7c] = 'var shift = context.stack.pop() % 32;\n' + 
		'var value = context.stack.pop();\n' +
		'var result;\n' +
		'if (value >= 0) {\n' +
		'	result = value >> shift;\n' +
		'} else {\n' +
		'	result = (value >> shift) + (2 << ~shift);\n' +
		'}\n' +
		'context.stack.push(result);\n';
	// ixor
	generators[0x82] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();\n' +
		'context.stack.push(a ^ b);\n';
	// l2d
	generators[0x8a] = function (context) {
		var value = context.stack.pop();
		var double = value.hi;
		if (double >= 0x80000000) {
			double -= 0x100000000;
		}
		double *= 0x100000000;
		double += value.lo;
		context.stack.push({double: double});
	};
	// l2i
	generators[0x88] = 'var value = context.stack.pop();\n' +
		'var int = value.lo;\n' +
		'if (int >= 0x80000000) {\n' +
		'	int -= 0x100000000;\n' +
		'}\n' +
		'context.stack.push(int);\n';
	// ladd
	generators[0x61] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();\n' +
		'context.stack.push(js2me.ladd(a, b));\n';
	// laload
	generators[0x2f] = function (context) {
		var index = context.stack.pop();
		var array = context.stack.pop();
		context.stack.push(array[index]);
	};
	// land
	generators[0x7f] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();\n' +
		'context.stack.push({hi: a.hi & b.hi, lo: a.lo & b.lo});\n';
	// lastore
	generators[0x50] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		array[index] = value;
	};
	// lcmp
	generators[0x94] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();\n' +
		'context.stack.push(js2me.lcmp(a, b));\n';
	// lconst_0
	generators[0x09] = 'context.stack.push({hi: 0, lo: 0});\n';
	// lconst_1
	generators[0x0a] = 'context.stack.push({hi: 0, lo: 1});\n';
	// ldc
	generators[0x12] = function () {
		var index = stream.readUint8();
		return 'context.stack.push(context.constantPool[' + index + ']);\n';
	};
	// ldc_w, ldc2_w
	generators[0x14] = generators[0x13] = function () {
		var index = stream.readUint16();
		return 'context.stack.push(context.constantPool[' + index + ']);\n';
	};
	// ldiv
	generators[0x6d] = generateAB('if (b.hi === 0 && b.lo ===0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");\n' + 
		'context.stack.push(js2me.ldiv(a, b).div);\n');
	// lload
	generators[0x16] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	};
	// lload_0
	generators[0x1e] = function () {
		return generateLoad(0);
	};
	// lload_1
	generators[0x1f] = function () {
		return generateLoad(1);
	};
	// lload_2
	generators[0x20] = function () {
		return generateLoad(2);
	};
	// lload_3
	generators[0x21] = function () {
		return generateLoad(3);
	};
	// lmul
	generators[0x69] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();\n' +
		'context.stack.push(js2me.lmul(a, b));\n'
	// lneg
	generators[0x75] = 'var a = context.stack.pop();\n' +
		'context.stack.push(js2me.lneg(a));\n'
	// lookupswitch
	generators[0xab] = function () {
		var start = stream.index - 1;
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = start + stream.readInt32();
		jumpTo[def]++;
		var count = stream.readInt32();
		var table = [];
		var body = 'var i = context.stack.pop();\n';
		for (var i = 0; i < count; i++) {
			var match = stream.readInt32();
			var value = start + stream.readInt32();
			table[match] = value;
			jumpTo[value]++;
			body += 'if (i === ' + match + ') {\n' +
				'	context.position = /*' + value + '*/; return;\n' +
				'}\n';
		}
		body += 'context.position = /*' + def + '*/; return;\n';
		return body;
	}
	// lor
	generators[0x81] = 'var b = context.stack.pop();\n' +
		'var a = context.stack.pop();' +
		'context.stack.push({hi: a.hi | b.hi, lo: a.lo | b.lo});';
	// lrem
	generators[0x71] = generateAB('if (b.hi === 0 && b.lo ===0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");\n' +
		'context.stack.push(js2me.ldiv(a, b).rem);\n');
	// lreturn
	generators[0xad] = generateReturn;
	// lshl
	generators[0x79] = 'var shift = context.stack.pop() % 64;\n' +
		'var value = context.stack.pop();\n' +
		'context.stack.push(js2me.lshl(value, shift));\n';
	// lshr
	generators[0x7b] = 'var shift = context.stack.pop() % 64;\n' +
		'var value = context.stack.pop();\n' +
		'var result = js2me.lshr(value, shift, true);\n' +
		'context.stack.push(result);\n';
	// lstore
	generators[0x37] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// lstore_0
	generators[0x3f] = generateStore(0);
	// lstore_1
	generators[0x40] = generateStore(1);
	// lstore_2
	generators[0x41] = generateStore(2);
	// lstore_3
	generators[0x42] = generateStore(3);
	// lsub
	generators[0x65] = function (context) {
		return 'var b = context.stack.pop();\n' +
			'var a = context.stack.pop();\n' +
			'context.stack.push(js2me.lsub(a, b));\n';
	};
	// lxor
	generators[0x83] = function (context) {
		return 'var b = context.stack.pop();\n' +
			'var a = context.stack.pop();\n' +
			'context.stack.push(js2me.lxor(a, b));\n';
	};
	// lushr
	generators[0x7d] = 'var shift = context.stack.pop() % 64;\n' +
		'var value = context.stack.pop();\n' +
		'var result = js2me.lshr(value, shift, false);\n' +
		'context.stack.push(result);\n';
	// monitoenter
	generators[0xc2] = function () {
		isSubfunctionSafe = false;
		return function (context) {
			var obj = context.stack.pop();
			if (obj.monitorCount == null) {
				obj.monitorCount = [];
			}
			if (obj.monitorQueue == null) {
				obj.monitorQueue = [];
			}
			if (obj.monitorCount.length == 0 || obj.monitorCount[0] == js2me.currentThread) {
				obj.monitorCount.push(js2me.currentThread)
			} else {
				obj.monitorQueue.push(js2me.currentThread)
				js2me.isThreadSuspended = true;
				context.finish = true;
				context.saveResult = false;
			}
		};
	};
	// monitoexit
	generators[0xc3] = function (context) {
		var obj = context.stack.pop();
		if (obj.monitorCount == null) {
			obj.monitorCount = [];
		}
		if (obj.monitorQueue == null) {
			obj.monitorQueue = [];
		}
		obj.monitorCount.pop();
		if (obj.monitorCount.length == 0) {
			var threadId = obj.monitorQueue.pop();
			if (threadId != null) {
				setTimeout(function () {
					js2me.restoreThread(threadId);
				}, 1);
			}
		}
	};
	// multinewarray
	generators[0xc5] = function () {
		var type = constantPool[stream.readUint16()].className;
		var dimensions = stream.readUint8();
		return function (context) {
			var counts = [];
			var className = type;
			for (var i = 0; i < dimensions; i++) {
				counts[i] = context.stack.pop();
			}
			className = className.substr(1);
			counts.reverse();
			function setLength(element, depth, className) {
				className = className.substr(1);
				if (depth + 1 == dimensions) {
					for (var i = 0; i < counts[depth]; i++) {
						if (type.indexOf('L') == -1) {
							if (type.indexOf('J') != -1) {
								element[i] = {hi: 0, lo: 0};
							} else if (type.indexOf('D') != -1) {
								element[i] = js2me.dconst0;
							} else {
								element[i] = 0;
							}
						} else {
							element[i] = null;
						}
							
					}
					return;
				}
				for (var i = 0; i < counts[depth]; i++) {
					element[i] = [];
					element[i].className = className;
					setLength(element[i], depth + 1, className);
				}
			}
			var array = [];
			array.className = className;
			setLength(array, 0, className);
			context.stack.push(array);
		};
	};
	function generateLoadClass(className, callback) {
		/*if (!js2me.classDependecies[className]) {
			js2me.classDependecies[className] = [];
		}
		js2me.classDependecies[className].push(*/
		var classCache = null;
		if (className === data.parent.prototype.className) {
			return function (context) {
				callback(context, data.parent);
			};
		}
		return function (context) {
			if (classCache) {
				context.regenerate = true;
				callback(context, classCache);
				return;
			}
			context.saveResult = false;
			var loaded = false;
			var async = false;
			var threadId = js2me.currentThread;
			js2me.loadClass(className, function (classObj) {
				loaded = true;
				js2me.isThreadSuspended = false;
				classCache = classObj;
				callback(context, classObj);
			});
			if (!loaded) {
				async = true;
				js2me.isThreadSuspended = true;
				js2me.restoreStack[threadId] = [];
			}
		};
	}
	// new
	generators[0xbb] = function () {
		var classInfo = constantPool[stream.readUint16()];
		
		// probably useless...
		require.push(classInfo.className);
		try {
			var constructor = js2me.findClass(classInfo.className);
			if (constructor.prototype.initialized) {
				return 'var instance = new ' + classInfo.className + '();\n' +
					'context.stack.push(instance);\n';
			}
		} catch (e) {}
		return generateLoadClass(classInfo.className, function (context, classObj) {
			var instance = new classObj();
			context.stack.push(instance);
		});
	};
	// newarray
	generators[0xbc] = function () {
		var type = stream.readUint8();
		var body = 'var length = context.stack.pop();\n' +
			'var array = new Array(length);\n';
		body += 'for (var i = 0; i < length; i++) {\n';
		if (type == 7) {
			body += 'array[i] = js2me.dconst0;\n';
		} else if (type == 11) {
			body += 'array[i] = {hi: 0, lo: 0};\n';
		} else {
			body += 'array[i] = 0;\n';
		}
		body += '}\n';
		body += 'context.stack.push(array);\n';
		return body;
	}
	// noop
	generators[0x00] = ' ';
	// pop
	generators[0x57] = function () {
		return 'context.stack.pop();\n';
	}
	// pop2
	generators[0x58] = function () {
		return 'context.stack.pop();\n' +
			'context.stack.pop();\n';
	}
	// putfield
	generators[0xb5] = function () {
		var field = constantPool[stream.readUint16()];
		try {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			return 'var value = context.stack.pop();\n' +
				'var obj = context.stack.pop();\n' +
				'obj.$' + fieldId + ' = value;\n';
		} catch (e) {}
		return function (context) {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			var value = context.stack.pop();
			var obj = context.stack.pop();
			obj['$' + fieldId] = value;
		};
	}
	// putstatic
	generators[0xb3] = function () {
		var field = constantPool[stream.readUint16()];
		try{
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			if (classObj.prototype && classObj.prototype.initialized) {
				return field.className + '.prototype.$' + fieldId + ' = context.stack.pop();\n'
			}
		} catch (e) {}
		return generateLoadClass(field.className, function (context, classObj) {
			var value = context.stack.pop();
			var fieldId = classObj.prototype[field.name];
			classObj.prototype['$' + fieldId] = value;
		});
	}
	// return
	generators[0xb1] = 'context.finish = true;\n' +
		'return;\n';	
	// saload
	generators[0x35] = function () {
		return 'var index = context.stack.pop();\n' +
			'var array = context.stack.pop();\n' +
			'if (array == null) {\n' +
			'	throw new javaRoot.$java.$lang.$NullPointerException();\n' +
			'}\n' +
			'if (index > array.length) {\n' +
			'	throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();\n' +
			'}\n' +
			'context.stack.push(array[index]);\n';
	}
	// sastore
	generators[0x56] = function () {
		return 'var value = context.stack.pop();\n' +
			'var index = context.stack.pop();\n' +
			'var array = context.stack.pop();\n' +
			'array[index] = value;\n'
	}
	// sipush
	generators[0x11] = function () {
		var value = stream.readInt16();
		return 'context.stack.push(' + value + ');\n';
	}
	// swap
	generators[0x5f] = function () {
		return 'var b = context.stack.pop();\n' +
			'var a = context.stack.pop();\n' +
			'context.stack.push(a);\n' +
			'context.stack.push(b);\n';
	}
	// tableswitch
	generators[0xaa] = function () {
		var start = stream.index - 1;
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = start + stream.readInt32();
		jumpTo[def]++;
		var low = stream.readInt32();
		var high = stream.readInt32();
		var count = high - low + 1;
		var table = [];
		var body = 'var i = context.stack.pop();\n';
		for (var i = 0; i < count; i++) {
			table[low + i] = start + stream.readInt32();
			jumpTo[table[low + i]]++;
			body += 'if (i === ' + (low + i) + ') {\n' +
				'	context.position = /*' + table[low + i] + '*/; return;\n' +
				'}\n';
		}
		body += 'context.position = /*' + def + '*/; return;\n';
		return body;
	}
	// wide
	generators[0xc4] = function (context) {
		var op = stream.readUint8();
		var index = stream.readUint16();
		if (op >= 21 && op <= 25) {
			return new Function('context', 'context.push(context.locals[' + index + ']);'); 
		}
		if (op >= 54 && op <= 58) {
			return new Function('context', 'context.locals[' + index + '] = context.pop();'); 
		}
		if (op == 0x84) {
			var value = stream.readInt16();
			return new Function('context', 'context.locals[' + index + '] += ' + value + ';'); 
		}
		throw new Error('wide: unkown op ' + index);
	}
	var program = [];
	var calls = [];
	var positionMapping = new Array(stream.getRemaining());
	var reversedMapping = [];
	var require = [];
	var jumpTo = new Int32Array(stream.getRemaining());
	var jumpFrom = new Int32Array(stream.getRemaining());
	var jumpTarget = [];
	var isSafe = true;
	var currentOpIndex = 0;
	
	for (var i = 0; i < exceptions.length; i++) {
		jumpTo[exceptions[i].startPc]++;
		jumpFrom[exceptions[i].endPc]++;
		jumpTo[exceptions[i].handler]++;
	}
	
	var isSubfunctionSafe;
	var onlyCode = true;
	while (!stream.isEnd()) {
		reversedMapping[program.length] = stream.index;
		currentOpIndex = stream.index;
		var op = stream.readUint8();
		if (!js2me.usedByteCodes[op]) {
			js2me.usedByteCodes[op] = 0;
		}
		js2me.usedByteCodes[op]++;
		if (generators[op]) {
			isSubfunctionSafe = true;
			var func = null;
			try {
				func = generators[op]();
			} catch (e) {
				var wannaBreakpoint = true;
			}
			if (func != null) {
				program.push(func);
			} else {
				program.push(generators[op]);
			}
			if (program[program.length - 1].constructor === String) {
				program[program.length - 1] = '//0x'+ op.toString(16) +'\n' + program[program.length - 1];
			} else {
				onlyCode = false;
			}
			isSafe = isSafe && isSubfunctionSafe;
		} else {
			throw new Error('Op ' + op.toString(16) + ' not supported');
		}
	}
	var varId = 0;
	function reduceStackOperations(code) {
		var start = 0;
		var position = 0;
		var popTemplate = 'context.stack.pop()';
		var pushTemplate = 'context.stack.push';
		while ((position = code.indexOf(popTemplate, start)) != -1) {
			var pushPosition = code.substring(0, position).lastIndexOf(pushTemplate);
			if (pushPosition != -1 && code.substring(pushPosition, position).indexOf('//STOP') == -1) {
				var newCode = code.substring(0, pushPosition);
				newCode += 'var tmp' + varId +' = ';
				newCode += code.substring(pushPosition + pushTemplate.length, position);
				newCode += 'tmp' + varId;
				start = newCode.length;
				newCode += code.substring(position + popTemplate.length);
				varId++;
				code = newCode;
			} else {
				start = position + popTemplate.length;
			}
		}
		return code;
	}
	function checkFragment(pos, constructor, toValue, fromValue)  {
		var realPos = reversedMapping[pos];
		return program[pos] != null && program[pos].constructor === constructor
			&& jumpTo[realPos] === toValue && jumpFrom[realPos] === fromValue;
	}
	
	// optimizations
	var isOptimizing = true;
	while (isOptimizing) {
		isOptimizing = false;
		var i = 0;
		while (i < program.length) {
			if (program[i].constructor === String) {
				// merge functions
				var run = true;
				while (i + 1 < program.length && program[i + 1].constructor === String && run) {
					run = false;
					if (jumpFrom[reversedMapping[i]] === 0) {
						if (jumpTo[reversedMapping[i + 1]] === 0) {
							if (jumpFrom[reversedMapping[i + 1]]  !== 0) {
								jumpFrom[reversedMapping[i]] -= jumpFrom[reversedMapping[i + 1]];
							}
							program[i] += program[i + 1];
							program.splice(i + 1, 1);
							reversedMapping.splice(i + 1, 1);
							isOptimizing = true;
							run = true;
						} else {
							var regexp = new RegExp('context.position = /\\*' + reversedMapping[i + 1] + '\\*/', 'g');
							var match = program[i].match(regexp);
							if (match && match.length == jumpTo[reversedMapping[i + 1]]) {
								var body = 'jmp' + varId + ': do {//STOP\n';
								body += program[i].replace(regexp, 'break jmp' + varId);
								body += 'break;} while (true);//STOP\n' + program[i + 1];
								if (jumpFrom[reversedMapping[i + 1]]  !== 0) {
									jumpFrom[reversedMapping[i]] -= jumpFrom[reversedMapping[i + 1]]
								}
								program[i] = body;
								varId++;
								program.splice(i + 1, 1);
								reversedMapping.splice(i + 1, 1);
								isOptimizing = true;
								run = true;
							}
							var regexp = new RegExp('context.position = /\\*' + reversedMapping[i] + '\\*/', 'g');
							var match = program[i].match(regexp);
							if (match) {
								var body = 'jmp' + varId + ': do {//STOP\n';
								body += program[i].replace(regexp, 'continue jmp' + varId);
								body += 'break;} while (true);//STOP\n';
								program[i] = body;
								jumpTo[reversedMapping[i]] -= match.length;
								varId++;
								isOptimizing = true;
								run = true;
							}
						}
					}
				}
				program[i] = reduceStackOperations(program[i]);
				for (var j = 0; j < exceptions.length; j++) {
					if (exceptions[j].startPc === reversedMapping[i] && exceptions[j].endPc <= reversedMapping[i + 1]) {
						var body = 'try {//STOP\n';
						body += program[i];
						body += '} catch(e) {//STOP\n';
						if (exceptions[j].catchType != null) {
							body += '	if (e.isImplement && e.isImplement("' + exceptions[j].catchType.className + '")) {\n';
						}
						body += '		context.stack.push(e);\n';
						body += '		context.position = /*' + exceptions[j].handler + '*/; return;\n';
						if (exceptions[j].catchType != null) {
							body += '	} else throw e;\n';
						}
						body += '}//STOP\n';
						program[i] = body;
						jumpTo[reversedMapping[i]]--;
						jumpFrom[reversedMapping[i]]--;
						exceptions.splice(j, 1);
						isOptimizing = true;
						j--;
					}
				}
			}
			i++;
		}
	}
	for (var i = 0; i < reversedMapping.length; i++) {
		positionMapping[reversedMapping[i]] = i;
	}
	for (var i = 1; i < positionMapping.length; i++) {
		if (positionMapping[i] == null) {
			positionMapping[i] = positionMapping[i - 1];
		}
	}
	for (var i = 0; i < exceptions.length; i++) {
		exceptions[i].startPc = positionMapping[exceptions[i].startPc];
		exceptions[i].endPc = positionMapping[exceptions[i].endPc];
	}
	// Last effort to merge it all
	if (isSafe && program.length > 1 && onlyCode && data.exceptions.length === 0) {
		var body = 'var position = 0;\n';
		body += 'while (true) {\nmain: switch (position) {\n';
		for (var i = 0; i < program.length; i++) {
			body += '\ncase ' + i + '://STOP\n';
			body += program[i]
				.replace(new RegExp('return "jump"', 'g'), 'break main')
				.replace(new RegExp('context.position', 'g'), 'position');
		}
		body += '}\n}\n';
		program = [body];
	}
	//isSafe = false;
	for (var i = 0; i < program.length; i++) {
		if (program[i].constructor === String) {
			for (var j = 0; j < reversedMapping.length; j++) {
				program[i] = program[i].replace(new RegExp('/\\*' + reversedMapping[j] + '\\*/', 'g'), j);
			}
			program[i] = program[i];
			try {
				if (program.length > 1 || !isSafe) {
					program[i] = '//# sourceURL=' + methodName.replace(new RegExp('\\.prototype\\.|\\.', 'g'), '/') + '/' + reversedMapping[i] + '.js\n' + program[i];
					program[i] = 'var functionResult;\n' + program[i];
					if (js2me.profile) {
						program[i] = 'return function ' + methodName.replace(new RegExp('\\.', 'g'), '_') + i + '(context) {\n' + program[i] + '};';
					}
					program[i] = new Function('context', program[i]);
					if (js2me.profile) {
						program[i] = program[i]();
					}
				}
			} catch(e) {
				console.error(e.message);
				console.error(program[i]);
			}
		}
	}
	console.log('Length: ' + program.length + ' Safe: ' + isSafe);
	
	/*for (var i = 0; i < program.length; i++) {
		console.log(reversedMapping[i] + ': ' + program[i].toString());
		console.error('************');
	}*/
	stream.reset();
	data.content =  program;
	data.mapping = positionMapping;
	data.require = require;
	data.isSafe = isSafe;
	data.parent.prototype[data.name].data = data;
	if (data.isSafe) {
		data.parent.prototype[data.name].isUnsafe = false;
		localStorage.setItem(js2me.storageName + methodName, 'safe');
	}
	
	// We can compile to native function!
	if (data.isSafe && data.content.length === 1) {
		console.log(data.methodName + ' is safe! Compiling to native :)');
		var methodBody = data.content[0];
		var limit = 5000;
		var args = [];
		for (var i = 0; i < data.maxLocals; i++) {
			var localName;
			//locals[0] == this for non-static
			if (!data.isStatic) {
				if (i > 0) {
					localName = 'local' + i;
				} else {
					localName = '_this';
				}
			} else  {
				localName = 'local' + i;
			}
			methodBody = methodBody.replace(new RegExp('context\\.locals\\[' + i + '\\]', 'g'), localName);
			if (localName != '_this') {
				if (args.length < data.argumentsTypes.length) {
					args.push(localName);
					if (data.argumentsTypes[args.length - 1] === 'D' || data.argumentsTypes[args.length - 1] === 'J') {
						i++;
						localName = 'local' + i;
						methodBody = methodBody.replace(new RegExp('context\\.locals\\[' + i + '\\]', 'g'), localName);
						methodBody = 'var ' + localName + ';\n' + methodBody;
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
		methodBody = 'var _this = this;\n' + methodBody;
		methodBody = 'var constantPool = ' + methodName + '.constantPool;\n' + methodBody;
		// dear Chromium developers, I love you!
		methodBody = '//# sourceURL=' + methodName.replace(new RegExp('\\.prototype\\.|\\.', 'g'), '/') + '.js\n' + methodBody;
		args.push('callback');
		if (js2me.profile) {
			methodBody = 'return function ' + methodName.replace(new RegExp('\\.', 'g'), '_') + '(' + args.join(',') + ') {\n' + methodBody + '};';
		}
		args.push(methodBody);
		try {
			data.nativeMethod = Function.apply(null, args);
			if (js2me.profile) {
				data.nativeMethod = data.nativeMethod();
			}
			data.nativeMethod.constantPool = constantPool;
			data.parent.prototype[data.name] = data.nativeMethod;
			data.isNative = true;
		} catch (e) {
			console.error(e);
			console.log(methodBody);
		}
	}
};

// what I have done...
