<template>
  <ElRadioGroup class="w-full flex-col !items-start pl-8" v-model="filter">
    <ElRadio v-for="(option, i) of filters" :key="option.name" class="my-1" :label="i">
      {{ option.name }}
    </ElRadio>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio } from 'element-plus';
import { OptionInterface } from '../../../store/photoEditorModule';
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
const store = useStore();
const props = defineProps<{ readonly filters: OptionInterface[] }>();

let i = 0;
for (; i < props.filters.length; i++) {
  if (props.filters[i].name == store.state.photoEditor.curfiltername) {
    break;
  }
}
const filter = ref(i);
store.commit('photoEditor/applyfilter', props.filters[i]);

watch(filter, (newval: number) => {
  console.log(newval);
  store.commit('photoEditor/applyfilter', props.filters[newval]);
  window.dispatchEvent(new CustomEvent('photoEditor/alterphoto'));
});
</script>
