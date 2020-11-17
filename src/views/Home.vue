<template>
  <div class="home">
    <sidebar />
    <photo />
  </div>
</template>

<script>
import sidebar from "@/components/sidebar.vue";
import photo from "@/components/photo.vue";
export default {
  name: "Home",
  components: {
    sidebar,
    photo
  }
};
</script>
