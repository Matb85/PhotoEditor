<template>
  <div class="photo-con">
    <div class="canvas-con">
      <canvas v-if="$store.state.fileReady" id="canvas" ref="canvas" :width="width" :height="height"></canvas>
    </div>
    <b-upload v-if="!$store.state.fileReady" @input="initimage($event)" accept=".jpg,.jpeg,.png" drag-drop>
      <section class="section">
        <div class="content has-text-centered">
          <b-icon icon="upload" size="is-large"></b-icon>
          <p>Drop your files here or click to upload</p>
        </div>
      </section>
    </b-upload>
  </div>
</template>

<script>
import croppermixin from "@/mixins/croppermixin.js";
export default {
  mixins: [croppermixin],
  name: "photo",
  data() {
    return {
      image: new Image(),
      canvas: HTMLElement,
      ctx: HTMLElement,
    };
  },
  computed: {
    width() {
      return this.$store.state.width;
    },
    height() {
      return this.$store.state.height;
    },
  },
  methods: {
    initimage(event) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image.onload = () => {
          this.$store
            .dispatch("initImage", { src: reader.result, width: this.image.width, height: this.image.height })
            .then(() => {
              this.aftermounted();
            });
        };
        this.image.src = reader.result;
      };
      reader.readAsDataURL(event);
    },
    aftermounted() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.$root.$on("alterphoto", () => {
        this.alterphoto();
      });
      this.$root.$on("cropperchange", (func, args) => {
        this.cropperchange(func, args);
      });
      this.afterReload();
    },
    afterReload() {
      const src = this.$store.state.orginalsrc;
      this.image.src = src;
      this.image.onload = () => {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
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
    },
    alterphoto() {
      this.canvas.style.filter = this.$store.getters.alleditsmerged;
    },
  },
  mounted() {
    if (this.$store.state.fileReady) this.aftermounted();
  },
};
</script>

<style lang="scss" scoped>
.photo-con {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 260px);
  height: calc(100% - 3.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  canvas {
    background-color: black;
    max-width: calc(100vw - 260px - 2rem);
    max-height: calc(100vh - 5.5rem);
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
