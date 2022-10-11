<template>
  <header class="app-header fixed-top">
    <div class="app-header-inner">
        <nav-bar/>
    </div>
    <side-bar/>
  </header>
</template>

<script>
import NavBar from "@/views/core/NavBar";
import SideBar from "@/views/core/SideBar";
export default {
  name: "HeaderView",
  components: {SideBar, NavBar}
}
</script>

<style scoped>

</style>