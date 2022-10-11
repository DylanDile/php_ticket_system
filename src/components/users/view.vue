<script>
    export default {
        name: "user-view",
        data() {
            return {
                model: {
                    roles : []
                },
                loading: true
            };
        },
        methods : {
            action(action)
            {
                window.action(action , 'User' , `/api/users/${this.$route.params.id}/${action}`).then((response) => {
                    this.model = response.data.body.model;
                });
            },
            init()
            {
                this.loading = true;
                window.axios.get(`/api/users/${this.$route.params.id}/view`).then((response) => {
                    this.model = response.data.body.model;
                }).finally(() => {
                    this.loading = false;
                });
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<template>
    <div :class="['dimmer' , loading ? 'active' : '']">
        <div class="loader"></div>
        <div class="dimmer-content">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ribbon-box ">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3 flex-wrap">
                                <h4 class="header-title m-0 flex-fill">User Information</h4>
                                <div class="">
                                    <button @click="action('reset')" type="button" class="btn btn-light m-1">
                                        <i class="mdi mdi-lightbulb-outline mr-1"></i> Reset
                                    </button>
                                    <button v-if="!model.status" @click="action('activate')" type="button" class="btn btn-light m-1">
                                        <i class="mdi mdi-lightbulb-outline mr-1"></i> Activate
                                    </button>
                                    <button v-if="model.status" @click="action('deactivate')"  type="button" class="btn btn-light m-1">
                                        <i class="mdi mdi-lightbulb-off-outline mr-1"></i> De-Activate
                                    </button>
                                </div>
                            </div>
                            <div class="text-left">
                                <p>
                                    <strong class="mr-2">Name :</strong>
                                    <span class="ps-4">{{ model.name }}</span>
                                </p>
                                <p>
                                    <strong class="mr-2">Last Name :</strong>
                                    <span class="ps-4">{{ model.surname }}</span>
                                </p>
                                <p>
                                    <strong class="mr-2">Phone Number :</strong>
                                    <span class="ps-4">{{ model.phone }}</span>
                                </p>

                                <p>
                                    <strong class="mr-2">Email :</strong>
                                    <span class="ps-4">{{ model.email }}</span>
                                </p>

                                <p v-if="model.roles">
                                    <strong class="mr-2">Roles :</strong>
                                    <span class="ps-4 " v-for="role in model.roles"><strong class="text-white badge bg-info">{{ role.name }}</strong></span>
                                </p>

                                <p>
                                    <strong class="mr-2 pe-2">Status :</strong>
                                    <i :class="['mdi mdi-square' , model.status ? 'text-success' : 'text-danger']"></i>
                                </p>
                                <p>
                                    <strong class="mr-2">Created :</strong>
                                    <span class="ps-4">{{ model.created_at }}</span>
                                </p>
                                <p>
                                    <strong class="mr-2">Created :</strong>
                                    <span class="ps-4">{{ model.updated_at }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
