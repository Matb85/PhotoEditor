import Cropper from "cropperjs";
export default {
  data() {
    return {
      iscropperopen: false,
      cropper: {},
      cropperData: sessionStorage.croppperData ? JSON.parse(sessionStorage.croppperData) : {},
    };
  },
  methods: {
    drawImage({ width, height }, canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.drawImage(canvas, 0, 0);
    },
    async initcropper() {
      this.drawImage({ width: this.width, height: this.height }, this.image);
      this.cropper = new Cropper(this.canvas, {
        initialAspectRatio: this.width / this.height,
        autoCropArea: 1,
        dragMode: "move",
        movable: false,
        zoomable: false,
        data: this.cropperData,
      });
      this.iscropperopen = true;
      this.cropper.customdestroy = () => {
        this.cropperData = this.cropper.getData();
        sessionStorage.setItem("croppperData", JSON.stringify(this.cropperData));
        this.drawImage(this.cropperData, this.cropper.getCroppedCanvas({ fillColor: "#fff" }));
        this.cropper.destroy();
        this.cropper.init = this.initcropper;
        this.iscropperopen = false;
      };
    },
    cropperchange(func, args) {
      this.cropper[func](...args);
    },
    download(format, quality) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = this.canvas.width;
      canvas.height = this.canvas.height;
      ctx.filter = this.$store.getters.alleditsmerged;
      ctx.drawImage(this.canvas, 0, 0);
      const readyimg = canvas.toDataURL("image/" + format, quality / 100);
      const a = document.createElement("a");
      a.download = "img." + format;
      a.href = readyimg;
      a.click();
    },
  },
  mounted() {
    this.$root.$on("download", (format, quality) => {
      this.download(format, quality);
    });
    this.cropper.init = this.initcropper;
  },
};
