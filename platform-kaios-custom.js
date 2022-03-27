document.querySelector("#placefirst").innerHTML += `<header><span>JS2ME</span></header>`;

document.querySelector("#body").innerHTML += `<footer class="softkey"><div id="softkey-left">Back</div><div id="softkey-center">RELOAD</div><div id="softkey-right">More</div></footer>`;

document.querySelector("#keypad").innerHTML = ``;

const softkeyCallback = {
    left: function() { window.close() },
    center: function() { document.location.reload(true) },
    right: function() { console.log('You click on SoftRight') }
};
