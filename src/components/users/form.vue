<script>
    import Form from "../../core/forms/form";
    import DataSelect from "../core/DataSelect";
    import MultiDataSelect from "../core/MultiDataSelect";
    import DefaultSelect from "../core/select";
    import Modal from "../../components/core/Modal";

    export default {
        name: "user-form",
        components: {Modal, DefaultSelect, MultiDataSelect, DataSelect},
        props: ['edit', 'id'],
        data() {
            return {
                user : window.user,
                system : {
                },
                form: new Form({
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    password: '',
                    roles: [],
                }, {
                    roles : [],
                }),
            };
        },
        mounted() {
            if (this.edit)
            {
                this.init();
            }
        },
        methods: {
            init() {
                this.form.loading = true;
                window.axios.get(`/api/users/${this.id}/view`).then((response) => {
                    this.form.extract(response.data.body.model);
                    this.form.store('roles' ,response.data.body.model);
                    this.form.loading = false;
                });
            },
            create() {
                this.form.submit(this.edit ? `/api/users/${this.id}/update` : '/api/users/create').then((response) => {
                    window.alerts.success(response).then((response) => {
                        if (!this.edit)
                            this.$router.push(`/users/${response.data.body.model.id}/view`);
                    });
                }).catch((error) => {
                }).finally(() => {
                });
            }
        }
    }
</script>
<template>
    <div class="row">
        <div class="col-lg-12">
            <div :class="['dimmer' , form.loading ? 'active' : '']">
                <div class="loader"></div>
                <div class="dimmer-content">
                    <div class="">
                        <div class="card-body">
                            <h4 class="mb-3"> {{ this.edit ? 'Edit' : 'Create' }} User</h4>
                            <div class="form-horizontal">
                                <div class="form-group row mb-3 align-items-center">
                                    <label class="col-lg-3 col-form-label">Name</label>
                                    <div class="col-lg-9">
                                        <input type="text" name="name" v-model="form.name"
                                               :class="[ 'form-control mw-400' , form.errors.get('name') ? 'is-invalid' : '' ]"
                                               placeholder="Name">
                                        <div v-text="form.errors.get('name')" class="invalid-feedback"/>
                                    </div>
                                </div>
                                <div class="form-group row mb-3 align-items-center">
                                    <label class="col-lg-3 col-form-label">Last Name</label>
                                    <div class="col-lg-9">
                                        <input type="text" name="last_name" v-model="form.surname"
                                               :class="[ 'form-control mw-400' , form.errors.get('surname') ? 'is-invalid' : '' ]"
                                               placeholder="Last Name">
                                        <div v-text="form.errors.get('surname')" class="invalid-feedback"/>
                                    </div>
                                </div>
                                <div class="form-group row mb-3 align-items-center">
                                    <label class="col-lg-3 col-form-label">Phone</label>
                                    <div class="col-lg-9">
                                        <input type="text" name="phone" v-model="form.phone"
                                               :class="[ 'form-control mw-400' , form.errors.get('phone') ? 'is-invalid' : '' ]"
                                               placeholder="Phone">
                                        <div v-text="form.errors.get('phone')" class="invalid-feedback"/>
                                    </div>
                                </div>
                                <div class="form-group row mb-3 align-items-center">
                                    <label class="col-lg-3 col-form-label">Email [Login]</label>
                                    <div class="col-lg-9">
                                        <input type="email" name="email" v-model="form.email"
                                               :class="[ 'form-control mw-400' , form.errors.get('email') ? 'is-invalid' : '' ]"
                                               placeholder="Email">
                                        <div v-text="form.errors.get('email')" class="invalid-feedback"/>
                                    </div>
                                </div>

                                <div v-if="!edit" class="form-group row mb-3 align-items-center">
                                    <label class="col-lg-3 col-form-label">Password [Login]</label>
                                    <div class="col-lg-9">
                                        <input type="password" name="password" v-model="form.password"
                                               :class="[ 'form-control mw-400' , form.errors.get('password') ? 'is-invalid' : '' ]"
                                               placeholder="Password">
                                        <div v-text="form.errors.get('password')" class="invalid-feedback"/>
                                    </div>
                                </div>


                                <div class="form-group row mb-3 align-items-center">
                                    <label class="col-lg-3 col-form-label">Roles</label>
                                    <div class="col-lg-9">
                                        <multi-data-select select="name" :start="form.storage.roles"  v-model="form.roles" name="Roles" :url="`/api/roles`" prefix="list">
                                            <template slot="select" slot-scope="data">
                                                <default-select :data="data"/>
                                            </template>
                                        </multi-data-select>
                                        <div v-text="form.errors.get('roles')" class="text-danger font-12"/>
                                    </div>
                                </div>

                                <div class="form-group mb-0 justify-content-end row">
                                    <div class="col-lg-9">
                                        <button type="submit" @click.prevent="create"
                                                :class="['btn btn-primary' , form.loading ? 'btn-loading' : '']">{{
                                            this.edit ? 'Edit' : 'Create' }} User
                                        </button>
                                    </div>
                                </div>

                              <br>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
