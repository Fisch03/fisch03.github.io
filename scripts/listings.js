document.querySelectorAll(".listing").forEach((listing) => {
    let listingname = listing.id.split("-")[1]
    fetch(`${listingname}/list.json`)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((batch) => {
                let batchtitle = document.createElement("h2");
                batchtitle.innerHTML = batch.name;
                listing.appendChild(batchtitle);

                let batchlist = document.createElement("div")
                batchlist.classList.add("flexlist")
                listing.appendChild(batchlist)
                batch.images.forEach((item) => {
                    let itemdiv = document.createElement("div")
                    itemdiv.style = 'object-fit: cover;"'
                    itemdiv.innerHTML = `<img src="${item}" style="width:15rem"></img>`
                    itemdiv.onclick = () => {
                        imgToFullscreenImg(itemdiv.childNodes[0],item.split(".")[1]);
                    }
                    batchlist.appendChild(itemdiv)
                })
            })
        })
})