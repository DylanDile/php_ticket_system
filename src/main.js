import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import { Plugin } from 'vue-fragment';
Vue.use(Plugin);
require('./boot/axios');
require('./boot/alerts');
require('./boot/filters');
require('./boot/helpers');

axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.withCredentials = true;

Vue.config.productionTip = false
window.axios = axios;
window.user = {};
window.isLogged = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
