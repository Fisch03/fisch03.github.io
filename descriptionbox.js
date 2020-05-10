const descriptionBox = document.getElementById("DescriptionBox")
const descriptionPath = "./resources/descriptions"
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
  readDescriptionFile(`${element.id.replace("Img","")}.html`)
  descriptionBox.innerHTML = "<h2>Loading...<h2>"

  showDescription()
}

function imgToFullscreenImg(element) {
  descriptionBox.innerHTML = `
  <style>
    img {
      height: 100%;
    }
    #DescriptionBox {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0;
      width: auto;
    }
  </style>
  <img src=${element.src.replace(/(\.[\w\d_-]+)$/i, '_full$1')}></img>
  `
  showDescription()
}

function imgToFullscreenVideo(element) {
  descriptionBox.innerHTML = `
  <style>
    video {
      height: 100%;
    }
    #DescriptionBox {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0;
      width: auto;
    }
  </style>
  <video src=${element.src.replace(/(\.[\w\d_-]+)$/i, '.mp4')} autoplay></video>
  `
  showDescription()
}

function readDescriptionFile(filename, callback) {
  var rawFile = new XMLHttpRequest()
  rawFile.open("GET", `${descriptionPath}/${filename}`, true)
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status == 0) {
        descriptionBox.innerHTML = rawFile.responseText
        Array.from(document.getElementsByClassName("descriptionHead")).forEach(function(element) {element.remove()})
      }
    }
  }
  rawFile.send(null)
}
