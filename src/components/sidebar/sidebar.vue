<template>
  <b-sidebar id="sidebar" position="absolute" type="is-white" fullheight open>
    <b-menu :class="{ disabled: !$store.state.photoEditor.fileReady }">
      <b-menu-list>
        <b-menu-item animation="none" :expanded.sync="crop" :active.sync="crop" label="Crop & rotate">
          <cropperOptions />
        </b-menu-item>
        <b-menu-item animation="none" label="Edit">
          <optionSlider v-for="option in options" :key="option.name" :option="option"></optionSlider>
        </b-menu-item>
        <b-menu-item animation="none" label="Apply effects">
          <optionSlider v-for="option in effects" :key="option.name" :option="option"></optionSlider>
        </b-menu-item>
        <b-menu-item animation="none" label="Apply filters">
          <optionCheckBox v-for="option in filters" :key="option.name" :option="option"></optionCheckBox>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </b-sidebar>
</template>

<script lang="ts">
import { Mixins, Component, Watch } from "vue-property-decorator";

import Options from "./options";
import optionSlider from "./optionComponents/optionSlider.vue";
import optionCheckBox from "./optionComponents/optionCheckBox.vue";
import cropperOptions from "./optionComponents/cropperOptions.vue";

@Component({
  components: { optionSlider, optionCheckBox, cropperOptions },
})
export default class Sidebar extends Mixins(Options) {
  crop = false;
  @Watch("crop") cropWatcher(newval: boolean) {
    this.$root.$emit("photoEditor/cropperchange", newval ? "init" : "customdestroy", []);
  }
}
</script>

<style lang="scss" scoped>
#sidebar.b-sidebar ::v-deep {
  .menu-list li ul {
    margin-bottom: 0.25em;
    margin-top: 0.25em;
  }
  .sidebar-content.is-absolute {
    padding: 1rem 0.25rem 0 0.25rem;
    box-shadow: 2px 0px 4px rgba(#000, 0.25);

    .reset {
      position: absolute !important;
      right: 0;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
@media (max-width: 650px) {
  #sidebar.b-sidebar ::v-deep {
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
      .reset {
        margin-right: 0.5rem;
      }
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
        > li > ul {
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
