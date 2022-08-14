<template>
  <div class="photo-con">
    <canvas v-show="store.state.photoEditor.fileReady" ref="canvas" :width="width" :height="height"></canvas>
    <ElUpload v-if="!store.state.photoEditor.fileReady" @input="initimage" accept=".jpg,.jpeg,.png" drag>
      <section class="section">
        <div class="content has-text-centered">
          <p>Drop your files here or click to upload</p>
        </div>
      </section>
    </ElUpload>
  </div>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { ElUpload } from 'element-plus';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { detail } from '../utils';
const store = useStore();

type CropperType = {
  //used methods / properties
  getCroppedCanvas: (data: unknown) => HTMLCanvasElement;
  destroy: () => unknown;
  getData: () => unknown;
  //custom methods / properties
  init?: () => unknown;
  customdestroy?: () => unknown;
};

const width = computed<number>(() => store.state.photoEditor.width);
const height = computed<number>(() => store.state.photoEditor.height);
const image = new Image();

let ctx: CanvasRenderingContext2D;
let canvas = ref<HTMLCanvasElement>();
function getCanvas() {
  return canvas.value as HTMLCanvasElement;
}

function initimage(event: InputEvent) {
  const input = event.target as HTMLInputElement;
  const reader = new FileReader();
  reader.onload = () => {
    image.onload = () => {
      store.commit('photoEditor/initImage', {
        src: reader.result,
        width: image.width,
        height: image.height,
      });
      aftermounted();
    };
    image.src = reader.result as string;
  };
  if (input.files) reader.readAsDataURL(input.files[0]);
}

function aftermounted() {
  ctx = getCanvas().getContext('2d') as CanvasRenderingContext2D;
  window.addEventListener('photoEditor/alterphoto', () => alterphoto());
  window.addEventListener('photoEditor/cropperchange', (e) => cropperchange(e as CustomEvent));
  afterReload();
}
function afterReload() {
  image.src = store.state.photoEditor.orginalsrc;
  image.onload = () => {
    alterphoto();
    console.log('afterReload', sessionStorage.getItem('cropperData'));

    if (sessionStorage.getItem('cropperData')) {
      getCanvas().addEventListener('ready', () => cropperchange(detail('customdestroy', []) as CustomEvent), {
        once: true,
      });
      cropperchange(detail('init', []) as CustomEvent);
    }
  };
}
function alterphoto() {
  ctx.filter = store.getters['photoEditor/alleditsmerged'];
  ctx.drawImage(image, 0, 0, width.value, height.value);
}

let cropper = {} as CropperType;
let cropperData = sessionStorage.cropperData ? JSON.parse(sessionStorage.cropperData) : {};

function drawImage(
  { width, height }: { width: number; height: number },
  tempCanvas: HTMLCanvasElement | HTMLImageElement
) {
  getCanvas().width = width;
  getCanvas().height = height;
  ctx.drawImage(tempCanvas, 0, 0);
}
async function initcropper() {
  drawImage({ width: width.value, height: height.value }, image);
  cropper = new Cropper(getCanvas(), {
    initialAspectRatio: width.value / height.value,
    autoCropArea: 1,
    dragMode: 'move',
    movable: false,
    zoomable: false,
    data: cropperData,
  }) as CropperType;
  cropper.customdestroy = () => {
    console.log('customdestroy');
    cropperData = cropper.getData();
    sessionStorage.setItem('cropperData', JSON.stringify(cropperData));
    drawImage(cropperData, cropper.getCroppedCanvas({ fillColor: '#fff' }));
    cropper.destroy();
    cropper.init = initcropper;
  };
}
function cropperchange(e: CustomEvent) {
  const { func, args }: { func: string; args: unknown[] } = e.detail;
  console.log(func, args);
  //eslint-disable-next-line
  // @ts-ignore
  cropper[func](...args);
}
function download(e: CustomEvent) {
  const { format, quality }: { format: string; quality: number } = (e as CustomEvent).detail;
  const tempCanvas = document.createElement('canvas');
  const ctx = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
  tempCanvas.width = getCanvas().width;
  tempCanvas.height = getCanvas().height;
  ctx.filter = store.getters['photoEditor/alleditsmerged'];
  ctx.drawImage(getCanvas(), 0, 0);
  const readyimg = tempCanvas.toDataURL('image/' + format, quality / 100);
  const a = document.createElement('a');
  a.download = 'img.' + format;
  a.href = readyimg;
  a.click();
}

onMounted(() => {
  cropper.init = initcropper;
  if (store.state.photoEditor.fileReady) aftermounted();

  window.addEventListener('photoEditor/download', (e) => download(e as CustomEvent));
});
onBeforeUnmount(() => {
  window.removeEventListener('photoEditor/download', (e) => download(e as CustomEvent));
  window.removeEventListener('photoEditor/alterphoto', () => alterphoto());
  window.removeEventListener('photoEditor/cropperchange', (e) => cropperchange(e as CustomEvent));
});
</script>

<style scoped>
.photo-con {
  @apply absolute right-0 bottom-0 h-full p-4 pt-20
  flex justify-center items-center;
  width: calc(100% - theme('spacing.80'));
}
.photo-con canvas {
  background-color: white;
  max-width: 100%;
  max-height: 100%;
  display: block;
}
@media (max-width: 650px) {
  .photo-con {
    width: 100%;
    height: 60%;
    top: 0;
  }
}
</style>
