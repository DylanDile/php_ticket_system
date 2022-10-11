<script>
    import PageIndex from "../core/page-index";
    import Can from "../core/can";
    export default {
        components: {Can, PageIndex}
    }
</script>
<template>
    <page-index url="/api/users" prefix="users" name="Users">
        <template slot="actions">
            <router-link to="/users/open/create" class="btn btn-sm btn-outline-primary ml-3">New User</router-link>
        </template>
        <template slot-scope="data" slot="filters">

        </template>
        <template slot="sort-fields">
            <option value="created_at">Created</option>
            <option value="updated_at">Updated</option>
        </template>
        <template slot="table-header">
            <th></th>
            <th class="text-center"></th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Date</th>
            <th class="text-center"></th>
        </template>
        <template slot="table-row" slot-scope="data">
            <td>
                <span class="text-primary">#{{ data.row.id }}</span>
            </td>
            <td>
                <div v-if="data.row.logo">
                    <img :src="data.row.logo.small" style="width:60px;" alt="" class="img-thumbnail">
                </div>
                <div v-else class="avatar-sm">
                    <span class="avatar-title bg-light text-dark font-15 rounded-circle">
                        <strong>{{ data.row.avatar_name }}</strong>
                    </span>
                </div>
            </td>
            <td>
                {{ data.row.name }}
            </td>
            <td>
                {{ data.row.surname }}
            </td>
            <td>
                {{ data.row.phone }}
            </td>
            <td>
                {{ data.row.email }}
            </td>
            <td>
                <i :class="['mdi mdi-square' , data.row.status ? 'text-success' : 'text-danger']"></i>
            </td>
            <td>
                <small><strong>{{ data.row.created_at }}</strong></small><br>
            </td>
            <td>
                <router-link :to="`/users/${data.row.id}/view`" class="action-icon text-primary">
                    <i class="mdi mdi-eye mdi-18px"/>
                </router-link>
            </td>
        </template>
    </page-index>
</template>
