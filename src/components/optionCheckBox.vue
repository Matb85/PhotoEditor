<template>
  <li>
    <a>
      <b-radio class="my-1" v-model="$store.state.curfiltername" :native-value="option.name" @input="input">
        {{ option.name }}
      </b-radio>
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
  },
  methods: {
    input() {
      this.$store.dispatch("applyfilter", this.option.func);
      this.$root.$emit("alterphoto");
      console.log(this.$store.state.curfiltername);
      console.log(this.option.func);
    },
  },
};
</script>
