window.onload = () => {
    const button = document.querySelector("#logButton")

    const searchHistory = []
    const selectHistory = []
    const cardClickHistory = []

    document.querySelector("#custom-input").addEventListener("input", e => {
        searchHistory.push(document.querySelector("#custom-input").value)
    })

    document.querySelector("#series-dropdown-ul").addEventListener("click", e => {
        selectHistory.push(e.target.textContent.trim())
    })



    const cards = [...document.getElementsByClassName("custom-card")]
    cards.forEach(card => {
        card.addEventListener("click", e => {
            cardClickHistory.push(e.currentTarget.textContent.trim())
        })
    })










    button.addEventListener("click", e => {
        console.log(searchHistory)
        console.log(selectHistory)
        console.log(cardClickHistory)
    })


}


