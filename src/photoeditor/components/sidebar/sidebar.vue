<template>
  <ElMenu default-active="2" class="w-80 h-full pt-20 absolute top-0 overflow-auto">
    <ElSubMenu index="1" @click="click">
      <template #title>Crop & rotate</template>
      <CropperOptions />
    </ElSubMenu>
    <ElSubMenu index="2" @click="unclick">
      <template #title>Edit</template>
      <OptionSlider v-for="option in options" :key="option.name" :option="option"></OptionSlider>
    </ElSubMenu>
    <ElSubMenu index="3" @click="unclick">
      <template #title>Apply effects</template>
      <OptionSlider v-for="option in effects" :key="option.name" :option="option"></OptionSlider>
    </ElSubMenu>
    <ElSubMenu index="4" @click="unclick">
      <template #title>Apply filters</template>
      <OptionCheckBox v-for="option in filters" :key="option.name" :option="option"></OptionCheckBox>
    </ElSubMenu>
  </ElMenu>
</template>

<script setup lang="ts">
import { detail } from '../utils';
import optionsFactory from './options';
import OptionSlider from './optionComponents/optionSlider.vue';
import OptionCheckBox from './optionComponents/optionCheckBox.vue';
import CropperOptions from './optionComponents/cropperOptions.vue';
import { ElMenu, ElSubMenu } from 'element-plus';
import { useStore } from 'vuex';
const store = useStore();

const { effects, options, filters } = optionsFactory(store);

let iscropperopen = false;
function click() {
  if (iscropperopen) return;
  window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('init', [])));
  iscropperopen = true;
}
function unclick() {
  if (!iscropperopen) return;
  window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('customdestroy', [])));
  iscropperopen = false;
}
</script>

<style scoped></style>
