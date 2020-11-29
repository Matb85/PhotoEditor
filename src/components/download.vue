<template>
  <div class="modal-card has-text-centered" style="width: 300px; margin: 0 auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Download</p>
    </header>
    <section class="modal-card-body">
      <p class="is-size-5 mb-3">image format</p>
      <div class="field">
        <b-radio v-model="format" name="name" native-value="jpeg">jpeg</b-radio>
      </div>
      <div class="field">
        <b-radio v-model="format" name="name" native-value="png">png</b-radio>
      </div>
      <p class="is-size-5 mb-3">image quality</p>
      <b-slider size="is-small" class="mt-2 mb-2" :min="30" :max="100" :step="1" v-model="quality"></b-slider>
    </section>
    <footer class="modal-card-foot is-justify-content-center">
      <button @click="download" class="button is-primary">Download</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "download",
  data() {
    return {
      format: "jpeg",
      quality: 75,
    };
  },
  methods: {
    download() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = this.$store.state.orginalsrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = this.$store.getters.alleditsmerged;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        console.log("image/" + this.format, this.quality);
        const readyimg = canvas.toDataURL("image/" + this.format, this.quality / 100);
        const a = document.createElement("a");
        a.download = "img." + this.format;
        a.href = readyimg;
        a.click();
      };
    },
  },
};
</script>
