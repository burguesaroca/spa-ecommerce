import axios from 'axios' 

const state = {
    token: '',
    permission: {},
    user: {},
    message: '', 
    aplication: process.env.VUE_APP_APLICATION
}

const getters = {
    token(state) {
        return state.token
    },

    user(state) {
        return state.user
    }
}

const actions = {
    async login({ dispatch, state }, user) {
        let response = await axios.post('auth/login', {
            email: user.email,
            password: user.password,
            aplication: state.aplication
        })

        dispatch('me', response.data.access_token)
    },

    async me({ commit, state }, token) {
        if (token) {
            commit('SET_TOKEN', token)
        }

        if (!state.token) {
            return
        }

        try {
            const response = await axios.post('auth/me', { aplication: state.aplication })
            commit('SET_USER', response.data.user)
            commit('SET_PERMISSION', response.data.user.roles[0].permissions)
        } catch (e) {
            commit('SET_TOKEN', null)
            commit('SET_USER', {})
            commit('SET_PERMISSION', {})
        }
    },


    async refresh({ dispatch }) {
        const response = await axios.post('auth/refresh')
        if (response) {
            dispatch('me', response.data.access_token)
        }
    }
}

const mutations = {
    SET_TOKEN(state, data){
        state.token = data
    },

    SET_PERMISSION(state, data) {
        state.permission = data
    },
    
    SET_USER(state, data) {
        state.user = data
    },

    SET_MESSAGE(state, data){
        state.message = data
    }
}

export default {
    namespaced: true, 
    actions,
    state, 
    mutations, 
    getters
}