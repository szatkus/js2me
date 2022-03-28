document.querySelector("#head").innerHTML += `<link rel="stylesheet" type="text/css" href="css/root.css">`;
document.querySelector("#head").innerHTML += `<link rel="stylesheet" type="text/css" href="css/header.css">`;
document.querySelector("#head").innerHTML += `<link rel="stylesheet" type="text/css" href="css/softkey.css">`;

function handleKeyDown(evt) {
    switch (evt.key) {
        case 'SoftLeft':
            // Action case press left key
            softkeyCallback.left();
        break;

        case 'SoftRight':
            // Action case press right key
            softkeyCallback.right();
        break;

        case 'Enter':
            // Action case press center key
            softkeyCallback.center();
        break;
    }
};

document.addEventListener('keydown', handleKeyDown);
