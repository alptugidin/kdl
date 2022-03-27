window.onload = () => {
    const button = document.querySelector("#testButton")

    const searchHistory = []
    const selectHistory = []

    document.querySelector("#custom-input").addEventListener("input", e => {
        searchHistory.push(document.querySelector("#custom-input").value)
    })

    document.querySelector("#series-dropdown-ul").addEventListener("click", e => {
        selectHistory.push(e.target.textContent.trim())
    })

    const cards = [document.getElementsByClassName("custom-card")]
    console.log(cards[0])

    // cards.forEach(card => {
    //     card.addEventListener("click", e => {
    //         console.log(e)
    //     })
    // })

    button.addEventListener("click", e => {
        console.log(searchHistory)
        console.log(selectHistory)
    })


}


