<template>
  <ElMenuItem>
    <ElCheckbox class="my-1" v-model="curFilterName" :native-value="option.name">
      {{ option.name }}
    </ElCheckbox>
  </ElMenuItem>
</template>

<script setup lang="ts">
import { ElCheckbox, ElMenuItem } from 'element-plus';

import { OptionInterface } from '../options';
import { useStore } from 'vuex';
const store = useStore();
import { computed } from 'vue';

const props = defineProps<{ readonly option: OptionInterface }>();

const curFilterName = computed({
  get: () => store.state.photoEditor.curfiltername,
  set: () => {
    store.commit('photoEditor/applyfilter', { filter: props.option.func });
    window.dispatchEvent(new CustomEvent('photoEditor/alterphoto'));
  },
});
</script>
