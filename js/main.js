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

	for (i=0; i <localStorage.length; i++) {
	if (localStorage.key(i).slice(0,8) === 'product_') {
		document.querySelector('.full-basket').classList.add('full-basket-add')
	}
}
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
	console.log(data);
	document.querySelector('.reproduction-collection').innerHTML = ''

	data.forEach(function (item) {
		let cardItem = document.createElement('div')
		cardItem.classList.add('reproduction-collection-item')

		if (localStorage.getItem('product_'+item[5]) == null) {
			cardItem.innerHTML = `
		<div class="item-img-mask">
			<img class="item-img" src="${item[0]}" alt="">
		</div>
        <h3 class="item-author">${item[1]}</h3>
        <h2 class="item-title">${item[2]}</h2>
        <p class="item-description">${item[3]}</p>
        <p class="item-price">${item[4]} руб</p>
		<div class="btn-block">
		<div class="item-add-btn" data-attr="${item[5]}">Добавить</div>
		<div class="item-add-btn__remove  item-add-btn__remove-disable" data-attr="${item[5]}">Удалить</div>
		</div>
    `
		} else
		{cardItem.innerHTML = `
		<div class="item-img-mask">
			<img class="item-img" src="${item[0]}" alt="">
		</div>
        <h3 class="item-author">${item[1]}</h3>
        <h2 class="item-title">${item[2]}</h2>
        <p class="item-description">${item[3]}</p>
        <p class="item-price">${item[4]} руб</p>
		<div class="btn-block">
		<div class="item-add-btn  item-add-btn__selected" data-attr="${item[5]}">Добавлено</div>
		<div class="item-add-btn__remove item-add-btn__remove-active" data-attr="${item[5]}">Удалить</div>
		</div>
    `}

		document.querySelector('.reproduction-collection').append(cardItem)
	})

	let addBtn = document.querySelectorAll('.item-add-btn')
	addBtn.forEach(function (elem) {
		elem.addEventListener('click', function () {
			if (!elem.classList.contains('item-add-btn__selected')) {
				elem.innerHTML = 'Добавлено'
			elem.classList.add('item-add-btn__selected')

			elem.nextElementSibling.classList.add('item-add-btn__remove-active')

			localStorage.setItem('product_'+elem.getAttribute('data-attr'), elem.getAttribute('data-attr'))
			localStorage.setItem('productQuantity_'+elem.getAttribute('data-attr'), 1)

			if (!document.querySelector('.full-basket').classList.contains('full-basket-add')) {
				document.querySelector('.full-basket').classList.add('full-basket-add')
			}
			}
		})
	})

	let removeBtn = document.querySelectorAll('.item-add-btn__remove')

	removeBtn.forEach((removeBtn)=>{
		removeBtn.addEventListener('click', ()=> {
			removeBtn.classList.remove('item-add-btn__remove-active')
			removeBtn.previousElementSibling.classList.remove('item-add-btn__selected')
			removeBtn.previousElementSibling.textContent = 'Добавить'
			localStorage.removeItem('product_'+removeBtn.getAttribute('data-attr'))
			localStorage.removeItem('productQuantity_'+removeBtn.getAttribute('data-attr'))

			if (!removeBtn.classList.contains('item-add-btn__remove-disable')) {
				removeBtn.classList.add('item-add-btn__remove-disable')
			}
		})
	})
}