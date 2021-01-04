<template>
  <div class="home">
    <photoEditor />
  </div>
</template>

<script lang="ts">
import photoEditor from "@/main";

export default {
  name: "Home",
  components: {
    photoEditor,
  },
};
</script>
<style scoped lang="scss">
.home {
  position: relative;
  top: 3.3rem;
  height: calc(100% - 3.3rem);
  width: 100%;
}
</style>
