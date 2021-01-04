<template>
  <div class="photo-con">
    <canvas
      v-show="$store.state.photoEditor.fileReady"
      id="canvas"
      ref="canvas"
      :width="width"
      :height="height"
    ></canvas>
    <b-upload v-if="!$store.state.photoEditor.fileReady" @input="initimage($event)" accept=".jpg,.jpeg,.png" drag-drop>
      <section class="section">
        <div class="content has-text-centered">
          <b-icon icon="upload" size="is-large"></b-icon>
          <p>Drop your files here or click to upload</p>
        </div>
      </section>
    </b-upload>
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";

import CropperSetup, { CropperProps } from "./cropperSetup";

@Component
export default class Photo extends Mixins(CropperSetup) {
  image = new Image();
  get width() {
    return this.$store.state.photoEditor.width;
  }
  get height() {
    return this.$store.state.photoEditor.height;
  }

  initimage(event: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.image.onload = () => {
        this.$store.commit("photoEditor/initImage", {
          src: reader.result,
          width: this.image.width,
          height: this.image.height,
        });
        this.aftermounted();
      };
      this.image.src = reader.result as string;
    };
    reader.readAsDataURL(event);
  }
  aftermounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.$root.$on("photoEditor/alterphoto", () => {
      this.alterphoto();
    });
    this.$root.$on("photoEditor/cropperchange", (func: CropperProps, args: Array<string>) => {
      this.cropperchange(func, args);
    });
    this.afterReload();
  }
  afterReload() {
    this.image.src = this.$store.state.photoEditor.orginalsrc;
    this.image.onload = () => {
      this.alterphoto();
      if (sessionStorage.croppperData) {
        this.cropperchange("init", []);
        this.canvas.addEventListener(
          "ready",
          () => {
            this.cropperchange("customdestroy", []);
          },
          { once: true }
        );
      }
    };
  }
  alterphoto() {
    this.ctx.filter = this.$store.getters["photoEditor/alleditsmerged"];
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }
  mounted() {
    if (this.$store.state.photoEditor.fileReady) this.aftermounted();
  }
}
</script>

<style lang="scss" scoped>
.photo-con {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 260px);
  height: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  canvas {
    background-color: white;
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
}
@media (max-width: 650px) {
  .photo-con {
    width: 100%;
    height: 60%;
    top: 3.5em;
    canvas {
      background-color: black;
      max-width: calc(100vw - 0.5rem);
      max-height: calc(60vh - 2rem);
      display: block;
    }
  }
}
</style>
