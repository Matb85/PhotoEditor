<template>
  <ElMenu default-active="2" class="w-80 h-full pt-20 absolute top-0 overflow-auto">
    <ElSubMenu index="1">
      <template #title>Crop & rotate</template>
      <CropperOptions />
    </ElSubMenu>
    <ElSubMenu index="2" @click="hideCropper">
      <template #title>Edit</template>
      <SliderOption v-for="option in options" :key="option.name" :option="option"></SliderOption>
    </ElSubMenu>
    <ElSubMenu index="3" @click="hideCropper">
      <template #title>Apply effects</template>
      <SliderOption v-for="option in effects" :key="option.name" :option="option"></SliderOption>
    </ElSubMenu>
    <ElSubMenu index="4" @click="hideCropper">
      <template #title>Apply filters</template>
      <FilterOptions :filters="filters"></FilterOptions>
    </ElSubMenu>
  </ElMenu>
</template>

<script setup lang="ts">
import { detail } from '@/utils';
import optionsFactory from './options';
import CropperOptions from './optionComponents/CropperOptions.vue';
import SliderOption from './optionComponents/SliderOption.vue';
import FilterOptions from './optionComponents/FilterOptions.vue';
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
