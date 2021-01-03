<template>
  <li>
    <a>
      <b-radio class="my-1" v-model="curFilterName" :native-value="option.name">
        {{ option.name }}
      </b-radio>
    </a>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { OptionInterface } from "../options";
@Component
export default class OptionCheckBox extends Vue {
  @Prop({ required: true }) option: OptionInterface;

  get curFilterName() {
    return this.$store.state.photoEditor.curfiltername;
  }
  set curFilterName(name) {
    this.$store.commit("photoEditor/applyfilter", { filter: this.option.func, name: name });
    this.$root.$emit("photoEditor/alterphoto");
  }
}
</script>
