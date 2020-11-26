<template>
  <li>
    <a>
      <b-checkbox class="my-1" @input="input[func]($event, option)">
        {{ option.name }}
      </b-checkbox>
    </a>
  </li>
</template>

<script>
export default {
  name: "optionCheckBox",
  props: {
    option: {
      required: true,
    },
    func: {
      required: false,
      default: "regular",
    },
  },
  data() {
    return {
      input: {
        regular: (value, option) => {
          console.log(value);
          this.emitAlterp(option.tech, option.func, value);
          option.val = value;
        },
        filter: (value, option) => {
          console.log(value);
          this.emitAlterp(option.tech, "filter", value ? option.func : value);
          option.val = value;
        },
      },
    };
  },
  methods: {
    emitAlterp(tech, func, value) {
      this.$root.$emit("alterphoto", tech, func, value);
    },
  },
};
</script>
