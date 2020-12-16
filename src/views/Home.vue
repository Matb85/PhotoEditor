<template>
  <div class="home">
    <sidebar />
    <photo />
  </div>
</template>

<script lang="ts">
import sidebar from "@/components/sidebar/sidebar.vue";
import photo from "@/components/photo/photo.vue";
export default {
  name: "Home",
  components: {
    sidebar,
    photo,
  },
};
</script>
