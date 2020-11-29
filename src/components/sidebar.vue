<template>
  <b-sidebar class="sidebar" position="absolute" type="is-white" fullheight open>
    <div class="px-1 py-5 mt-6">
      <b-menu :class="{ disabled: !$store.state.fileReady }" :accordion="false">
        <b-menu-list>
          <b-menu-item animation="fade" expanded active label="Options">
            <optionSlider v-for="option in options" :key="option.key" :option="option"></optionSlider>
          </b-menu-item>
          <b-menu-item animation="fade" label="Effects">
            <optionSlider v-for="option in effects" :key="option.key" :option="option"></optionSlider>
          </b-menu-item>
          <b-menu-item animation="fade" label="filters">
            <optionCheckBox v-for="option in filters" :key="option.key" :option="option"></optionCheckBox>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </b-sidebar>
</template>

<script>
import categories from "@/store/options.ts";
import optionSlider from "@/components/optionSlider.vue";
import optionCheckBox from "@/components/optionCheckBox.vue";
export default {
  mixins: [categories],
  components: { optionSlider, optionCheckBox },
  name: "sidebar",
};
</script>

<style lang="scss">
.sidebar .menu-list li ul {
  margin-bottom: 0.25em;
  margin-top: 0.25em;
}
.reset {
  position: absolute;
  right: 0;
  margin-right: 1.5em;
  &:hover {
    text-decoration: underline;
  }
}
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
