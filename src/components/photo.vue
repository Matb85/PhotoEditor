<template>
  <div class="photo-con">
    <div id="pixiCon">
      <canvas v-show="$store.state.fileReady" id="canvas" ref="canvas" width="630" height="420"></canvas>
    </div>
    <b-upload v-if="!$store.state.fileReady" @input="initimage($event)" accept=".jpg,.png" drag-drop>
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
export default {
  name: "photo",
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
        };
      };
      reader.readAsDataURL(event);
    },
    afterReload() {
      const src = this.$store.state.orginalsrc;
      const image = new Image();
      image.src = src;
      image.onload = () => {
        this.ctx.drawImage(image, 0, 0, 630, 420);
        this.image = this.ctx.getImageData(0, 0, 630, 420);
        this.alterphoto();
      };
    },
    alterphoto() {
      this.canvas.style.filter = this.$store.getters.alleditsmerged;
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.$root.$on("alterphoto", () => {
      this.alterphoto();
    });
    if (this.$store.state.fileReady) this.afterReload();
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
