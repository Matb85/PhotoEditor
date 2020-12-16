<template>
  <li>
    <a>
      <b-radio class="my-1" v-model="$store.state.curfiltername" :native-value="option.name" @input="input">
        {{ option.name }}
      </b-radio>
    </a>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { OptionInterface } from "@/store/options";
@Component
export default class OptionCheckBox extends Vue {
  @Prop({ required: true }) option: OptionInterface;

  input() {
    this.$store.dispatch("applyfilter", this.option.func);
    this.$root.$emit("alterphoto");
  }
}
</script>
