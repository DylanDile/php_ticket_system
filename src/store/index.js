import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthorised : false,
    user: {
      id: '',
      name: '',
      username: '',
    }
  },
  getters: {
    isAuthenticated: state => !!state.isAuthorised,
    user: state => state.user,
  },
  mutations: {
    setUser(state, user){
      state.user.id = user[0].id;
      state.user.name = user[0].name;
      state.user.username = user[0].username;
      state.isAuthorised = true;
    },
    logout(state){
      state.user = {};
      state.isAuthorised = false;
    },
  },
  actions: {
    async LogIn({commit}, user) {
      console.log("Setting up user")
      await commit('setUser', user)
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
