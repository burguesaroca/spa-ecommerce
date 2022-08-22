const state = {
    isLoading:false
}

const getters = {
}

const actions = {
    
}

const mutations = {
    SET_LOADING(state, payload){
        state.isLoading=payload
    }
}

export default {
    namespaced: true, 
    actions,
    state, 
    mutations, 
    getters
}