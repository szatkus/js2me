var document = {
	createElement: function (tagName) {
		var obj = {
			id: js2me.sharedId++
		};
		postMessage(['invokeProxy', 'document', 'createElement', obj.id, tagName])
		return obj;
	}
};
