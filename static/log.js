const metric = {
    time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    loc: null,
    ip: null,
    history: {
        search: [],
        select: [],
        card: []
    }
}



// window.onload = () => {
//
//     document.querySelector("#custom-input").addEventListener("input", e => {
//         metric.history.search.push(document.querySelector("#custom-input").value)
//     })
//
//     document.querySelector("#series-dropdown-ul").addEventListener("click", e => {
//         metric.history.select.push(e.target.textContent.trim())
//     })
//
//
//     const cards = [...document.getElementsByClassName("custom-card")]
//     cards.forEach(card => {
//         card.addEventListener("click", e => {
//             metric.history.card.push(e.currentTarget.textContent.trim())
//         })
//     })
//
//
//     console.log(navigator.language)
//
//     // fetch('https://www.cloudflare.com/cdn-cgi/trace')
//     //     .then(res => res.text()).then(t => {
//     //     let data = t.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
//     //     data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
//     //     const jsondata = JSON.parse(data);
//     //     metric.loc = jsondata.loc
//     //     metric.ip = jsondata.ip
//     // })
//
//
//
// }

//
// window.addEventListener("beforeunload", () => {
//     navigator.sendBeacon("/ api/metrics", JSON.stringify(metric))
// })
//



// window.onbeforeunload = () => {
//     navigator.sendBeacon("/metrics/api", JSON.stringify(metric))
// }
