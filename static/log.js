window.onload = () => {
    const button = document.querySelector("#logButton")

    const searchHistory = []
    const selectHistory = []
    const cardClickHistory = []


    const metric = {
        loc: null,
        history: {
            search: [],
            select: [],
            card: []
        }
    }


    document.querySelector("#custom-input").addEventListener("input", e => {
        metric.history.search.push(document.querySelector("#custom-input").value)
    })

    document.querySelector("#series-dropdown-ul").addEventListener("click", e => {
        metric.history.select.push(e.target.textContent.trim())
    })


    const cards = [...document.getElementsByClassName("custom-card")]
    cards.forEach(card => {
        card.addEventListener("click", e => {
            metric.history.card.push(e.currentTarget.textContent.trim())
        })
    })


    button.addEventListener("click", e => {
        sessionStorage.setItem("0000", JSON.stringify(metric))
    })


}


