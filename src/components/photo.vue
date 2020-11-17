<template>
  <div class="photo-con">
    <div id="pixiCon">
      <canvas id="canvas" ref="canvas" width="900" height="600"></canvas>
    </div>
  </div>
</template>

<script>
let Photon = import("@silvia-odwyer/photon");

export default {
  name: "photo",
  data() {
    return {
      src: require("@/assets/image.jpg"),
      image: new Image(),
      history: [],
    };
  },
  methods: {
    async drawImage() {
      const ctx = this.ctx;
      ctx.drawImage(this.image, 0, 0, 900, 600);
    },
    init() {
      this.canvas;
      this.image.onload = () => {
        this.drawImage();
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
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    Photon.then((result) => {
      Photon = result;
      this.image.src = this.src;
      this.init();
      console.dir(Photon);
      this.$root.$on("alterphoto", (func, val) => {
        this.alterphoto(func, val);
      });
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
