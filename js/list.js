window.addEventListener('load', function() {
	var cursor = navigator.getDeviceStorage('sdcard').enumerate();
	cursor.onsuccess = function () {
		if (this.result) {
			if (this.result.type == 'application/java-archive') {
				$('.no-jars-message').hide();
				var slashPosition = this.result.name.lastIndexOf('/');
				if (slashPosition == -1) {
					slashPosition = 0;
				}
				var filename = this.result.name.substr(slashPosition);
				var path = '/launch.html?src=' + this.result.name + '&smt=smt';
				var element = $('<li><a>' + filename + '</a></li>');
				var list = $('#main ul');
				list.append(element);
				list.listview('refresh');
				element.on('vclick', function () {
					window.open(path, '_self');
				});
			}
			this.continue();
		}
	};
});
