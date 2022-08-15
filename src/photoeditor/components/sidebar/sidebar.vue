<template>
  <ElMenu default-active="2" class="w-80 h-full pt-20 absolute top-0 overflow-auto">
    <ElSubMenu index="1">
      <template #title>Crop & rotate</template>
      <CropperOptions />
    </ElSubMenu>
    <ElSubMenu index="2" @click="hideCropper">
      <template #title>Edit</template>
      <OptionSlider v-for="option in options" :key="option.name" :option="option"></OptionSlider>
    </ElSubMenu>
    <ElSubMenu index="3" @click="hideCropper">
      <template #title>Apply effects</template>
      <OptionSlider v-for="option in effects" :key="option.name" :option="option"></OptionSlider>
    </ElSubMenu>
    <ElSubMenu index="4" @click="hideCropper">
      <template #title>Apply filters</template>
      <OptionFilters :filters="filters"></OptionFilters>
    </ElSubMenu>
  </ElMenu>
</template>

<script setup lang="ts">
import { detail } from '../utils';
import optionsFactory from './options';
import OptionSlider from './optionComponents/optionSlider.vue';
import OptionFilters from './optionComponents/optionCheckBox.vue';
import CropperOptions from './optionComponents/cropperOptions.vue';
import { ElMenu, ElSubMenu } from 'element-plus';
import { useStore } from 'vuex';
const store = useStore();

const { effects, options, filters } = optionsFactory(store);

function hideCropper() {
  if (store.state.photoEditor.isCropperOpen)
    window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('customdestroy', [])));
}
</script>

<style scoped></style>
