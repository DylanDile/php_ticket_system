<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Ticket System</a>
        <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home
                <span class="visually-hidden">(current)</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="isAuth">
              <router-link class="nav-link" to="/tickets">Tickets</router-link>
            </li>
            <li class="nav-item" v-if="!isAuth">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item float-end" v-if="isAuth">
              <a class="nav-link" @click="logout()">Logout</a>
            </li>
            <li class="nav-item mr-0" v-if="isAuth">
              <strong class="nav-link">You are logged in as  : <b>{{  user.username }}</b></strong>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  computed : {
    isAuth : function(){ return this.$store.getters.isAuthenticated},
    user: function () { return this.$store.getters.user}
  },
  methods: {
    async logout (){
      await this.$store.dispatch('LogOut')
      await this.$router.push('/login')
    }
  },
}
</script>
