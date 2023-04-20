document.addEventListener("DOMContentLoaded", () => {

    let submit_btn = document.getElementById("submit")
    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let amount = document.getElementById("amount")
    let savedData = document.querySelector("#savedData ul")
    let shopingList = JSON.parse(localStorage.getItem('shopingList'))
    if (!shopingList) {
        shopingList = {'totalItemAmount': 0, 'items': {}}
        localStorage.setItem('shopingList', JSON.stringify(shopingList))
    }
    let totalItemAmount = shopingList.totalItemAmount


    let debug_console = document.getElementById("debug_console")

    setInterval(() => {
        priceValue = price.value.toString()
        dotIndex = priceValue.indexOf(".")
        if (dotIndex == -1) {
            if (priceValue.length > 0) {
                price.value = priceValue + '.00'
            }
        } else {
            if (priceValue.length - dotIndex == 2) {
                price.value = priceValue + '0'
            }
        }
    }, 20)

    showItemList()

    submit_btn.onclick = () => {
        debug_console.innerHTML = "Недостаточно данных"
        if (title.value.length > 3 && price.value.length > 0 && amount.value.length > 0) {
            itemData = {
                'title': title.value,
                'price': price.value,
                'amount': amount.value
            }
            debug_console.innerHTML = `Название: ${title.value}, цена: ${price.value}, количество: ${amount.value}`
        }
        addItemToLocalStorage(itemData)
    }

    function addItemToLocalStorage(itemData) {
        shopingList.items[`item${totalItemAmount}`] = itemData
        totalItemAmount++
        shopingList.totalItemAmount = totalItemAmount
        localStorage.setItem('shopingList', JSON.stringify(shopingList))
        window.location.reload()
    }
    function showItemList() {
        savedData.innerHTML = ''
        for (let i = 0; i < totalItemAmount; i++) {
            savedData.innerHTML += `
                <li id="item${i}">
                    <p>
                        ${shopingList.items[`item${i}`].title}<br>
                        цена: ${shopingList.items[`item${i}`].price}<br>
                        количество: ${shopingList.items[`item${i}`].amount}<br>
                    </p>
                    <button id="edit${i}">Редактировать</button>
                    <button id="delete${i}">Удалить</button>
                </li>
            `
        }
    }

    for (let i = 0; i < totalItemAmount; i++) {
        editButton = document.getElementById(`edit${i}`)
        editButton.onclick = () => {
            thisTitle = shopingList.items[`item${i}`].title
            thisPrice = shopingList.items[`item${i}`].price
            thisAmount = shopingList.items[`item${i}`].amount
            editForm = document.getElementById("editItem")
            document.getElementById(`item${i}`).innerHTML = `
                <form id="editItem" action="">
                    <h2>Ведите данные продукта:</h2>
                    <ul>
                        <li><input type="text" id="title_e" placeholder="Название" value="${thisTitle}"></li>
                        <li>
                            <input type="number" step="0.01" id="price_e" placeholder="Цена" min="0" value="${thisPrice}">
            
                            <div class="radioAndLabel">
                                <input type="radio" id="euro_e" name="currency">
                                <label for="euro">евро</label>
                            </div>
                            <div class="radioAndLabel">
                                <input type="radio" id="dollar_e" name="currency">
                                <label for="dollar">доллары</label>
                            </div>
                            <div class="radioAndLabel">
                                <input type="radio" id="rubl_e" name="currency">
                                <label for="rubl">рубли</label>
                            </div>
                        </li>
                        <li><input type="number" id="amount_e" placeholder="Количество" min="0" value="${thisAmount}"></li>
                        <input type="button" id="submit_edit" value="Сохранить изменения">
                    </ul>
                </form>
            `
            let submitEditButton = document.getElementById("submit_edit")
            price_e = document.getElementById("price_e")
            setInterval(() => {
                priceValue = price_e.value.toString()
                dotIndex = priceValue.indexOf(".")
                if (dotIndex == -1) {
                    if (priceValue.length > 0) {
                        price_e.value = priceValue + '.00'
                    }
                } else {
                    if (priceValue.length - dotIndex == 2) {
                        price_e.value = priceValue + '0'
                    }
                }
            }, 20)
            submitEditButton.onclick = () => {
                let newTitle = document.getElementById("title_e").value
                let newPrice = document.getElementById("price_e").value
                let newAmount = document.getElementById("amount_e").value
                shopingList.items[`item${i}`].title = newTitle
                shopingList.items[`item${i}`].price = newPrice
                shopingList.items[`item${i}`].amount = newAmount
                localStorage.setItem('shopingList', JSON.stringify(shopingList))
                window.location.reload()
            }
        }
        deleteButton = document.getElementById(`delete${i}`)
        deleteButton.onclick = () => {
            for (let j = i; j < totalItemAmount - 1; j++) {
                let nextItem = shopingList.items[`item${j + 1}`]
                console.log(nextItem)
                if (nextItem) {
                    shopingList.items[`item${j}`] = nextItem
                }
            }
            delete shopingList.items[`item${totalItemAmount - 1}`]
            shopingList.totalItemAmount = totalItemAmount - 1
            localStorage.setItem('shopingList', JSON.stringify(shopingList))
            window.location.reload()
        }
    }
})