// ! Открытие окна с корзиной
document.querySelector('.basket').addEventListener('click', function (basket) {
	console.log(basket)
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
})

//  ! Заполнение корзины
count = 0
function addBasket() {
	document.querySelector('.basketpopup-table').innerHTML = ''
	rowHeader = document.createElement('tr')

	rowHeader.innerHTML = `
    <th>#</th>
	<th>Рис.</th>
	<th>Автор</th>
	<th>Название</th>
	<th>Описание</th>
	<th>Количество</th>
	<th>Цена</th>
	<th>Сумма</th>
    `
	document.querySelector('.basketpopup-table').append(rowHeader)

	basket.forEach(item => {
		row = document.createElement('tr')

		row.innerHTML = `
        <td>${(count = count + 1)}</td>
        <td><img src="${item[0]}" alt="${item[2]}"></td> 
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td></td>
        <td>${item[4]}</td>
    `
		document.querySelector('.basketpopup-table').append(row)
	})
}
