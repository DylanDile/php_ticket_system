<script>
    export default {
        name: "internal",
        data()
        {
          return{
            user : this.$store.state.user
          }
        },
        methods : {
          init(){
            window.axios.get("/api/auth/user").then((response)=>{
              console.log(response)
               this.user = response.data.body.user;
            })
          }
        },
      computed : {
        isLoggedIn: function () {
          return this.$store.getters.isAuthenticated
        },

        user1: function () {
          return this.$store.getters.user;
        }
      },
      mounted() {
        this.init();
      }
    }
</script>
<template>
    <div class="row justify-content-center">
        <div class="col-lg-12">
            <div class="">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3 flex-wrap">
                        <h4 class="header-title m-0 flex-fill">Personal Information</h4>
                    </div>
                    <div class="text-left">
                        <p>
                            <strong class="mr-2">First Name :</strong>
                            <span>{{ user.name }}</span>
                        </p>
                        <p>
                            <strong class="mr-2">Last Name :</strong>
                            <span>{{ user.surname }}</span>
                        </p>
                        <p>
                            <strong class="mr-2"> Email :</strong>
                            <span>{{ user.email }}</span>
                        </p>
                        <p>
                            <strong class="mr-2">Created :</strong>
                            <span>{{ user.created_at }}</span>
                        </p>
                        <p>
                            <strong class="mr-2">Status :</strong>
                            <span> <span class="badge badge-light p-2 font-12">{{ user.status ? 'activated' : 'de-activated' }}</span></span>
                        </p>
                    <!--
                        <p v-if="user.permissions.length > 0">
                            <strong class="mr-2">Permissions :</strong>
                            <span> <span v-for="row in user.permissions" class="badge badge-light p-2 m-1 font-12">{{ row.name }}</span></span>
                        </p>
                      -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

