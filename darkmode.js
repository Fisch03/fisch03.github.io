let darkMode = false

function toggleMode() {
  if(darkMode) {
    document.getElementById("DarkModeButton").src = "resources/darkmode.svg"
    document.getElementById("DescriptionBox").classList.remove("dark")
    Array.from(document.getElementsByClassName("page")).forEach(function(element) {element.classList.remove("dark")})
    Array.from(document.getElementsByClassName("backbutton")).forEach(function(element) {element.src = element.src.replace('_dark', '')})
    Array.from(document.getElementsByClassName("modetoggleable")).forEach(function(element) {element.src = element.src.replace('_dark', '')})
    darkMode = false
  } else {
    document.getElementById("DarkModeButton").src = "resources/lightmode.svg"
    document.getElementById("DescriptionBox").classList.add("dark")
    Array.from(document.getElementsByClassName("page")).forEach(function(element) {element.classList.add("dark")})
    Array.from(document.getElementsByClassName("backbutton")).forEach(function(element) {element.src = element.src.replace(/(\.[\w\d_-]+)$/i, '_dark$1')})
    Array.from(document.getElementsByClassName("modetoggleable")).forEach(function(element) {element.src = element.src.replace(/(\.[\w\d_-]+)$/i, '_dark$1')})
    darkMode = true
  }
}

//Thanks to Samyocord
//check if user has darkmode enabled in browser
function isDarkModeEnabledInBrowser() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

//actually changes to darkmode if user has darkmode enabled in browser
if (isDarkModeEnabledInBrowser()){
    toggleMode()
}
