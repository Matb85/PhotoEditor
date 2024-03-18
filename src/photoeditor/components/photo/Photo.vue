<template>
  <section class="container">
    <div v-if="showSpinner" class="lds-dual-ring"></div>
    <div
      v-if="!store.state.photoEditor.fileReady && !showSpinner"
      class="el-upload el-upload--text"
      @click="upload"
      tabindex="0"
    >
      <div class="el-upload-dragger">
        <img src="/upload.svg" class="w-12 h-12 object-contain mx-auto" />
        <p class="px-8">click to upload you photo</p>
      </div>
      <input @input="initimage" class="el-upload__input" name="file" accept=".jpg,.jpeg,.png" type="file" />
    </div>

    <div class="canvas-container">
      <canvas v-show="store.state.photoEditor.fileReady" ref="canvas"></canvas>
    </div>
  </section>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { detail } from '@/utils';
import * as OPFS from '@/store/fileSystem';
const store = useStore();

const ONCE = { once: true };

type CropperType = {
  //used methods / properties
  getCroppedCanvas: (data: unknown) => HTMLCanvasElement;
  destroy: () => unknown;
  getData: () => unknown;
  //custom methods / properties
  init?: () => unknown;
  customdestroy?: () => unknown;
};

let showSpinner = ref(false);
const width = computed<number>(() => store.state.photoEditor.cropperData.width);
const height = computed<number>(() => store.state.photoEditor.cropperData.height);
const image = new Image();
const croppedImage = new Image();
let ctx: CanvasRenderingContext2D;
let canvas = ref<HTMLCanvasElement>();
function getCanvas() {
  return canvas.value as HTMLCanvasElement;
}

function upload() {
  (document.querySelector('.el-upload input') as HTMLInputElement).click();
}

function initimage(event: Event) {
  const input = event.target as HTMLInputElement;
  image.onload = () => {
    showSpinner.value = false;
    store.commit('photoEditor/setCropperData', { width: image.width, height: image.height });
    aftermounted();
  };
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  OPFS.saveFile(file)
    .then((src) => {
      showSpinner.value = true;
      image.src = src;
    })
    .catch((error) => alert(error));
}

async function aftermounted() {
  getCanvas().addEventListener(
    'ready',
    async () => {
      await cropperchange(detail('customdestroy', []) as CustomEvent);
      window.addEventListener('photoEditor/alterphoto', () => alterphoto());
      window.addEventListener('photoEditor/cropperchange', (e) => cropperchange(e as CustomEvent));
      showSpinner.value = false;
    },
    ONCE,
  );
  cropperchange(detail('init', []) as CustomEvent);
}

function alterphoto(tempCanvas: HTMLCanvasElement | HTMLImageElement = croppedImage, filters = true) {
  ctx.filter = filters ? store.getters['photoEditor/alleditsmerged'] : '';
  ctx.drawImage(tempCanvas, 0, 0);
}

let cropper = {} as CropperType;

async function initcropper() {
  getCanvas().width = image.naturalWidth;
  getCanvas().height = image.naturalHeight;
  getCanvas().style.aspectRatio = image.naturalWidth + ' / ' + image.naturalHeight;
  alterphoto(image, false);
  cropper = new Cropper(getCanvas(), {
    initialAspectRatio: width.value / height.value,
    autoCropArea: 1,
    dragMode: 'move',
    movable: false,
    zoomable: false,
    data: store.state.photoEditor.cropperData,
  }) as CropperType;
  cropperchange(detail('setAspectRatio', [width.value / height.value]) as CustomEvent);

  cropper.customdestroy = () =>
    new Promise<void>((resolve) => {
      store.commit('photoEditor/setcropperstatus', false);
      store.state.photoEditor.cropperData = cropper.getData();
      sessionStorage.setItem('cropperData', JSON.stringify(store.state.photoEditor.cropperData));
      croppedImage.addEventListener(
        'load',
        () => {
          getCanvas().width = width.value;
          getCanvas().height = height.value;
          getCanvas().style.aspectRatio = width.value + ' / ' + height.value;
          alterphoto();
          resolve();
        },
        ONCE,
      );
      croppedImage.src = cropper.getCroppedCanvas({ fillColor: '#fff' }).toDataURL('image/png', 1);
      cropper.destroy();
      cropper = {} as CropperType;
      cropper.init = initcropper;
    });
}

function cropperchange({ detail }: CustomEvent<{ func: string; args: unknown[] }>) {
  //eslint-disable-next-line
  // @ts-ignore
  if (cropper[detail.func]) cropper[detail.func](...detail.args);
}

function download({ detail }: CustomEvent<{ format: string; quality: number }>) {
  const readyimg = getCanvas().toDataURL('image/' + detail.format, detail.quality / 100);
  const a = document.createElement('a');
  a.download = 'img.' + detail.format;
  a.href = readyimg;
  a.click();
}

onMounted(async () => {
  ctx = getCanvas().getContext('2d') as CanvasRenderingContext2D;
  cropper.init = initcropper;
  if (store.state.photoEditor.fileReady) {
    showSpinner.value = true;
    image.onload = () => aftermounted();
    const src = await OPFS.loadFile();
    if (src == '' || !src) {
      alert(
        'failed to retrieve your image. You browser probably does not fully support the File System API. Please start over or try again.',
      );
      showSpinner.value = false;
      store.commit('photoEditor/clearModule');
      return;
    }
    image.src = src;
  }
  window.addEventListener('photoEditor/download', (e) => download(e as CustomEvent));
});

onBeforeUnmount(() => {
  window.removeEventListener('photoEditor/download', (e) => download(e as CustomEvent));
  window.removeEventListener('photoEditor/alterphoto', () => alterphoto());
  window.removeEventListener('photoEditor/cropperchange', (e) => cropperchange(e as CustomEvent));
});
</script>

<style scoped>
.container {
  @apply absolute right-0 bottom-0 h-full p-4 pt-20
  flex flex-col justify-center items-center max-w-none;
  width: calc(100% - theme('spacing.80'));
}
.canvas-container {
  @apply bg-white max-w-full max-h-[100vh] block;
}
.container canvas {
  @apply bg-white w-full h-full block;
}
@media (max-width: 650px) {
  .photo-con {
    @apply w-full h-3/5 top-0;
  }
}
.lds-dual-ring {
  display: block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--el-color-primary);
  border-color: var(--el-color-primary) transparent var(--el-color-primary) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
