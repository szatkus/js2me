var page = require('webpage').create();
var system = require('system');
page.onConsoleMessage = function (msg) {
    console.log(msg);
    if (msg.indexOf('SUCCESS') != -1 || msg.indexOf('FAIL') != -1 ||
		msg.indexOf('UNKNOWN') != -1) {
		phantom.exit();
	}
};
page.open(system.args[1], function (status) {
    
});
