<template>
  <div class="photoEditor">
    <sidebar />
    <photo />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import photoEditorModule from "../store/photoEditorModule";
import sidebar from "./sidebar/sidebar.vue";
import photo from "./photo/photo.vue";
@Component({
  components: {
    sidebar,
    photo,
  },
})
export default class PhotoEditor extends Vue {
  @Prop({ required: false }) readonly clearDataOnDestroy: boolean;

  destroyEditor() {
    console.log("destroying");
    this.$store.commit("photoEditor/clearModuler");
    this.$store.unregisterModule("photoEditor");
  }
  //hooks
  beforeCreate() {
    if (!this.$store) throw new Error("Store is not available.");
    if (!this.$store.state.photoEditor) {
      this.$store.registerModule("photoEditor", photoEditorModule, { preserveState: false });
      console.log(this.$store.state.photoEditor);
    }
    this.$root.$on("photoEditor/destroy", () => {
      this.destroyEditor();
    });
  }
  beforeDestroy() {
    if (this.clearDataOnDestroy) this.destroyEditor();
  }
}
</script>

<style lang="scss" scoped>
.photoEditor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
