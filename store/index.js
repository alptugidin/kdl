export const state = () => ({
    watchList: [],
    inWatchlist: false
})

export const mutations = {

    updateWatchlist(state) {
        if (localStorage.hasOwnProperty("f")) {
            state.watchList = JSON.parse(localStorage.getItem("f"))
        }
    },

    checkWatchlist(state, value) {
        state.inWatchlist = state.watchList.includes(value);
    }
}

export const getters = {

    getWatchlistSize(state) {
        return state.watchList.length
    }
}
