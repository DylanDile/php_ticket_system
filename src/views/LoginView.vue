<template>
  <div class="row g-0 app-auth-wrapper">
    <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
      <div class="d-flex flex-column align-content-end">
        <div class="app-auth-body mx-auto">
          <div class="app-auth-branding mb-4">
            <a class="app-logo" href="/">
              <img class="logo-icon me-2" src="/app/images/app-logo.svg" alt="logo">
            </a>
          </div>
          <h2 class="auth-heading text-center mb-5">Log in to Portal</h2>
          <div class="auth-form-container text-start">
            <form @submit.prevent="login()" class="auth-form login-form" autocomplete="off">
              <p v-if="message" :class="['alert text-center mb-0 rounded-0 mb-3 px-3' , error ? 'alert-danger' : 'alert-primary']">
                {{ message }}
              </p>
              <div class="email mb-3">
                <label class="" for="signin-email">Email</label>
                <input v-model="form.email" id="signin-email" name="signin-email"
                       :class="[ 'form-control mw-400' , form.errors.get('email') ? 'is-invalid' : '' ]"
                       type="email" class="form-control signin-email">
                <div v-text="form.errors.get('email')" class="invalid-feedback"/>
              </div>

              <div class="password mb-3">

                <label class="" for="signin-password">Password</label>
                <input v-model="form.password" id="signin-password"
                       name="signin-password" type="password"
                       :class="[ 'form-control mw-400' , form.errors.get('password') ? 'is-invalid' : '' ]"
                       class="form-control signin-password" placeholder="Password" required="required">
                <div v-text="form.errors.get('password')" class="invalid-feedback"/>
                <div class="extra mt-3 row justify-content-between">
                  <div class="col-6">
                    <div class="form-check">
                    </div>
                  </div><!--//col-6-->
                  <div class="col-6">
                    <div class="forgot-password text-end">
                      <a href="/forgot-password">Forgot password?</a>
                    </div>
                  </div><!--//col-6-->
                </div><!--//extra-->
              </div><!--//form-group-->
              <div class="text-center">
                <button type="submit" class="btn app-btn-primary w-100 theme-btn mx-auto">Log In</button>
              </div>
            </form>

            <div class="auth-option text-center pt-5">No Account? Sign up <a class="text-link" href="/signup" >here</a>.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col" style="background-image: url('/app/images/background/background-1.jpg')">
      <div class="auth-background-holder">
      </div>
      <div class="auth-background-mask"></div>
      <div class="auth-background-overlay p-3 p-lg-5">
        <div class="d-flex flex-column align-content-end h-100">
          <div class="h-100"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../core/forms/form";
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data(){
    return{
      loading : false,
      error : false,
      message : '',
      form: new Form({
        email: '',
        password: ''
      })
    }
  },
  methods:{
    ...mapActions(["LogIn", "SetToken"]),
    login(){
      axios.get('/sanctum/csrf-cookie').then(response => {
        this.form.submit(`/api/auth/login`).then((response) => {
          if (response.data.success === true){
            console.log(response.data.body)
            this.message = response.data.message;
            window.user = response.data.body.user;
            window.isLogged = true;

            this.LogIn({
              id : response.data.body.user.id,
              name : response.data.body.user.name,
              email : response.data.body.user.email,
            });
            this.SetToken(response.data.body.authToken);

            setTimeout(function () {
              window.location = `${window.location.origin}/`;
            } , 2000 );

          } else {
            this.message = response.data.message;
            this.loading = false;
            this.error = true;
          }

        })
      });

    }
  }
}
</script>

<style scoped>

</style>