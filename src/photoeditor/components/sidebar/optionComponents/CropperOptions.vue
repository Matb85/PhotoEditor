<template>
  <ElMenuItem class="flex-col !h-auto" index="1">
    <span class="w-full -mb-2">Actions</span>
    <div class="w-full flex flex-wrap gap-1">
      <ElButton type="primary" size="small" @click="start" :disabled="store.state.photoEditor.isCropperOpen"
        >Start</ElButton
      >
      <ElButton type="primary" size="small" @click="save" :disabled="!store.state.photoEditor.isCropperOpen"
        >Save</ElButton
      >
      <ElButton plain type="danger" size="small" @click="reset" :disabled="!store.state.photoEditor.isCropperOpen"
        >Reset</ElButton
      >
    </div>
  </ElMenuItem>
  <ElMenuItem class="flex-col !h-auto" index="1">
    <span class="w-full -mb-2">aspect ratio</span>
    <div class="w-full flex flex-wrap gap-1">
      <ElButton
        v-for="btn in aspectRatiosBtns"
        :disabled="!store.state.photoEditor.isCropperOpen"
        :key="btn.key"
        :plain="btn.val != curAspectRatio"
        @click="curAspectRatio = btn.val"
        type="primary"
        size="small"
        >{{ btn.name }}
      </ElButton>
    </div>
  </ElMenuItem>
  <ElMenuItem class="flex-col !h-auto" index="1">
    <div class="w-full flex justify-between -mb-2">
      <span>rotate</span>
      <span class="font-thin" @click="rotation = 0">reset</span>
    </div>
    <ElSlider
      :disabled="!store.state.photoEditor.isCropperOpen"
      v-model="rotation"
      :max="22.5"
      :min="-22.5"
      :step="0.5"
      size="small"
    ></ElSlider>
    <div class="w-full flex flex-wrap gap-1 pt-2">
      <ElButton
        :disabled="!store.state.photoEditor.isCropperOpen"
        plain
        type="primary"
        size="small"
        @click="additionalrot += 90"
        >90°</ElButton
      >
      <ElButton
        :disabled="!store.state.photoEditor.isCropperOpen"
        plain
        type="primary"
        size="small"
        @click="additionalrot += 45"
        >45°</ElButton
      >
      <ElButton :disabled="!store.state.photoEditor.isCropperOpen" plain type="primary" size="small" @click="flip('X')"
        >flip h</ElButton
      >
      <ElButton :disabled="!store.state.photoEditor.isCropperOpen" plain type="primary" size="small" @click="flip('Y')"
        >flip v</ElButton
      >
    </div>
  </ElMenuItem>
</template>

<script setup lang="ts">
import { detail } from '../../../utils';
import { ElButton, ElSlider, ElMenuItem } from 'element-plus';
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

let id = 0;
class AspectRatiosBtn {
  key: number;
  name: string;
  val: number | string;
  constructor(name: string, val: number | string) {
    this.key = id;
    this.name = name;
    this.val = val;
    id++;
  }
}

const initialAR = computed(
  () => store.state.photoEditor.cropperData.width / store.state.photoEditor.cropperData.height
);

let curAspectRatio = ref<string | number>(initialAR.value);
let aspectRatiosBtns = [
  new AspectRatiosBtn('18/9', 18 / 9),
  new AspectRatiosBtn('16/9', 16 / 9),
  new AspectRatiosBtn('3/2', 3 / 2),
  new AspectRatiosBtn('4/3', 4 / 3),
  new AspectRatiosBtn('1/1', 1),
  new AspectRatiosBtn('free', 'free'),
  new AspectRatiosBtn('original', initialAR.value),
];
const rotation = ref(0);
const additionalrot = ref(0);
let flipState = {
  X: false,
  Y: false,
};

watch(curAspectRatio, (newval: number | string) => {
  window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('setAspectRatio', [newval])));
});
watch(rotation, (newval: number) => {
  window.dispatchEvent(
    new CustomEvent('photoEditor/cropperchange', detail('rotateTo', [newval + additionalrot.value]))
  );
});
watch(additionalrot, () => {
  if (additionalrot.value >= 360) additionalrot.value -= 360;
  window.dispatchEvent(
    new CustomEvent('photoEditor/cropperchange', detail('rotateTo', [rotation.value + additionalrot.value]))
  );
});

function reset() {
  window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('reset', [])));
}
function start() {
  window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('init', [])));
  store.commit('photoEditor/setcropperstatus', true);
}
function save() {
  window.dispatchEvent(new CustomEvent('photoEditor/cropperchange', detail('customdestroy', [])));
}
function flip(axis: 'X' | 'Y') {
  flipState[axis] = !flipState[axis];
  window.dispatchEvent(
    new CustomEvent('photoEditor/cropperchange', detail('scale' + axis, [flipState[axis] ? -1 : 1]))
  );
}
function disableOptions(e: CustomEvent) {
  const { func }: { func: string } = e.detail;
  if (func == 'customdestroy') store.commit('photoEditor/setcropperstatus', false);
}
onMounted(() => window.addEventListener('photoEditor/cropperchange', (e) => disableOptions(e as CustomEvent)));
onBeforeUnmount(() => window.removeEventListener('photoEditor/cropperchange', (e) => disableOptions(e as CustomEvent)));
</script>

<style scoped>
li a:hover {
  background-color: #fff;
}
.reset {
  margin-top: -1rem;
}
@media (max-width: 650px) {
  .cropper-options {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    grid-row: 0.5;
    width: 40rem;
    max-height: calc(40vh - 8rem);
    display: flex;
    flex-direction: row;
    margin-top: -1em;
  }
  .cropper-options > li > a {
    padding-top: 0.5em !important;
  }
  .cropper-options > li > a.aspect-ratios {
    width: 250px;
    margin-right: 0 !important;
  }
  .cropper-options > li:last-of-type {
    position: relative;
    top: 50%;
  }
  .cropper-options > li:last-of-type a {
    margin-right: 0 !important;
  }
}
</style>
