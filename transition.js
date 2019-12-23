let currentPage
let overrideHashChange

document.getElementById("nojs").remove()
checkHash()

window.onhashchange = function() {
  if(!overrideHashChange) {
    checkHash()
  }
  overrideHashChange = false
}

function checkHash() {
  if(!window.location.hash) {
    window.location.hash = document.getElementsByClassName("page").item(0).id
    Array.from(document.getElementsByClassName("page")).forEach(function(page) {page.classList.remove("currentpage")})
    currentPage = document.getElementById(window.location.hash.substring(1))
    currentPage.classList.add("currentpage")
  } else if (!document.getElementById(window.location.hash.substring(1))) {
    window.location.replace("./404.html")
  } else if(document.getElementsByClassName("currentpage").length == 0) {
    currentPage = document.getElementById(window.location.hash.substring(1))
    currentPage.classList.add("currentpage")
  }
  if(document.getElementById(window.location.hash.substring(1))) {
    if(window.location.hash.substring(1) == "Home" && document.getElementsByClassName("currentpage").item(0).id != "Home") {
      currentPage = document.getElementsByClassName("currentpage").item(0)
      transitionToBottom("Home")
    } else if(window.location.hash.substring(1) != "Home" && document.getElementsByClassName("currentpage").item(0).id == "Home") {
      currentPage = document.getElementsByClassName("currentpage").item(0)
      transitionToTop(window.location.hash.substring(1))
    }
  }
}

function transitionToTop(targetid) {
  let outPage = currentPage
  let inPage = document.getElementById(targetid)

  currentPage = inPage

  outPage.classList.add("totop")
  outPage.classList.add("ontop")

  inPage.classList.add("currentpage")
  inPage.classList.add("frombottomease")

  overrideHashChange = true

  setTimeout(function() {
    outPage.classList.remove("currentpage")
    outPage.classList.remove("totop")
    outPage.classList.remove("ontop")

    inPage.classList.remove("frombottomease")

    window.location.hash = targetid
  }, 900)
}

function transitionToBottom(targetid) {
  let outPage = currentPage
  let inPage = document.getElementById(targetid)

  currentPage = inPage

  outPage.classList.add("tobottom")
  outPage.classList.add("ontop")

  inPage.classList.add("currentpage")
  inPage.classList.add("fromtopease")

  overrideHashChange = true

  setTimeout(function() {
    outPage.classList.remove("currentpage")
    outPage.classList.remove("tobottom")
    outPage.classList.remove("ontop")

    inPage.classList.remove("fromtopease")

    window.location.hash = targetid
  }, 900)
}
