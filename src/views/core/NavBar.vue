<template>
  <div class="container-fluid py-2 float-end">
    <div class="app-header-content">
      <div class="row justify-content-between align-items-end ">
        <div class="col-auto">
          <a id="sidepanel-toggler" class="sidepanel-toggler d-inline-block d-xl-none" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                 role="img">
              <title>Menu</title>
              <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                    stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path>
            </svg>
          </a>
        </div>
        <div class="app-utilities col-auto float-end">
          <div class="app-utility-item">
            <a href="/settings" title="Settings">
             <span class="fw-bold">
               <i class="uil uil-setting"></i>
               {{ user.name }}
             </span>
            </a>
          </div>

          <div class="app-utility-item app-user-dropdown dropdown">
            <a class="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#"
               role="button" aria-expanded="false">
              <img src="/app/images/usergreen.png"   alt="user profile">
            </a>
            <ul class="dropdown-menu" aria-labelledby="user-dropdown-toggle">
              <li><a class="dropdown-item" href="/account">Account</a></li>
              <li><a class="dropdown-item" href="/settings">Settings</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" @click="Logout">Log Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  methods:{
    ...mapActions(["LogOut"]),
    async Logout(){
      window.user = {};
      window.isLogged = false;
      await this.LogOut();
      await this.$router.push("/login");
    }
  },
  computed : {
    isLoggedIn : function(){
      return this.$store.getters.isAuthenticated
    },
    user : function (){
      return this.$store.getters.user;
    }
  },
}
</script>

<style scoped>

</style>