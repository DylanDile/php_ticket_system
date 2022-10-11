<template>
  <div class="container mt-2">
    <form @submit.prevent="update()" class="text-start">
      <h4>Create Ticket</h4>
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="form.title" readonly type="text" class="form-control bg-light" id="title" aria-describedby="title" placeholder="Enter Ttile">
      </div>
      <br>

      <div class="form-group">
        <label for="user_id">User</label>
        <input readonly v-model="form.user_id" class="form-control bg-light" id="user_id" />
      </div>
      <br>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea readonly v-model="form.description" class="form-control bg-light" id="description"></textarea>
      </div>
      <br>

      <div class="form-group">
        <label for="date_submitted">Date Submitted</label>
        <input type="date" v-model="form.date_submitted" class="form-control bg-light" id="date_submitted" />
      </div>
      <br>

      <hr>
      <h5 class="text-danger fw-bold"> Change ticket status..</h5>
      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" class="form-control " id="status">
            <option value="">Select...</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
        </select>
      </div>

      <br>
      <button type="submit" class="btn btn-primary">Update Ticket</button>

    </form>
  </div>
</template>

<script>
export default {
  name: "EditView",
  data(){
    return{
      form:{
        id: '',
        title: '',
        user_id: '',
        description : '',
        status : '',
        date_submitted : '',
      }
    }
  },
  methods:{
    update(){
      window.axios.post(`ticket/update.php`,
          {
            'id' : this.form.id,
            'status' : this.form.status,
          })
          .then((response) => {
            console.log(response)
            this.$router.push(`/tickets`);
          }).catch((error) => {
            console.log(error)
          })
    },
    init(){
      window.axios.get(`/ticket/view.php?id=${this.$route.params.id}`, ).then((response) => {
        this.form = response.data;
      })
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>