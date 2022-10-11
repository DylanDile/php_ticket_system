<script>
    import PageOpen from "../core/page-open";
    export default {
        name: "settings-view",
        components: {PageOpen},
        data()
        {
            return {
              window : window
            };
        }
    }
</script>
<template>
    <page-open>

        <template slot="links">
            <router-link exact :to="`settings`" class="side-nav-link px-4 py-2" active-class="open-link-active">
                <i class="uil-eye mr-1"></i> <span> Account Profile </span>
            </router-link>
            <router-link exact  :to="`/password`"  class="side-nav-link  px-4 py-2"  active-class="open-link-active">
                <i class="uil-lock mr-1"></i> Password
            </router-link>
        </template>
    </page-open>

</template>

