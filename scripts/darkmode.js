let darkMode = false

//Preload all images to make a toggle appear smoother
preloadImage("resources/lightmode.svg")
Array.from(document.getElementsByClassName("backbutton")).forEach(function(element) {preloadImage(element.src.replace(/(\.[\w\d_-]+)$/i, '_dark$1'))})
Array.from(document.getElementsByClassName("modetoggleable")).forEach(function(element) {preloadImage(element.src.replace(/(\.[\w\d_-]+)$/i, '_dark$1'))})

function toggleMode() {
  if(darkMode) {
    setCookie("darkMode", "false", 365)
    document.getElementById("DarkModeButton").src = "resources/darkmode.svg"
    document.getElementById("DescriptionBox").classList.remove("dark")
    Array.from(document.getElementsByClassName("page")).forEach(function(element) {element.classList.remove("dark")})
    Array.from(document.getElementsByClassName("backbutton")).forEach(function(element) {element.src = element.src.replace('_dark', '')})
    Array.from(document.getElementsByClassName("modetoggleable")).forEach(function(element) {element.src = element.src.replace('_dark', '')})
    darkMode = false
  } else {
    setCookie("darkMode", "true", 365)
    document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"
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

if (getCookie("darkMode") == "true") {
    toggleMode()
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}