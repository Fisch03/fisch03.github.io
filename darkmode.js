var darkmode = false;

function changeToDarkmode(imageButton){
    if (!darkmode){
        console.log("changed to darkmode");
        darkmode = true;
        imageButton.src = "resources/lightmode.svg";
    } else {
        console.log("changed to lightmode (ew)");
        darkmode = false;
        imageButton.src = "resources/darkmode.svg";
    }
}

//export { darkmode };