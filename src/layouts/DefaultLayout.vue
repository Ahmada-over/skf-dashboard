<template>
  <v-app>
     <v-main>
      <Sidebar/>  
      <Navbar/>
      <router-view />
  </v-main> 
  </v-app>

</template>

<script lang="ts" setup>
  //
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

</script>
