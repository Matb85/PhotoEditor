import { Component, Vue } from "vue-property-decorator";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

type CropperType = {
  //used methods / properties
  getCroppedCanvas: Function;
  destroy: Function;
  getData: Function;
  //custom methods / properties
  init?: Function;
  customdestroy?: Function;
};
export type CropperProps = keyof CropperType;

@Component
export default class CropperSetup extends Vue {
  $refs!: {
    canvas: HTMLCanvasElement;
  };
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  cropper = {} as CropperType;
  iscropperopen = false;
  cropperData = sessionStorage.cropperData ? JSON.parse(sessionStorage.cropperData) : {};

  drawImage({ width, height }: { width: number; height: number }, canvas: HTMLCanvasElement | HTMLImageElement) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.drawImage(canvas, 0, 0);
  }
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
    this.cropper.customdestroy = () => {
      this.cropperData = this.cropper.getData();
      sessionStorage.setItem("cropperData", JSON.stringify(this.cropperData));
      this.drawImage(this.cropperData, this.cropper.getCroppedCanvas({ fillColor: "#fff" }));
      this.cropper.destroy();
      this.cropper.init = this.initcropper;
    };
  }
  cropperchange(func: CropperProps, args: Array<string>) {
    this.cropper[func]!(...args);
  }
  download(format: number, quality: number) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;
    ctx.filter = this.$store.getters["photoEditor/alleditsmerged"];
    ctx.drawImage(this.canvas, 0, 0);
    const readyimg = canvas.toDataURL("image/" + format, quality / 100);
    const a = document.createElement("a");
    a.download = "img." + format;
    a.href = readyimg;
    a.click();
  }

  mounted() {
    this.$root.$on("download", (format: number, quality: number) => {
      this.download(format, quality);
    });
    this.cropper.init = this.initcropper;
  }
}
