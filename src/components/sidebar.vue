<template>
  <b-sidebar id="sidebar" position="absolute" type="is-white" fullheight open>
    <b-menu :class="{ disabled: !$store.state.fileReady }">
      <b-menu-list>
        <b-menu-item animation="none" :expanded.sync="crop" :active.sync="crop" label="Crop & rotate">
          <cropperOptions />
        </b-menu-item>
        <b-menu-item animation="none" label="Edit">
          <optionSlider v-for="option in options" :key="option.key" :option="option"></optionSlider>
        </b-menu-item>
        <b-menu-item animation="none" label="Apply effects">
          <optionSlider v-for="option in effects" :key="option.key" :option="option"></optionSlider>
        </b-menu-item>
        <b-menu-item animation="none" label="Apply filters">
          <optionCheckBox v-for="option in filters" :key="option.key" :option="option"></optionCheckBox>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </b-sidebar>
</template>

<script>
import categories from "@/store/options.ts";
import optionSlider from "@/components/optionSlider.vue";
import optionCheckBox from "@/components/optionCheckBox.vue";
import cropperOptions from "@/components/cropperOptions.vue";
export default {
  mixins: [categories],
  components: { optionSlider, optionCheckBox, cropperOptions },
  name: "sidebar",
  data() {
    return { crop: false };
  },
  watch: {
    crop(newval) {
      this.$root.$emit("cropperchange", newval ? "init" : "customdestroy", []);
    },
  },
};
</script>

<style lang="scss">
#sidebar.b-sidebar {
  .menu-list li ul {
    margin-bottom: 0.25em;
    margin-top: 0.25em;
  }
  .sidebar-content.is-absolute {
    padding: 4rem 0.25rem 0 0.25rem;
  }
}
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
@media (max-width: 650px) {
  #sidebar.b-sidebar {
    position: absolute;
    width: 100%;
    min-height: 4rem;
    bottom: 0;
    .sidebar-content.is-absolute {
      position: relative;
      bottom: 0;
      min-height: 4rem;
      width: 100%;
      overflow: initial;
      padding: 0.25em 0.5rem;
      display: flex;
      justify-content: center;
      .menu,
      .menu-list {
        width: 100%;
        display: block;
      }
      .menu-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        >li > ul {
          width: 100%;
          max-height: calc(40vh - 8rem);
          overflow-x: scroll;
          overflow-y: hidden;
          background-color: #fff;
          position: absolute;
          bottom: 100%;
          left: 0;
          display: grid;
          grid-auto-columns: 200px;
          grid-template-rows: repeat(2, 50%);
          grid-auto-flow: column;
          border: none;
          margin: 0;
          padding: 1em 1em;
          box-shadow: 2px 0px 4px rgba(10, 10, 10, 0.25);
          li a {
            padding-left: 0;
            margin-right: 1em;
          }
        }
      }
    }
  }
}
</style>
