let id = 0;
class Option {
  id: number;
  name: string;
  func: string | object;
  constructor(name: string, func: string | object) {
    this.id = id;
    id++;
    this.name = name;
    this.func = func;
  }
}

export default {
  data(): any {
    const curset = this.$store.state.curset;
    class Slider extends Option {
      step: number;
      min: number;
      max: number;
      val: number;
      constructor(name: string, func: string, step: number, min: number, max: number) {
        super(name, func);
        this.step = step;
        this.min = min;
        this.max = max;
        this.val = curset[func];
      }
    }
    return {
      options: [
        new Slider("brightness", "brightness", 1, -100, 100),
        new Slider("saturate", "saturate", 1, -100, 100),
        new Slider("contrast", "contrast", 1, -100, 100),
        new Slider("hue-rotate", "hueRotate", 1, 0, 360),
        new Slider("opacity", "opacity", 1, 0, 100),
      ],
      effects: [
        new Slider("invert", "invert", 1, 0, 100),
        new Slider("grayscale", "grayscale", 1, 0, 100),
        new Slider("sepia", "sepia", 1, 0, 100),
        new Slider("blur", "blur", 1, 0, 50),
      ],
      filters: [
        new Option("default", {}),
        new Option("1977", { sepia: 50, hueRotate: -30, saturate: 40 }),
        new Option("aden", { sepia: 20, brightness: 15, saturate: 40 }),
        new Option("amaro", { sepia: 35, contrast: 10, brightness: 20, saturate: 30 }),
        new Option("ashby", { sepia: 50, contrast: 20, saturate: 80 }),
        new Option("brannan", {
          sepia: 40,
          contrast: 25,
          brightness: 10,
          saturate: -10,
          hueRotate: -2,
        }),
        new Option("brooklyn", { sepia: 25, contrast: 25, brightness: 25, hueRotate: 5 }),
        new Option("charmes", { sepia: 25, contrast: 25, brightness: 25, saturate: 35, hueRotate: -5 }),
        new Option("clarendon", { sepia: 15, contrast: 25, brightness: 25, hueRotate: 5 }),
        new Option("crema", { sepia: 50, contrast: 25, brightness: 15, saturate: -0.1, hueRotate: -2 }),
        new Option("dogpatch", { sepia: 35, saturate: 10, contrast: 50 }),
        new Option("earlybird", { sepia: 25, contrast: 25, brightness: 15, saturate: -10, hueRotate: -5 }),
        new Option("gingham", { contrast: 10, brightness: 10 }),
        new Option("ginza", { sepia: 25, contrast: 15, brightness: 20, saturate: 35, hueRotate: -5 }),
        new Option("hefe", { sepia: 40, contrast: 50, brightness: 20, saturate: 40, hueRotate: -10 }),
        new Option("helena", { sepia: 50, contrast: 5, brightness: 5, saturate: 35 }),
        new Option("hudson", { sepia: 25, contrast: 20, brightness: 20, saturate: 5, hueRotate: -15 }),
        new Option("inkwell", { contrast: -15, brightness: 25, grayscale: 100 }),
        new Option("juno", { sepia: 35, contrast: 15, brightness: 15, saturate: 80 }),
        new Option("kelvin", { sepia: 15, contrast: 50, brightness: 10, hueRotate: -10 }),
        new Option("lark", { sepia: 25, contrast: 20, brightness: 30, saturate: 25 }),
        new Option("lofi", { saturate: 10, contrast: 50 }),
        new Option("ludwig", { sepia: 15, contrast: 50, brightness: 10, hueRotate: -10 }),
        new Option("maven", { sepia: 35, contrast: 5, brightness: 5, saturate: 75 }),
        new Option("mayfair", { contrast: 10, brightness: 15, saturate: 10 }),
        new Option("moon", { sepia: 35, contrast: -5, brightness: 40, saturate: 0 }),
        new Option("nashville", { sepia: 25, contrast: 50, brightness: -10, hueRotate: -15 }),
        new Option("perpetua", { contrast: 10, brightness: 25, saturate: 10 }),
        new Option("poprocket", { sepia: 15, brightness: 20 }),
        new Option("reyes", { sepia: 75, contrast: -25, brightness: 25, saturate: 40 }),
        new Option("rise", { sepia: 25, contrast: 25, brightness: 20, saturate: -10 }),
        new Option("sierra", { sepia: 25, contrast: 50, brightness: -10, hueRotate: -15 }),
        new Option("skyline", { sepia: 15, contrast: 25, brightness: 25, saturate: 20 }),
        new Option("slumber", { sepia: 35, contrast: 25, saturate: 25 }),
        new Option("stinson", { sepia: 35, contrast: 25, brightness: 10, saturate: 25 }),
        new Option("sutro", { sepia: 40, contrast: 20, brightness: -10, saturate: 40, hueRotate: -10 }),
        new Option("toaster", { sepia: 25, contrast: 50, brightness: -5, hueRotate: -15 }),
        new Option("valencia", { sepia: 25, contrast: 10, brightness: 10 }),
        new Option("vesper", { sepia: 35, contrast: 15, brightness: 20, saturate: 30 }),
        new Option("walden", { sepia: 35, contrast: -20, brightness: 25, saturate: 40 }),
        new Option("willow", { sepia: 20, contrast: -15, brightness: 20, saturate: -5 }),
        new Option("x-pro II", { sepia: 45, contrast: 25, brightness: 75, saturate: 30, hueRotate: -5 }),
      ],
    };
  },
};
