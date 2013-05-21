js2me.parseManifest = function (content) {
	var manifest = {};
	var lines = content.split('\n');
	for (var i in lines) {
		var parts = lines[i].split(':');
		if (parts.length > 1) {
			manifest[parts[0].toLowerCase()] = parts[1];
		}
	}
	return manifest;
}
