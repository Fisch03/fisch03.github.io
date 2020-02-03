//Position in this file are treated eas percentages of the whole image (top left = (0|0), bottom right = (100|100))
//This avoids troubles when scaling the image up and down

//Detect if the user is able to hover
let usercanhover = !('ontouchstart' in window || navigator.maxTouchPoints)

let selectedElement

const topicText = document.getElementById("TopicName")

const reactiveElements = [
  {
    i: 1,
    a: {x:26, y:37},
    b: {x:46, y:67},
    r: 41,
    el: document.getElementById("LogoCode"),
    target: "Coding",
    topic: "Coding"
  }, {
    i: 2,
    a: {x:37, y:30},
    b: {x:57, y:60},
    r: 41,
    el: document.getElementById("Logo3D"),
    target: "3D",
    topic: "3D Design/Art"
  }, {
    i: 3,
    a: {x:47, y:28},
    b: {x:85, y:67},
    r: 41,
    el: document.getElementById("LogoMusic"),
    target: "Music",
    topic: "Music"
  }, {
    i: 3,
    a: {x:70, y:41},
    b: {x:85, y:67},
    r: 41,
    el: document.getElementById("LogoMusic"),
    target: "Music",
    topic: "Music"
 }
]

let insideElement = []

let currentTopic, currentTopicIndex
let fadeintimer

const container = document.getElementById("Logocontainer")

let imgsize = {w: container.clientWidth, h: container.clientHeight}
window.addEventListener('resize', function(e) {
  imgsize = {w: container.clientWidth, h: container.clientHeight}
})

if(!('ontouchstart' in window||navigator.maxTouchPoints)){
  document.getElementById("HintText").innerHTML = "(Click my Logo to find out more!)"
} else {
  document.getElementById("HintText").innerHTML = "(Tap/Double Tap my Logo to find out more!)"
}

window.onmousemove = function(e) {
  let mousepos = {x: e.offsetX / imgsize.w * 100, y: e.offsetY / imgsize.h * 100}
  checkHover(mousepos)
}

container.onclick = function(e) {
  if(usercanhover) {
    let mousepos = {x: e.offsetX / imgsize.w * 100, y: e.offsetY / imgsize.h * 100}
    let anyclicked = false

    reactiveElements.forEach(function(rect) {
      if(isInsideRectangle(mousepos, rect) && !anyclicked) {
        transitionToTop(rect.target)
        anyclicked = true
      }
    })
  } else {
    let mousepos = {x: e.offsetX / imgsize.w * 100, y: e.offsetY / imgsize.h * 100}
    let anyclicked = false

    reactiveElements.forEach(function(rect, index) {
      if(isInsideRectangle(mousepos, rect)) {
        if(selectedElement == rect.i && !anyclicked) {
          transitionToTop(rect.target)
          selectedElement = null
          resetHover()
        } else if(selectedElement != rect.i && !anyclicked){
          selectedElement = rect.i
          checkHover(mousepos)
        }
        anyclicked = true
      }
    })

    if(!anyclicked) {
      selectedElement = null
    }
  }
}

function checkHover(mousepos) {
  let anyhovered = false
  reactiveElements.forEach(function(rect, index) {
      if(isInsideRectangle(mousepos, rect)) {
        rect.el.classList.add("hovered")
        if(!insideElement[index] && currentTopicIndex != rect.i) {
          blendTopic(rect.topic)
        }
        insideElement[index] = true
        currentTopicIndex = rect.i
        anyhovered = true
      } else {
        rect.el.classList.remove("hovered")
        insideElement[index] = false
      }
  })

  if(!anyhovered && currentTopicIndex != 0) {
    blendTopic("")
    currentTopicIndex = 0
  }
}

function resetHover() {
  reactiveElements.forEach(function(rect) {
    rect.el.classList.remove("hovered")
    blendTopic("")
    currentTopicIndex = 0
  })
}

function blendTopic(newTopic) {
  if(topicText.classList.contains("fadeOut")) {
    currentTopic = newTopic
  } else if(topicText.classList.contains("fadeIn")) {
    topicText.innerHTML = newTopic
  } else {
    currentTopic = newTopic
    changeTopic = true
    topicText.classList.add("fadeOut")
    fadeouttimer = setTimeout(function() {
      topicText.innerHTML = currentTopic
      topicText.classList.add("fadeIn")
      topicText.classList.remove("fadeOut")
    }, 500)
    fadeintimer = setTimeout(function() {
      topicText.classList.remove("fadeIn")
    }, 1000)
  }
}

function rotatePoint(point, pivot, rot) {
  rot = rot * (Math.PI/180) //Convert Degrees to radians
  return {
    x: Math.cos(rot) * (point.x-pivot.x) - Math.sin(rot) * (point.y-pivot.y) + pivot.x,
    y: Math.sin(rot) * (point.x-pivot.x) + Math.cos(rot) * (point.y-pivot.y) + pivot.y
  }
}

function isInsideRectangle(point, rect) {
  let center = {x: Math.abs(rect.a.x - rect.b.x), y: Math.abs(rect.a.y - rect.b.y)}
  let a = rotatePoint(rect.a, center, -rect.r)
  let b = rotatePoint(rect.b, center, -rect.r)
  let p = rotatePoint(point, center, -rect.r)


  if(p.x > a.x && p.x < b.x && p.y > a.y && p.y < b.y) {
    return true
  } else {
    return false
  }
}
