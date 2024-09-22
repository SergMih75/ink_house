// ! Открытие окна с корзиной
document.querySelector('.basket').addEventListener('click', function () {
	document.querySelector('.basketpopup').classList.add('basketpopup-active')
	document.body.style.overflow = 'hidden'

	setTimeout(() => {
		document.querySelector('.basketpopup-field').style.opacity = 1
	}, 250)

	setTimeout(() => {
		document.querySelector('.basketpopup-close').style.opacity = 1
	}, 1000)
	addBasket()
})

// ! Закрытие окна корзины
document.querySelector('.basketpopup-close').addEventListener('click', () => {
	document.querySelector('.basketpopup').classList.remove('basketpopup-active')
	document.body.style.overflow = 'auto'
	document.querySelector('.basketpopup-field').style.opacity = 0
	document.querySelector('.basketpopup-close').style.opacity = 0
	document.querySelector('.basketpopup-table').innerHTML = ''
	basket = []
})

//  ! Заполнение корзины
count = 0
function addBasket() {

	for (i=0; i <localStorage.length; i++) {
	if (localStorage.key(i).slice(0,8) === 'product_') {
		let orderName  = localStorage.key(i).slice(8)

		fr.forEach(item=>{
			if (orderName === item[5]) {
				basket.push(item)
			}
		})

		de.forEach(item=>{
			if (orderName === item[5]) {
				basket.push(item)
			}
		})

		gb.forEach(item=>{
			if (orderName === item[5]) {
				basket.push(item)
			}
		})
	}
}



	document.querySelector('.basketpopup-table').innerHTML = ''
	rowHeader = document.createElement('tr')

	rowHeader.innerHTML = `

	<th>Рис.</th>
	<th>Автор</th>
	<th>Название</th>
	<th>Описание</th>
	<th>Кол-во</th>
	<th>Цена</th>
	<th>Сумма</th>
    `
	document.querySelector('.basketpopup-table').append(rowHeader)

	basket.forEach(item => {
		row = document.createElement('tr')

		row.innerHTML = `
        <td><img class="basket-img" src="${item[0]}" alt="${item[2]}"></td> 
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>
			<div class="quantity">
				<div class="quantity-btn" data-attr="dec">+</div>
				<span class="quantity-counter">1</span>
				<div class="quantity-btn" data-attr="inc">-</div>
			</div>
		</td>
        <td>${item[4]}</td>
		<td>${item[4]}</td>
    `

		document.querySelector('.basketpopup-table').append(row)
	})
	let quantityBtn = document.querySelectorAll('.quantity-btn')

quantityBtn.forEach((quantityBtn)=>{
	quantityBtn.addEventListener('click',()=>{
		let counter = 0
		let sum
		if (quantityBtn.nextElementSibling !== null) {
			counter = +quantityBtn.nextElementSibling.textContent + 1
			quantityBtn.nextElementSibling.innerHTML=counter

			sum = counter * (+quantityBtn.parentElement.parentElement.nextElementSibling.textContent)
			quantityBtn.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent = sum

		}
		else{
			if (+quantityBtn.previousElementSibling.textContent >0) {
				counter = +quantityBtn.previousElementSibling.textContent - 1
				quantityBtn.previousElementSibling.innerHTML=counter

				sum = counter * (+quantityBtn.parentElement.parentElement.nextElementSibling.textContent)
				quantityBtn.parentElement.parentElement.nextElementSibling.nextElementSibling.textContent = sum
			}
		}
	})
})
}
