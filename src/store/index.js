import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/Login";

import loading from './modules/Loading'
import product from './modules/Product'
import order from './modules/Order'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    loading,
    product,
    order
  },
});


