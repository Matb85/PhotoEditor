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
      required: true
    },
    func: {
      required: false,
      default: "regular"
    }
  },
  data() {
    return {
      input: {
        regular: (value, option) => {
          console.log(value);
          this.$root.$emit("alterphoto", option.func, value);
          option.val = value;
        },
        filter: (value, option) => {
          console.log(value);
          this.$root.$emit("alterphoto", "filter", value ? option.func : value);
          option.val = value;
        }
      }
    };
  }
};
</script>
