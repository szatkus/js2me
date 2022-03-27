var OSName="Unknown OS";
if (navigator.userAgent.indexOf("Altaica")!=-1) OSName="Altaica";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
// using these directly from index.js says OSName is undefined; have to fix it

var envlogtxt = "Environment detected: " // also had to place it again; fix like in the previous

// from https://ourcodeworld.com/articles/read/390/how-to-know-if-your-application-is-running-in-cordova-or-a-web-browser
if(window.hasOwnProperty("cordova")){
    console.log(envlogtxt +"Cordova.");
    var environmenttext = document.getElementById('environment');
    var text = document.createTextNode(OSName);
    environmenttext.appendChild(text);
}

// Or 

if(typeof(cordova) == "object"){
    console.log(envlogtxt +"Cordova.");
    var environmenttext = document.getElementById('environment');
    var text = document.createTextNode(OSName);
    environmenttext.appendChild(text);
}

// Or 

if(!!window.cordova){
    console.log(envlogtxt +"Cordova.");
    var environmenttext = document.getElementById('environment');
    var text = document.createTextNode(OSName);
    environmenttext.appendChild(text);
}
// from https://ourcodeworld.com/articles/read/390/how-to-know-if-your-application-is-running-in-cordova-or-a-web-browser

if(OSName == 'Altaica'){
        console.log(envlogtxt +OSName +".");
        var environmenttext = document.getElementById('environment');
        var text = document.createTextNode(OSName);
        environmenttext.appendChild(text);
}

if("file:" == document.location.protocol)
	{
                console.log(envlogtxt +"File protocol; Local page.");
                //document.querySelector("#environment").innerHTML = `File protocol; Local page.`;
	}

if("localhost:" == document.location.protocol)
	{
                console.log(envlogtxt +"Localhost.");
                //document.querySelector("#environment").innerHTML = `Localhost`;
	}
	
if("ipfs:" == document.location.protocol)
	{
                console.log(envlogtxt +"IPFS.");
                //document.querySelector("#environment").innerHTML = `IPFS`;
	}
	
if(window.location.href.match(/ba(.*)\.ipfs\./)) {
       console.log(envlogtxt +"IPFS.");
}

if(window.location.href.indexOf("/ipfs/Qm") > -1) {
       console.log(envlogtxt +"IPFS.");
}

if(window.location.href.indexOf("/ipfs/ba") > -1) {
       console.log(envlogtxt +"IPFS.");
}

if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
        alert('Opera');
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        alert('Chrome');
        /* document.querySelector("#environment").innerHTML = `Chrome`; */
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        alert('Safari');
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
         //alert('Firefox');
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
      alert('IE'); 
    }  
    else 
    {
       alert('unknown');
    }

//function setInnerHTML(element, content) {
//    element.innerHTML = content;
//    return element;
//}
