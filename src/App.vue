<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{ }
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
