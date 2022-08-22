import axios from 'axios';

const state = {
    orders: {},
};

const actions = {
    getList({commit}, [pageNumber]){
        axios.get("order/orders?page=" + pageNumber)
        .then ( response => {
            commit('SET_ORDER', response.data)
        }). catch (function (error){
            console.log(error);
        });
    },
};

const mutations = {
    SET_ORDER(state, data){
        state.orders = data;
    }, 
    SetCurrentPage(state, data){
        state.orders.current_page = data;
    }
};

export default {
    namespaced: true, 
    state, 
    actions, 
    mutations
}
