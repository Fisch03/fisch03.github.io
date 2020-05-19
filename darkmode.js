//TODO: Preload Dark mode Images to avoid images "lagging behind" on first toggle

let darkMode = false

//Preload all images to make a toggle appear smoother
preloadImage("resources/lightmode.svg")
Array.from(document.getElementsByClassName("backbutton")).forEach(function(element) {preloadImage(element.src.replace(/(\.[\w\d_-]+)$/i, '_dark$1'))})
Array.from(document.getElementsByClassName("modetoggleable")).forEach(function(element) {preloadImage(element.src.replace(/(\.[\w\d_-]+)$/i, '_dark$1'))})

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

function preloadImage(path) {
  var img = new Image()
  img.src = path
}

//Thanks to Samyocord
//Change to Darkmode if the Browser requests it
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleMode()
}
