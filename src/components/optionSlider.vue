<template>
  <li>
    <a>
      <span>{{ option.name }}</span>
      <span class="reset has-text-weight-light is-size-7" @click="reset($event, option)">reset</span>
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

<script>
export default {
  name: "optionSlider",
  props: {
    option: {
      required: true,
    },
  },
  computed: {
    val() {
      return this.option.val;
    },
  },
  watch: {
    val(newval) {
      this.$store.dispatch("updatesettings", { func: this.option.func, val: newval });
      this.$root.$emit("alterphoto");
    },
  },
  methods: {
    reset(event, option) {
      option.val = 0;
    },
  },
};
</script>
