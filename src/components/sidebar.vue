<template>
  <b-sidebar class="sidebar" position="absolute" type="is-white" fullheight open>
    <div class="px-1 py-5 mt-6">
      <b-menu :class="{ disabled: !$store.state.fileReady }">
        <b-menu-list>
          <b-menu-item
            animation="fade"
            v-for="category in categories"
            :key="category.key"
            :label="category.name"
          >
            <optionSlider
              v-for="option in category.sliders"
              :key="option.key"
              :option="option"
            ></optionSlider>
            <optionCheckBox
              v-for="option in category.checkboxes"
              :key="option.key"
              :option="option"
            ></optionCheckBox>
          </b-menu-item>
          <b-menu-item animation="fade" label="Photon filters">
            <optionCheckBox
              v-for="option in Pfilters.checkboxes"
              :key="option.key"
              :option="option"
              func="Pfilter"
            ></optionCheckBox>
          </b-menu-item>
          <b-menu-item animation="fade" label="Instagram filters">
            <optionCheckBox
              v-for="option in Ifilters.checkboxes"
              :key="option.key"
              :option="option"
              func="Ifilter"
            ></optionCheckBox>
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
.sidebar ::v-deep .menu-list li ul {
  margin-bottom: 0;
  margin-top: 0;
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
