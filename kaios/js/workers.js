window.addEventListener('load', function () {
	if (js2me.config.workers) {
		js2me.worker = new Worker('js/worker.js');
		js2me.worker.postMessage(['setConfig', js2me.config]);
		var storage = {};
		for (var i in localStorage) {
			storage[i] = localStorage[i];
		}
		js2me.worker.postMessage(['setStorage', storage]);
		js2me.sharedObjects = [document.body];
		js2me.worker.onmessage = function (event) {
			var piece;
			var parent = window;
			var obj = window;
			var data = event.data.slice(0);
			if (data.length === 1) {
				js2me.sharedObjects[data[0].sharedId][data[0].name] = data[0].value;
				return;
			}
			if (data[0].constructor === Number) {
				obj = js2me.sharedObjects[data.shift()];
			}
			while ((piece = data.shift()).constructor === String) {
				parent = obj;
				obj = obj[piece];
			}
			for (var i = 0; i < data.length; i++) {
				if (data[i] && data[i].objectId != null) {
					data[i] = js2me.sharedObjects[data[i].objectId];
				}
				if (data[i] && data[i].functionId != null) {
					(function (id) {
						data[i] = function () {
							js2me.worker.postMessage(['fire', id]);
						}
					})(data[i].functionId);
				}
			}
			try {
				var result = obj.apply(parent, data);
			} catch (e) {
				debugger;
			}
			if (piece >= 0) {
				js2me.sharedObjects[piece] = result;
				if (result && result.tagName === 'IMG') {
					result.addEventListener('load', function () {
						js2me.worker.postMessage(['setProperties', piece, {width: result.width, height: result.height}]);
					});
				}
			}
		};
	}
});
