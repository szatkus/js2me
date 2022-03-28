document.querySelector("#placefirst").innerHTML += `<header><span>JS2ME</span></header>`;
//document.querySelector("#body").innerHTML += `<style>#landinglogo{margin-top:13px}</style>`;

document.querySelector("#body").innerHTML += `<footer class="softkey"><div id="softkey-left">Back</div><div id="softkey-center">RELOAD</div><div id="softkey-right">More</div></footer>`;

//document.querySelector("#body").innerHTML += `<style>h1{font-size:25px}span{font-size:12px}h2{font-size:20px}</style>`;
//document.querySelector("#landinglogo").innerHTML = `<img width="50px" src="logo.svg"/>`;
//document.querySelector("#landingtitle").innerHTML = ``;

const softkeyCallback = {
    left: function() { window.close() },
    center: function() { document.location.reload(true) },
    right: function() { console.log('You click on SoftRight') }
};
