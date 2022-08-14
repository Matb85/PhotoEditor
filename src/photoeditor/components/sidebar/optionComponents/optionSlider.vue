<template>
  <ElMenuItem index="2" class="relative flex-col gap-0">
    <div class="w-full flex justify-between -mb-2">
      <span>{{ option.name }}</span>
      <span class="font-thin" @click="reset()">reset</span>
    </div>
    <ElSlider size="small" :min="option.min" :max="option.max" :step="option.step" v-model="val"></ElSlider>
  </ElMenuItem>
</template>

<script setup lang="ts">
import { ElSlider, ElMenuItem } from 'element-plus';

import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { SliderInterface } from '../options';
const props = defineProps<{ option: SliderInterface }>();
const store = useStore();

const val = ref(props.option.val);

watch(val, (newval: number) => {
  store.commit('photoEditor/updatesettings', { func: props.option.func, val: newval });
  window.dispatchEvent(new CustomEvent('photoEditor/alterphoto'));
});

function reset() {
  val.value = 0;
}
</script>
