const descriptionBox = document.getElementById("DescriptionBox")
let descriptionVisible = false

window.addEventListener('click', function(e){
  if (!descriptionBox.contains(e.target) && descriptionVisible) {
    hideDescription()
  }
});

function showDescription() {
  currentPage.classList.add("backgroundelements")
  document.body.classList.add("hidescroll")
  descriptionBox.style.visibility = "visible"
  descriptionBox.classList.remove("hideintop")
  descriptionBox.classList.add("movetocenter")
  setTimeout(function() {descriptionVisible = true}, 1000)
}

function hideDescription() {
  currentPage.classList.remove("backgroundelements")
  document.body.classList.remove("hidescroll")
  descriptionBox.classList.add("hideintop")
  descriptionBox.classList.remove("movetocenter")
  descriptionVisible = false
  setTimeout(function() {descriptionBox.style.visibility = "visible"}, 1000)
}

function imgToDescription(element) {
  readDescriptionFile(element.src.replace(/(\.[\w\d_-]+)$/i, '.html'))
  descriptionBox.innerHTML = "<h2>Loading...<h2>"
  showDescription()
}

function imgToFullscreenImg(element) {
  descriptionBox.innerHTML = `<img src=${element.src.replace(/(\.[\w\d_-]+)$/i, '_full$1')}></img>`
  overrideDescStyle()
  addControls(element.src.replace(/(\.[\w\d_-]+)$/i, '_full$1'))
  showDescription()
}

function imgToFullscreenVideo(element) {
  descriptionBox.innerHTML = `<video src=${element.src.replace(/(\.[\w\d_-]+)$/i, '.mp4')} autoplay loop></video>`
  overrideDescStyle()
  addControls(element.src.replace(/(\.[\w\d_-]+)$/i, '.mp4'))
  showDescription()
}

function overrideDescStyle() {
  descriptionBox.innerHTML += `
  <style>
    img, video {
      height: 100%;
    }
    #DescriptionBox {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 10vw;

      padding: 0;
      width: auto;
    }
  </style>
  `
}

function addControls(expandLocation) {
  descriptionBox.innerHTML += `<img src=resources/expand${darkMode ? "_dark":""}.svg class="controls" onclick="window.location='${expandLocation}'"></img>`
}

function readDescriptionFile(filename, callback) {
  var rawFile = new XMLHttpRequest()
  rawFile.open("GET", filename, true)
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status == 0) {
        descriptionBox.innerHTML = rawFile.responseText
        addControls(filename)
        Array.from(document.getElementsByClassName("descriptionHead")).forEach(function(element) {element.remove()})
      }
    }
  }
  rawFile.send(null)
}
