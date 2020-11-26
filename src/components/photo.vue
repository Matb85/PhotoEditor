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
let Photon = import("@silvia-odwyer/photon");

export default {
  name: "photo",
  data() {
    const workers = [];
    for (let i = 0; i < 3; i++) {
      const worker = new Worker("@/photonWorker.js", { type: "module" });
      const send = message =>
        worker.postMessage({
          message,
        });
      worker.addEventListener("message", event => {
        this.queue.splice(0, 1);
        this.ctx.putImageData(
          new ImageData(
            event.data.message.data,
            event.data.message.width,
            event.data.message.height
          ),
          0,
          0
        );
      });
      workers.push({
        worker: worker,
        send: send,
      });
    }
    return {
      workers,
      image: "",
      curworker: 0,
      queue: [],
    };
  },
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
    async alterphoto(func, val) {
      this.queue.unshift(val);
      if (this.queue.length > 7) {
        this.queue.splice(1, 1);
        this.queue.splice(3, 1);
        this.queue.splice(5, 1);
      }
      //console.log(this.queue);
      if (this.curworker > 2) this.curworker = 0;
      this.workers[this.curworker].send({
        img: this.image,
        func: func,
        val: this.queue[0],
      });
      this.curworker++;
    },
    async filter() {
      this.canvas.style.filter = `opacity(1) brightness(1) hue-rotate(180deg) saturate(1) contrast(3) invert(1) sepia(0.1) grayscale(10%)`;
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
    Photon.then(result => {
      Photon = result;
      console.log(Photon);
      this.$root.$on("alterphoto", (func, val) => {
        this["filter"](func, val);
      });
      this.$root.$on("savechange", option => {
        this.savechange(option);
      });
      this.$root.$on("reset", option => {
        this.reset(option);
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
