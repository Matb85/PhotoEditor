<template>
  <div class="cropper-options">
    <li>
      <a class="pb-0 aspect-ratios">
        <span>aspect ratio</span>
        <div class="is-mobile columns is-multiline py-2" style="margin: 0 auto">
          <b-radio-button
            v-for="btn in aspectRatiosBtns"
            :key="btn.key"
            v-model="curAspectRatio"
            :native-value="btn.val"
            type="is-primary"
            size="is-small"
            class="is-one-quarter mr-1 mb-1"
            >{{ btn.name }}
          </b-radio-button>
        </div>
      </a>
    </li>
    <li>
      <a class="pt-0">
        <span>rotate</span>
        <div class="py-2 is-relative " style="margin: 0 auto">
          <span class="reset has-text-weight-light is-size-7" @click="rotation = 0">reset</span>
          <b-slider
            v-model="rotation"
            :max="22.5"
            :min="-22.5"
            :step="0.5"
            size="is-small"
            class="mb-0 mt-1"
          ></b-slider>
        </div>
        <div class="columns is-multiline pt-2" style="margin: 0 auto">
          <b-button
            type="is-primary"
            outlined
            icon-left="rotate-right"
            size="is-small"
            class="mr-1 mb-1"
            @click="additionalrot += 90"
            >90°</b-button
          >
          <b-button
            type="is-primary"
            outlined
            icon-left="rotate-right"
            size="is-small"
            class="mr-1 mb-1"
            @click="additionalrot += 45"
            >45°</b-button
          >
          <b-button
            type="is-primary"
            outlined
            icon-left="flip-horizontal"
            size="is-small"
            class="mr-1 mb-1"
            @click="flip('X')"
            >flip h</b-button
          >
          <b-button type="is-primary" outlined icon-left="flip-vertical" size="is-small" @click="flip('Y')"
            >flip v</b-button
          >
        </div>
      </a>
    </li>
    <hr class="mt-0 mb-1" />
    <li>
      <a>
        <b-button type="is-danger" outlined icon-left="close" size="is-small" @click="reset">reset all</b-button>
      </a>
    </li>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

let id = 0;
class AspectRatiosBtn {
  id: number;
  name: string;
  val: number | string;
  constructor(name: string, val: number | string) {
    this.id = id;
    this.name = name;
    this.val = val;
    id++;
  }
}

@Component({
  data() {
    const anitialAR = this.$store.state.width / this.$store.state.height;
    return {
      anitialAR,
      curAspectRatio: anitialAR,
      aspectRatiosBtns: [
        new AspectRatiosBtn("18/9", 18 / 9),
        new AspectRatiosBtn("16/9", 16 / 9),
        new AspectRatiosBtn("3/2", 3 / 2),
        new AspectRatiosBtn("4/3", 4 / 3),
        new AspectRatiosBtn("1/1", 1),
        new AspectRatiosBtn("free", "free"),
        new AspectRatiosBtn("original", anitialAR),
      ],
      rotation: 0,
      additionalrot: 0,
      fliph: false,
      flipv: false,
    };
  },
})
export default class CropperOptions extends Vue {
  anitialAR: number;
  curAspectRatio: number;
  aspectRatiosBtns: Array<object>;
  rotation: number;
  additionalrot: number;
  flipX: boolean;
  flipY: boolean;

  @Watch("curAspectRatio") curAspectRatioWatcher(newval: number) {
    this.$root.$emit("cropperchange", "setAspectRatio", [newval]);
  }
  @Watch("rotation") rotationWatcher(newval: number) {
    this.$root.$emit("cropperchange", "rotateTo", [newval + this.additionalrot]);
  }
  @Watch("additionalrot") additionalrotWatcher() {
    if (this.additionalrot >= 360) this.additionalrot -= 360;
    this.$root.$emit("cropperchange", "rotateTo", [this.rotation + this.additionalrot]);
  }
  reset() {
    this.$root.$emit("cropperchange", "reset", []);
  }
  flip(axis: string) {
    const flipAxis = ("flip" + axis) as "flipX" | "flipY";
    this[flipAxis] = !this[flipAxis];
    this.$root.$emit("cropperchange", "scale" + axis, [this[flipAxis] ? -1 : 1]);
  }
}
</script>

<style lang="scss" scoped>
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
    grid-row: 1 /2;
    width: 40rem;
    max-height: calc(40vh - 8rem);
    display: flex;
    flex-direction: row;
    margin-top: -1em;
    > li > a {
      padding-top: 0.5em !important;
      &.aspect-ratios {
        width: 250px;
        margin-right: 0 !important;
      }
    }
    > li:last-of-type {
      position: relative;
      top: 50%;
      a {
        margin-right: 0 !important;
      }
    }
  }
}
</style>
