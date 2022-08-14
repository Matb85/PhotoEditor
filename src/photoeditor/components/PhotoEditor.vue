<template>
  <div class="photoEditor">
    <sidebar />
    <photo />
  </div>
</template>

<script setup lang="ts">
import photoEditorModule from '../store/photoEditorModule';
import sidebar from './sidebar/sidebar.vue';
import photo from './photo/photo.vue';

import { useStore } from 'vuex';
import { onBeforeMount, onBeforeUnmount } from 'vue';
const store = useStore();
const props = defineProps<{ readonly clearDataOnDestroy?: boolean }>();

function destroyEditor() {
  store.commit('photoEditor/clearModuler');
  store.unregisterModule('photoEditor');
}
//hooks
onBeforeMount(() => {
  if (!store) throw new Error('Store is not available.');
  if (!store.state.photoEditor)
    store.registerModule('photoEditor', photoEditorModule, {
      preserveState: false,
    });

  window.addEventListener('photoEditor/destroy', () => destroyEditor(), {
    once: true,
  });
});
onBeforeUnmount(() => {
  if (props.clearDataOnDestroy) destroyEditor();
});
</script>

<style scoped>
.photoEditor {
  @apply relative w-full h-full;
}
</style>
