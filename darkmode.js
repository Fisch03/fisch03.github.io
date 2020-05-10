var darkmodeEnabled = false;

function changeToDarkmode(imageButton){
    if (!darkmodeEnabled){
        console.log("changed to darkmode");
        darkmodeEnabled = true;
        document.getElementById("GitHubLogo").src = "resources/GitHub-logo_dark.svg";
        document.getElementById("InstagramLogo").src = "resources/Instagram-logo_dark.svg";
        document.getElementById("SoundcloudLogo").src = "resources/Soundcloud-logo_dark.svg";
        document.getElementById("YoutubeLogo").src = "resources/Youtube-logo_dark.svg";
        document.getElementById("ArrowBackButton").src = "resources/arrowback_dark.svg";
        document.body.classList += "darkmode";
        
        imageButton.src = "resources/lightmode.svg";
    } else {
        console.log("changed to lightmode (ew)");
        darkmodeEnabled = false;
        document.getElementById("GitHubLogo").src = "resources/GitHub-logo.svg";
        document.getElementById("InstagramLogo").src = "resources/Instagram-logo.svg";
        document.getElementById("SoundcloudLogo").src = "resources/Soundcloud-logo.svg";
        document.getElementById("YoutubeLogo").src = "resources/Youtube-logo.svg";
        document.getElementById("ArrowBackButton").src = "resources/arrowback.svg";
        document.body.classList -= "darkmode";
        imageButton.src = "resources/darkmode.svg";
    }
}

//check if user has darkmode enabled in browser
function isDarkModeEnabledInBrowser() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

//actually changes to darkmode if user has darkmode enabled in browser
if (isDarkModeEnabledInBrowser()){
    changeToDarkmode(document.getElementById("DarkModeToggle"));
}
//export { darkmode };