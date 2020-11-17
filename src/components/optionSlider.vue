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
        @change="saveChange($event, option)"
      ></b-slider>
    </a>
  </li>
</template>

<script>
export default {
  name: "optionSlider",
  props: {
    option: {
      required: true
    },
  },
  methods: {
    format(option) {
      return function format(val) {
        return String(Math.round((val / option.max) * 100));
      };
    },
    reset(event, option) {
      option.val = 0;
      this.input(option.val, option);
    },
    input(value, option) {
      //console.log(value);
      this.$root.$emit("alterphoto", option.func, value);
      option.val = value;
    },
    saveChange(value, option) {
      this.$root.$emit("savechange", option.func, value);
    }
  }
};
</script>
