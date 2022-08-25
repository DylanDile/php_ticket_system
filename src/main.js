import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost/php_projects/php_ticket_system/';

Vue.config.productionTip = false
window.axios = axios;
window.user = {};
window.isLogged = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
