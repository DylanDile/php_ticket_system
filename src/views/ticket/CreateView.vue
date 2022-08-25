<template>
  <div class="container mt-2">
    <form @submit.prevent="create()" class="text-start">
      <h4>Create Ticket</h4>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="form.title" type="text" class="form-control" id="title" aria-describedby="title" placeholder="Enter Ttile">
        <span class="text-danger fw-bold" ><small v-if="form.errors.title" v-text="form.errors.title"></small></span>
      </div>

      <br>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="form.description" class="form-control" id="description"></textarea>
        <span class="text-danger fw-bold" ><small v-if="form.errors.description" v-text="form.errors.description"></small></span>
      </div>
      <br>
      <button type="submit" class="btn btn-primary">Submit</button>

    </form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "CreateView",
  data(){
    return{
       form:{
         title: '',
         description : '',
         errors: {
           title: '',
           description: ''
         }
       },
      loggedUser : {}
    }
  },
  methods:{
     create(){
       this.form.errors = {};
       window.axios.post(`ticket/create.php`,
           {
             'title' : this.form.title,
             'description' : this.form.description,
             'user_id' : this.$store.getters.user.id,
             'status' : 'open',
             'date_submitted' : moment(new Date()).format('YYYY-MM-DD')
           })
       .then((response) => {
          this.$router.push("/tickets")
       }).catch((error) => {
         this.form.errors = error.response.data.errors;
       })
     }
  }
}
</script>

<style scoped>

</style>