import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'


require('./store/modules/Suscriber')
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_SERVIDOR

store.dispatch('login/me', localStorage.getItem('spa_token'))
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  })