<template>
  <li>
    <a style="position: relative;">
      <span>{{ option.name }}</span>
      <span class="reset has-text-weight-light is-size-7" @click="reset($event)">reset</span>
      <b-slider
        size="is-small"
        class="mt-2 mb-2"
        :min="option.min"
        :max="option.max"
        :step="option.step"
        v-model="option.val"
      ></b-slider>
    </a>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { SliderInterface } from "../options";

@Component
export default class OptionSlider extends Vue {
  @Prop({ required: true }) option: SliderInterface;

  get val() {
    return this.option.val;
  }
  @Watch("val")
  valWatcher(newval: number) {
    this.$store.dispatch("photoEditor/updatesettings", { func: this.option.func, val: newval });
    this.$root.$emit("photoEditor/alterphoto");
  }

  reset() {
    this.option.val = 0;
  }
}
</script>
