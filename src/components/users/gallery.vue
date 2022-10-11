<script>
    import Gallery from "../core/gallery";
    export default {
        components: { Gallery }
    }
</script>
<template>
   <gallery :id="$route.params.id" type="user" :company="$route.params.id"/>
</template>
