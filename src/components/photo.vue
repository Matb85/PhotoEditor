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
  </div>
</template>

<script>
let Photon = import("@silvia-odwyer/photon");

export default {
  name: "photo",
  data() {
    return {
      image: "",
    };
  },
  methods: {
    async drawImage() {
      this.ctx.putImageData(this.image, 0, 0, 630, 420);
    },
    initimage(event) {
      const src = URL.createObjectURL(event);
      const image = new Image();
      image.src = src;
      image.onload = () => {
        URL.revokeObjectURL(src);
        const canvas = document.createElement("CANVAS");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        if (!this.$store.state.fileReady) {
          this.$store.commit("initImage", canvas.toDataURL("image/jpeg", 0.7));
        }
        this.ctx.drawImage(image, 0, 0, 630, 420);
        this.image = this.ctx.getImageData(0, 0, 630, 420);
        // this.alterphoto("filter", "oceanic");
      };
    },
    afterReload() {
      const src = this.$store.state.orginalsrc;
      const image = new Image();
      image.src = src;
      image.onload = () => {
        this.ctx.drawImage(image, 0, 0, 630, 420);
        this.image = this.ctx.getImageData(0, 0, 630, 420);
        // this.alterphoto("filter", "oceanic");
      };
    },
    async alterphoto(func, val) {
      this.drawImage();
      if (val == false) return;
      const img = Photon.open_image(this.canvas, this.ctx);
      Photon[func](img, val);
      Photon.putImageData(this.canvas, this.ctx, img);
    },
    async savechange(option) {
      this.image = this.ctx.getImageData(0, 0, 630, 420);
      this.drawImage();
      this.$store.commit("updateHistory", {
        id: this.$store.state.history.length,
        name: option.name,
        func: option.func,
        val: option.val,
      });
    },
    async reset(option) {
      console.log(option);
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    Photon.then((result) => {
      Photon = result;
      console.dir(Photon);
      this.$root.$on("alterphoto", (func, val) => {
        this.alterphoto(func, val);
      });
      this.$root.$on("savechange", (option) => {
        this.savechange(option);
      });
      this.$root.$on("reset", (option) => {
        this.reset(option);
      });
      if (this.$store.state.fileReady) this.afterReload();
    }).catch((err) => console.log(err));
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

  #pixiCon #canvas {
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
