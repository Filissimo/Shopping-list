document.addEventListener("DOMContentLoaded", () => {

    let submit_btn = document.getElementById("submit")
    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let amount = document.getElementById("amount")
    let savedData = document.querySelector("#savedData ul")
    let totalItemAmount = +localStorage.getItem('totalItemAmount')

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
        totalItemAmount = +localStorage.getItem('totalItemAmount')
        if (!totalItemAmount || totalItemAmount == 0) {
            localStorage.setItem('totalItemAmount', 0)
            totalItemAmount = 0
        }
        localStorage.setItem(`title${totalItemAmount}`, itemData.title)
        localStorage.setItem(`price${totalItemAmount}`, itemData.price)
        localStorage.setItem(`amount${totalItemAmount}`, itemData.amount)

        localStorage.setItem('totalItemAmount', totalItemAmount + 1)
        window.location.reload()
    }
    function showItemList() {
        totalItemAmount = localStorage.getItem('totalItemAmount')
        savedData.innerHTML = ''
        for (let i = 0; i < totalItemAmount; i++) {
            savedData.innerHTML += `
                <li id="item${i}">
                    <p>
                        ${localStorage.getItem(`title${i}`)}<br>
                        цена: ${localStorage.getItem(`price${i}`)}<br>
                        количество: ${localStorage.getItem(`amount${i}`)}<br>
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
            thisTitle = localStorage.getItem(`title${i}`)
            thisPrice = localStorage.getItem(`price${i}`)
            thisAmount = localStorage.getItem(`amount${i}`)
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
                localStorage.setItem(`title${i}`, newTitle)
                localStorage.setItem(`price${i}`, newPrice)
                localStorage.setItem(`amount${i}`, newAmount)
                window.location.reload()
            }
        }
        deleteButton = document.getElementById(`delete${i}`)
        deleteButton.onclick = () => {
            for (let j = i; j < totalItemAmount - 1; j++) {
                nextTitle = localStorage.getItem(`title${j + 1}`)
                nextPrice = localStorage.getItem(`price${j + 1}`)
                nextAmount = localStorage.getItem(`amount${j + 1}`)
                localStorage.setItem(`title${j}`, nextTitle)
                localStorage.setItem(`price${j}`, nextPrice)
                localStorage.setItem(`amount${j}`, nextAmount)
            }
            localStorage.removeItem(`title${totalItemAmount - 1}`)
            localStorage.removeItem(`price${totalItemAmount - 1}`)
            localStorage.removeItem(`amount${totalItemAmount - 1}`)
            localStorage.setItem(`totalItemAmount`, totalItemAmount - 1)
            window.location.reload()
        }
    }
})