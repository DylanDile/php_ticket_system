import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorised : false,
    authToken : '',
    user: {
      id: '',
      name: '',
      email: '',
    }
  },
  getters: {
    isAuthenticated: state => !!state.isAuthorised,
    user: state => state.user,
    authToken : state => state.authToken
  },
  mutations: {
    setUser(state, user){
      state.user.id = user.id;
      state.user.name = user.name;
      state.user.email = user.email;
      state.isAuthorised = true;
    },
    setToken(state, token){
      state.authToken = token;
      localStorage.setItem("token", token);
    },
    logout(state){
      state.user = {};
      state.isAuthorised = false;
      state.authToken = null;
      localStorage.setItem("token", null);
      window.user = {};
    },
  },
  actions: {
    async LogIn({commit}, user) {
      await commit('setUser', user)
    },
    async SetToken({commit}, token) {
      await commit('setToken', token)
    },
    async LogOut({commit}){
      let user = null
      commit('logout', user)
    }
  },
  modules: {

  },
  plugins: [createPersistedState()]
})
