/**
 * Creates manifest object from given content.
 * @param {string} content Manifest file's content.
 * @return {object} Manifest object.
 */
js2me.parseManifest = function (content) {
	var manifest = {};
	var lines = content.split('\n');
	var lastSection;
	for (var i in lines) {
		var parts = lines[i].split(':');
		if (parts.length > 1) {
			lastSection = parts[0].toLowerCase();
			manifest[lastSection] = parts[1].trim();
		} else {
			manifest[lastSection] += parts[0].trim();
		}
	}
	return manifest;
}
