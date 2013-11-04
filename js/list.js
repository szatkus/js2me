window.addEventListener('load', function() {
	var storage = navigator.getDeviceStorage('sdcard');
	storage.onchange = function () {
		refreshList();
	};
	refreshList();
	function refreshList() {
		var cursor = storage.enumerate();
		$('.no-jars-message').show();
		var list = $('#main ul');
		list.html('');
		cursor.onsuccess = function () {
			if (this.result) {
				console.log(this.result.name);
				if (this.result.name.lastIndexOf('.jar') == this.result.name.length - 4) {
					$('.no-jars-message').hide();
					var slashPosition = this.result.name.lastIndexOf('/') + 1;
					if (slashPosition == -1) {
						slashPosition = 0;
					}
					var filename = this.result.name.substr(slashPosition);
					var path = '/launch.html?src=' + encodeURIComponent(this.result.name) + '&app=1';
					var element = $('<li><a>' + filename + '</a></li>');
					
					list.append(element);
					list.listview('refresh');
					element.on('vclick', function () {
						window.open(path, '_self');
					});
				}
				this.continue();
			}
		};
	}
});
