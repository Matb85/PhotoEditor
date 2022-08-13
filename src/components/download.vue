<template>
  <div
    class="modal-card has-text-centered"
    style="width: 300px; margin: 0 auto"
  >
    <header class="modal-card-head">
      <p class="modal-card-title">Download</p>
    </header>
    <section class="modal-card-body">
      <p class="is-size-5 mb-3">image format</p>
      <div class="field">
        <b-radio v-model="format" name="name" native-value="jpeg">jpeg</b-radio>
      </div>
      <div class="field">
        <b-radio v-model="format" name="name" native-value="png">png</b-radio>
      </div>
      <p class="is-size-5 mb-3">image quality</p>
      <b-numberinput v-model="quality"></b-numberinput>
      <b-slider
        size="is-small"
        class="mt-2 mb-2"
        :min="30"
        :max="100"
        :step="1"
        v-model="quality"
        :tooltip="false"
      ></b-slider>
    </section>
    <footer class="modal-card-foot is-justify-content-center">
      <button @click="download" class="button is-primary">Download</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const format = ref('jpeg');
const quality = ref(75);

function download() {
  window.dispatchEvent(
    new CustomEvent('download', { detail: { format, quality } })
  );
}
</script>
