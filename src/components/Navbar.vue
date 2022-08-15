<template>
  <ElMenu mode="horizontal" class="navbar" :ellipsis="false" :default-active="'2'">
    <h1 class="text-4xl mx-2">Photo editor</h1>

    <ElMenuItem index="1"><router-link to="/about">About</router-link></ElMenuItem>
    <ElMenuItem index="2"><router-link to="/">Home</router-link></ElMenuItem>

    <div class="flex-grow" />

    <ElButton type="danger" size="small" class="mx-2" plain @click="startOver">Start over</ElButton>
    <ElButton type="primary" class="mx-2" plain @click="dialogVisible = true">Download</ElButton>
  </ElMenu>

  <ElDialog v-model="dialogVisible" title="Download" width="300px">
    <template #header>
      <p>Download</p>
    </template>
    <template #footer>
      <ElButton @click="download" type="primary">Download</ElButton>
    </template>
    <section class="w-full flex flex-col items-center">
      <p class="text-xl mt-4 mb-2">image format</p>
      <ElRadioGroup v-model="format">
        <ElRadioButton label="jpeg">jpeg</ElRadioButton>
        <ElRadioButton label="png">png</ElRadioButton>
      </ElRadioGroup>

      <p class="text-xl mt-4 mb-2">image quality</p>
      <ElInputNumber v-model="quality"></ElInputNumber>
      <ElSlider size="small" class="my-2" :min="30" :max="100" :step="1" v-model="quality"></ElSlider>
    </section>
  </ElDialog>
</template>

<script setup lang="ts">
import {
  ElMenu,
  ElMenuItem,
  ElButton,
  ElDialog,
  ElSlider,
  ElInputNumber,
  ElRadioGroup,
  ElRadioButton,
} from 'element-plus';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const dialogVisible = ref(false);

const format = ref('jpeg');
const quality = ref(75);

function startOver() {
  store.commit('photoEditor/clearModule');
}

function download() {
  window.dispatchEvent(
    new CustomEvent('photoEditor/download', { detail: { format: format.value, quality: quality.value } })
  );
  dialogVisible.value = false;
}
</script>

<style scoped>
.navbar {
  @apply items-center absolute top-0 left-0 z-50 w-full;
}
</style>
