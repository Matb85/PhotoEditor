<template>
  <div id="app">
    <navbar />
    <keep-alive>
      <router-view class="router-view" />
    </keep-alive>
  </div>
</template>
<script lang="ts">
import navbar from "@/components/navbar.vue";
export default {
  name: "app",
  components: {
    navbar,
  },
};
</script>
