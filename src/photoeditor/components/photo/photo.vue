<template>
  <section class="container">
    <div class="canvas-container">
      <canvas v-show="store.state.photoEditor.fileReady" ref="canvas"></canvas>
    </div>
    <ElUpload v-if="!store.state.photoEditor.fileReady" @input="initimage" accept=".jpg,.jpeg,.png" drag>
      <p>Drop your file here or click to upload</p>
    </ElUpload>
  </section>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { ElUpload } from 'element-plus';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { detail } from '../utils';
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

const width = computed<number>(() => store.state.photoEditor.cropperData.width);
const height = computed<number>(() => store.state.photoEditor.cropperData.height);
const image = new Image();
const croppedImage = new Image();
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

async function aftermounted() {
  ctx = getCanvas().getContext('2d') as CanvasRenderingContext2D;
  image.src = store.state.photoEditor.orginalsrc;
  image.onload = () => {
    getCanvas().addEventListener(
      'ready',
      async () => {
        await cropperchange(detail('customdestroy', []) as CustomEvent);
        window.addEventListener('photoEditor/alterphoto', () => alterphoto());
        window.addEventListener('photoEditor/cropperchange', (e) => cropperchange(e as CustomEvent));
      },
      ONCE
    );
    cropperchange(detail('init', []) as CustomEvent);
  };
}

function alterphoto(tempCanvas: HTMLCanvasElement | HTMLImageElement = croppedImage, filters = true) {
  ctx.filter = filters ? store.getters['photoEditor/alleditsmerged'] : '';
  ctx.drawImage(tempCanvas, 0, 0);
}

let cropper = {} as CropperType;

async function initcropper() {
  getCanvas().width = image.naturalWidth;
  getCanvas().height = image.height;
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
          alterphoto();
          resolve();
        },
        ONCE
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
.container {
  @apply absolute right-0 bottom-0 h-full p-4 pt-20
  flex justify-center items-center;
  width: calc(100% - theme('spacing.80'));
}
.canvas-container {
  @apply bg-white max-w-full max-h-full block;
}
.container canvas {
  @apply bg-white w-full h-full block;
}
@media (max-width: 650px) {
  .photo-con {
    @apply w-full h-3/5 top-0;
  }
}
</style>
