const descriptionBox = document.getElementById("DescriptionBox")
const descriptionPath = "./resources/descriptions"
let descriptionVisible = false

window.addEventListener('click', function(e){
  if (!descriptionBox.contains(e.target) && descriptionVisible) {
    hideDescription()
  }
});

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
  currentPage.classList.add("backgroundelements")
  document.body.classList.add("hidescroll")
  descriptionBox.style.visibility = "visible"
  descriptionBox.classList.remove("hideintop")
  descriptionBox.classList.add("movetocenter")
  setTimeout(function() {descriptionVisible = true}, 1000)
}

function readDescriptionFile(filename, callback) {
  var rawFile = new XMLHttpRequest()
  rawFile.open("GET", `${descriptionPath}/${filename}`, true)
  rawFile.onreadystatechange = function () {
    if(rawFile.readyState === 4) {
      if(rawFile.status === 200 || rawFile.status == 0) {
        descriptionBox.innerHTML = rawFile.responseText
      }
    }
  }
  rawFile.send(null)
}
