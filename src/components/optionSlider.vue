<template>
  <li>
    <a>
      <span>{{ option.name }}</span>
      <span
        class="reset has-text-weight-light is-size-7"
        @click="reset($event, option)"
        >reset</span
      >
      <b-slider
        size="is-small"
        class="mt-2 mb-2"
        :custom-formatter="format(option)"
        :value="option.val"
        :min="option.min"
        :max="option.max"
        :step="option.step"
        @input="input($event, option)"
        @change="saveChange(option)"
        @dragstart="setinitval(option)"
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
  data() {
    return {
      initval: 0,
    };
  },
  methods: {
    format(option) {
      return function format(val) {
        return String(Math.round((val / option.max) * 100));
      };
    },
    setinitval(option) {
      this.initval = option.val;
    },
    reset(event, option) {
      const val = option.val;
      this.saveChange(option);
      setTimeout(() => {
        this.$root.$emit("alterphoto", option.func, 0 - val);
      }, 100);
      this.initval = 0;
      option.val = 0;
    },
    input(value, option) {
      console.log(value - this.initval);
      this.$root.$emit("alterphoto", option.func, value - this.initval);
      option.val = value;
    },
    saveChange(option) {
      this.$root.$emit("savechange", option);
    },
  },
};
</script>
