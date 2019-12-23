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
  let hash = window.location.hash.substring(1)
  let pageByHash = document.getElementById(hash)
  let allPages = document.getElementsByClassName("page")
  let allCurrentPages = document.getElementsByClassName("currentpage")

  if(!window.location.hash) { //Check if a Hash is entered, if not, take the first "page" as hash location and make it the current Page
    window.location.hash = allPages.item(0).id
    Array.from(allPages).forEach(function(page) {page.classList.remove("currentpage")})
    currentPage = pageByHash
    currentPage.classList.add("currentpage")
  } else if (!pageByHash) {
    window.location.replace("./404.html")
  } else if(allCurrentPages.length == 0) {
    currentPage = pageByHash
    currentPage.classList.add("currentpage")
  }
  if(pageByHash) {
    if(hash == "Home" && allCurrentPages.item(0).id != "Home") {
      currentPage = allCurrentPages.item(0)
      transitionToBottom("Home")
    } else if(hash != "Home" && allCurrentPages.item(0).id == "Home") {
      currentPage = currentpage.item(0)
      transitionToTop(hash)
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
