<template>
  <div class="photo-con">
    <div id="pixiCon">
      <canvas
        v-show="$store.state.fileReady"
        id="canvas"
        ref="canvas"
        width="630"
        height="420"
      ></canvas>
    </div>
    <b-upload
      v-if="!$store.state.fileReady"
      @input="initimage($event)"
      accept=".jpg,.png"
      drag-drop
    >
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
import photonMixin from "@/mixins/photonMixin";
import canvasMixin from "@/mixins/canvasMixin";
let Photon = import("@silvia-odwyer/photon");
export default {
  name: "photo",
  mixins: [photonMixin, canvasMixin],
  methods: {
    async drawImage() {
      this.ctx.putImageData(this.image, 0, 0);
    },
    initimage(event) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          if (!this.$store.state.fileReady) {
            this.$store.commit("initImage", reader.result);
          }
          this.ctx.drawImage(image, 0, 0, 630, 420);
          this.image = this.ctx.getImageData(0, 0, 630, 420);
          // this.alterphoto("filter", "oceanic");
        };
      };
      reader.readAsDataURL(event);
    },
    afterReload() {
      const src = this.$store.state.orginalsrc;
      const image = new Image();
      image.src = src;
      image.onload = () => {
        this.canvas.style.filter = `opacity(1) brightness(1) saturate(1) contrast(1) hue-rotate(0deg) invert(0) sepia(0) grayscale(0%)`;
        this.ctx.drawImage(image, 0, 0, 630, 420);
        this.image = this.ctx.getImageData(0, 0, 630, 420);
      };
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    Photon.then(result => {
      Photon = result;
      console.log(Photon);
      this.$root.$on("alterphoto", (tech, func, val) => {
        this[tech](func, val);
      });
      this.$root.$on("savechange", option => {
        this.savechange(option);
      });
      if (this.$store.state.fileReady) this.afterReload();
    }).catch(err => console.log(err));
  },
};
</script>

<style scoped lang="scss">
.photo-con {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 260px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    width: 420px;
    height: 280px;
  }
}
</style>
<!--
import * as PIXI from "pixi.js-legacy";


photo2() {
      const canvas = document.getElementById("canvas");
      const app = new PIXI.Application({
        width: 900,
        height: 600,
        view: canvas,
        antialias: true,
        resolution: 1,
        forceCanvas: true
      });
      app.loader.add("image", this.src).load(() => {
        const sprite = new PIXI.Sprite(app.loader.resources["image"].texture);
        sprite.width = 900;
        sprite.height = 600;
        app.stage.addChild(sprite);
      });
    },
    -->
