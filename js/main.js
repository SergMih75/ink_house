let collection = document.querySelectorAll('.collection-item')
collection.forEach(function (elem) {
	elem.addEventListener('click', activeCollection)
})

function activeCollection() {
	collection.forEach(function (elem) {
		elem.classList.remove('collection-active')
	})
	this.classList.add('collection-active')
	let collectionAttrib = this.getAttribute('data-attr')

    if (collectionAttrib == 'fr') {
        creationCard(fr)
    }
    if (collectionAttrib == 'ddr') {
        creationCard(ddr)
    }
    if (collectionAttrib == 'gb') {
        creationCard(gb)
    }
}

function creationCard(data){
    document.querySelector('.reproduction-collection').innerHTML=""

    data.forEach(function(item){
    let cardItem = document.createElement('div')
    cardItem.classList.add('reproduction-collection-item')

    cardItem.innerHTML = `
        <img class="item-img" src="${item[0]}" alt="">
        <h3 class="item-author">${item[1]}</h3>
        <h2 class="item-title">${item[2]}</h2>
        <p class="item-description">${item[3]}</p>
        <p class="item-price">${item[4]} руб</p>
        <div class="item-add-btn">В корзину</div>
    `

    document.querySelector('.reproduction-collection').append(cardItem)
    })
}
