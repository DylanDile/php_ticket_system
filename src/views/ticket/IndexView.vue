<template>
  <div class="container mt-2">
    <h4> List Tickets Component</h4>
    <router-link to="/ticket/create" class="btn btn-success float-end" >Create Ticket</router-link>
    <br>
    <div class="table table-responsive">
      <table class="table">
        <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">User</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets">
            <th scope="row">{{ ticket.id }}</th>
            <td class="text-start">{{ ticket.title }}</td>
            <td>{{ ticket.user_id}}</td>
            <td> {{ ticket.status}}</td>
            <td> {{ ticket.date_submitted}}</td>
            <td>
              <div class="row">
                  <router-link :to="`/ticket/${ticket.id}/edit`" class="btn btn-sm btn-warning col-sm mr-2">edit</router-link>
                  <router-link :to="`/ticket/${ticket.id}/show`" class="btn btn-sm btn-info col-sm ml-1">view</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexView",
  data(){
    return{
        tickets : {}
    }
  },
  methods:{
    init(){
      window.axios.get(`ticket/list.php`).then((response) => {
          this.tickets = response.data;
      });
    }

  },
  mounted() {
    console.log()
    this.init();
  }
}
</script>

<style scoped>

</style>