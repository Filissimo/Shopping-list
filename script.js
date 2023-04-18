document.addEventListener("DOMContentLoaded", () => {

    let submit_btn = document.getElementById("submit")
    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let amount = document.getElementById("amount")
    let savedData = document.querySelector("#savedData ul")

    let debug_console = document.getElementById("debug_console")

    setInterval(() => {
        priceValue = price.value.toString()
        dotIndex = priceValue.indexOf(".")
        if (priceValue.length - dotIndex == 2) {
            price.value = priceValue + '0'
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
        showItemList()
    }
    function showItemList() {
        totalItemAmount = localStorage.getItem('totalItemAmount')
        savedData.innerHTML = ''
        for (let i = 0; i < totalItemAmount; i++) {
            savedData.innerHTML += `
                <li>
                    <p>
                        ${localStorage.getItem(`title${i}`)}, 
                        цена: ${localStorage.getItem(`price${i}`)}, 
                        количество: ${localStorage.getItem(`amount${i}`)}<br>
                    </p>
                    <button>Редактировать</button>
                    <button>Удалить</button>
                </li>
            `
        }
    }
})