<script>
    import PageOpen from "../core/page-open";
    import Can from "../core/can";
    export default {
        name: "user-open",
        components: {Can, PageOpen},
    }
</script>
<template>
    <page-open>
        <template slot="create">
            <!--
            <router-link exact :to="`/users/open/create`" class="side-nav-link px-4 py-2" active-class="open-link-active">
                <i class="uil-plus mr-1"></i> <span> New User </span>
            </router-link>-->
        </template>
        <template slot="links">
          <nav id="orders-table-tab" class="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
            <router-link  exact :to="`/users/open/create`" class="flex-sm-fill text-sm-center nav-link"
                          role="tab" aria-controls="orders-all" aria-selected="true">
              <i class="uil-plus mr-1"></i> <span> New User </span>
            </router-link>
            <router-link  exact :to="`/users/${$route.params.id}/view`" class="flex-sm-fill text-sm-center nav-link"
                          role="tab" aria-controls="orders-all" aria-selected="true">
              <i class="uil-eye mr-1"></i> <span> View </span>
            </router-link>
            <router-link exact :to="`/users/${$route.params.id}/edit`" class="flex-sm-fill text-sm-center nav-link"
                         role="tab" aria-controls="orders-all" aria-selected="true">
              <i class="uil-edit mr-1"></i> Edit
            </router-link>
          </nav>
        </template>
    </page-open>
</template>

