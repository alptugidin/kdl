export const state = () => ({
    watchlist: []
})

export const mutations = {
    add(state, value) {
        state.watchlist.push(value)
    },
    remove(state, value){
        state.watchlist = state.watchlist.filter(e => e === value)
    }
}