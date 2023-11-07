let collection = document.querySelectorAll('.collection-item')
let collectionFooter = document.querySelectorAll('.footer-collection')
let basket = []

collection.forEach(function (elem) {
	elem.addEventListener('click', activeCollection)
})

// Активация кнопки выбора коллекции и заполнение карточек коллекции из меню footer
collectionFooter.forEach(function (elem) {
	elem.addEventListener('click', function () {
		let attr = this.getAttribute('data-attr')
		collection.forEach(function (el) {
			el.classList.remove('collection-active')
			let collectionAttr = el.getAttribute('data-attr')
			if (attr === collectionAttr) {
				el.classList.add('collection-active')

				if (collectionAttr == 'fr') {
					creationCard(fr)
				}
				if (collectionAttr == 'de') {
					creationCard(de)
				}
				if (collectionAttr == 'gb') {
					creationCard(gb)
				}
			}
		})
	})
})
// Первоначальное формирование списка репродукций в зависимости от активной кнопки коллекции при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
	collection.forEach(function (elem) {
		if (elem.classList.contains('collection-active')) {
			let collectionAttrib = elem.getAttribute('data-attr')

			if (collectionAttrib == 'fr') {
				creationCard(fr)
			}
			if (collectionAttrib == 'de') {
				creationCard(de)
			}
			if (collectionAttrib == 'gb') {
				creationCard(gb)
			}
		}
	})
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
	if (collectionAttrib == 'de') {
		creationCard(de)
	}
	if (collectionAttrib == 'gb') {
		creationCard(gb)
	}
}

function creationCard(data) {
	document.querySelector('.reproduction-collection').innerHTML = ''

	data.forEach(function (item) {
		let cardItem = document.createElement('div')
		cardItem.classList.add('reproduction-collection-item')

		cardItem.innerHTML = `
        <img class="item-img" src="${item[0]}" alt="">
        <h3 class="item-author">${item[1]}</h3>
        <h2 class="item-title">${item[2]}</h2>
        <p class="item-description">${item[3]}</p>
        <p class="item-price">${item[4]} руб</p>
        <div class="item-add-btn" data-attr="${item[5]}">В корзину</div>
    `

		document.querySelector('.reproduction-collection').append(cardItem)
	})

	let addBtn = document.querySelectorAll('.item-add-btn')
	addBtn.forEach(function (elem) {
		elem.addEventListener('click', function () {
			let productId = elem.getAttribute('data-attr')
			data.forEach(function (el) {
				if (productId === el[5]) {
					basket.push(el)
					document
						.querySelector('.full-basket')
						.classList.add('full-basket-add')
					addBasket(basket)
				}
			})
		})
	})
}

function addBasket(basket) {
	console.log(basket)
}
