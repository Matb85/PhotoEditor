<template>
  <div id="app">
    <navbar />
    <router-view class="router-view" />
  </div>
</template>
<script lang="ts">
import navbar from "@/components/navbar.vue";
export default {
  name: "app",
  components: {
    navbar
  }
};
</script>
