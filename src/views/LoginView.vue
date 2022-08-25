<template>
  <div class="container mt-2 text-center">
   <div class="card col-sm-8">
     <div class="card-body">
       <form @submit.prevent="login()" class="text-start" autocomplete="off">
         <h4>Sign In</h4>
         <hr>
         <div class="form-group">
           <label for="username">Username</label>
           <input v-model="form.username" type="text" class="form-control" id="username" aria-describedby="username">
           <span class="text-danger fw-bold" ><small v-if="form.errors.username" v-text="form.errors.username"></small></span>
         </div>
         <br>

         <div class="form-group">
           <label for="password">Password</label>
           <input type="password" v-model="form.password" class="form-control" id="password" />
           <span class="text-danger fw-bold" ><small v-if="form.errors.password" v-text="form.errors.password"></small></span>
         </div>
         <br>
         <button type="submit" class="btn btn-primary">Submit</button>

       </form>
     </div>
   </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data(){
    return{
      form:{
        username: '',
        password : '',
        errors: {
          username: '',
          password: ''
        }
      },
    }
  },
  methods:{
    ...mapActions(["LogIn"]),
    login(){
      window.axios.post(`auth/login.php`,
          {
            'username' : this.form.username,
            'password' : this.form.password,
          }).then((response) => {

            if(response.status === 200){
              if(response.data.user){
                window.user = response.data.user;
                window.isLogged = true;
                this.LogIn(response.data.user);
                this.$router.push("/");
              }

             }
          }).catch((error) => {
              this.form.errors = error.response.data.errors;
          })
    }
  }
}
</script>

<style scoped>

</style>