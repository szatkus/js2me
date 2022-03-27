var OSName="Unknown OS";
if (navigator.userAgent.indexOf("Mozilla/5.0 (Mobile; rv")!=-1) OSName="Firefox OS";
if (navigator.userAgent.indexOf("Mozilla/5.0 (Mobile; rv:48.0")!=-1) OSName="KaiOS";
if (navigator.userAgent.indexOf("KAIOS")!=-1) OSName="KaiOS";

// start of "window.onload"
window.onload = function(){

document.querySelector("#splashloader").innerHTML = ``;

var envlogtxt = "Environment detected: "
if(OSName == 'Firefox OS'){
        console.log(envlogtxt +OSName +".");
        var environmenttext = document.getElementById('environment');
        var text = document.createTextNode(OSName);
        environmenttext.appendChild(text);
}

if(OSName == 'KaiOS'){
        console.log(envlogtxt +OSName +".");
        var environmenttext = document.getElementById('environment');
        var text = document.createTextNode(OSName);
        environmenttext.appendChild(text);
        //document.querySelector("#head").innerHTML += `<script type="text/javascript" src="platform-kaios.js"></script>`;
        //document.getElementsByTagName('head')[0].appendChild = '<script type="text/javascript" src="platform-kaios.js"></script>'
        //document.querySelector("#head").writeln = `<script type="text/javascript" src="platform-kaios.js"></script>`;
        requirejs(["platform-kaios.js"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});
        requirejs(["platform-kaios-custom.js"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});
}

//if ((OSName !== 'Firefox OS') || (OSName !== 'KaiOS')){
//        console.log("Environment detected: Not Firefox OS and not KaiOS.");
//        var environmenttext = document.getElementById('environment');
//        var text = document.createTextNode("Not Firefox OS and not KaiOS.");
//        environmenttext.appendChild(text);
//}

if (OSName !== 'Firefox OS'){
        if (OSName !== 'KaiOS'){
                document.querySelector("#splashloader").innerHTML = ``;
                console.log(envlogtxt +"Not Firefox OS and not KaiOS.");
                var environmenttext = document.getElementById('environment');
                var text = document.createTextNode("Not Firefox OS and not KaiOS.");
                environmenttext.appendChild(text);
                requirejs(["platform-not-kaios-not-firefox.js"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});
}
}

} // end of "window.onload"
