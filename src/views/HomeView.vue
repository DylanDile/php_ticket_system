<template>
 <div class="app">
   <header-view/>
   <div class="app-wrapper">
     <div class="app-content pt-3 p-md-3 p-lg-4">
       <div class="container-xl">
         <router-view/>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import HeaderView from "@/views/core/HeaderView";
export default {
  name: 'HomeView',
  components: {HeaderView}
}
</script>
