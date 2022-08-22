import axios from 'axios';

const state = {
    products: {},
};

const actions = {
    getList({commit}, [pageNumber, search]){
        axios.get("/products?page=" + pageNumber + "&search="+ search)
        .then ( response => {
            commit('SET_PRODUCT', response.data)
        }). catch (function (error){
            console.log(error);
        });
    },

};

const mutations = {
    SET_PRODUCT(state, data){
        state.products = data;
    }, 
    SetCurrentPage(state, data){
        state.products.current_page = data;
    }
};

export default {
    namespaced: true, 
    state, 
    actions, 
    mutations
}
