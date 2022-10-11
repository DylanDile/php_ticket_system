<template>
        <span v-if="can">
            <slot />
        </span>
</template>
<script>
    import { Fragment } from 'vue-fragment';
    export default {
        components: {
            Fragment:Fragment
        },
        name: "can",
        props: ['permission' , 'override'],
        computed : {
            can : function ()
            {
                return window.user.permissions.filter(e => e.name === this.permission ).length  >  0 || this.override;
            }
        }
    }
</script>
