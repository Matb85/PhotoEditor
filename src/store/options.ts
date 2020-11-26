let id = 0;
class Option {
  tech: string;
  id: number;
  name: string;
  func: string | object;
  val: any;
  constructor(name: string, func: string | object, tech = "photon") {
    this.tech = tech;
    this.id = id;
    id++;
    this.name = name;
    this.func = func;
    this.val = false;
  }
}
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
    this.val = 0;
  }
}
class CanvasSlider extends Slider {
  constructor(name: string, func: string, step: number, min: number, max: number) {
    super(name, func, step, min, max);
    this.tech = "canFil";
  }
}
function filterset(f: any) {
  return [
    f.opacity - 1 || 0,
    f.brightness - 1 || 0,
    f.hueRotate || 0,
    f.saturate - 1 || 0,
    f.contrast - 1 || 0,
    f.invert || 0,
    f.sepia || 0,
    f.grayscale || 0,
  ];
}

const colordev = 100;
const ldStep = 0.02;
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Colors",
          sliders: [
            new Slider("Blue Channel", "alter_blue_channel", 5, -1 * colordev, colordev),
            new Slider("Green Channel", "alter_green_channel", 5, -1 * colordev, colordev),
            new Slider("Red Channel", "alter_red_channel", 5, -1 * colordev, colordev),
            new Slider("Offset blue", "offset_blue", 5, -1 * colordev, colordev),
            new Slider("Offset green", "offset_green", 5, -1 * colordev, colordev),
            new Slider("Offset red", "offset_red", 5, -1 * colordev, colordev),
          ],
        },
        {
          id: 6,
          name: "Grayscale",
          sliders: [
            new CanvasSlider("regular", "grayscale", 0.01, 0, 1),
            new Slider("with shade count", "grayscale_shades", 1, 0, 50),
          ],
          checkboxes: [
            new Option("Blue Channel", "b_grayscale"),
            new Option("Green Channel", "g_grayscale"),
            new Option("Red Channel", "r_grayscale"),
            new Option("Human corrected", "grayscale_human_corrected"),
          ],
        },
        {
          id: 7,
          name: "Blur",
          sliders: [new Slider("Gaussian blur", "gaussian_blur", 1, 0, 100)],
        },
        {
          id: 7,
          name: "Effects",
          sliders: [
            new Slider("vertical strips", "vertical_strips", 1, 0, 50),
            new Slider("horizontal strips", "horizontal_strips", 1, 0, 50),
          ],
          checkboxes: [
            new Option("Noise reduction", "noise_reduction"),
            new Option("sharpen", "sharpen"),
            new Option("lofi", "lofi"),
            new Option("cali", "cali"),
            new Option("firenze", "firenze"),
            new Option("golden", "golden"),
            new Option("obsidian", "obsidian"),
            new Option("dramatic", "dramatic"),

            new Option("invert", "invert"),
            new Option("laplace", "laplace"),
            new Option("lix", "lix"),
            new Option("emboss", "emboss"),
            new Option("neue", "neue"),
            new Option("ryo", "ryo"),
            new Option("colorize", "colorize"),
            new Option("solarize", "solarize"),

            new Option("45 deg lines", "detect_45_deg_lines"),
            new Option("135 deg lines", "detect_135_deg_lines"),
            new Option("Horizontal lines", "detect_horizontal_lines"),
            new Option("Vertical lines", "detect_vertical_lines"),
            new Option("Edges", "edge_detection"),
            new Option("Edge one", "edge_one"),
            new Option("Primary", "primary"),
            new Option("Sobel horizontal", "sobel_horizontal"),
            new Option("Sobel vertical", "sobel_vertical"),
          ],
        },
      ],
      Pfilters: {
        checkboxes: [
          new Option("Oceanic", "oceanic"),
          new Option("islands", "islands"),
          new Option("marine", "marine"),
          new Option("seagreen", "seagreen"),
          new Option("flagblue", "flagblue"),
          new Option("liquid", "liquid"),
          new Option("diamante", "diamante"),
          new Option("radio", "radio"),
          new Option("twenties", "twenties"),
          new Option("rosetint", "rosetint"),
          new Option("mauve", "mauve"),
          new Option("bluechrome", "bluechrome"),
          new Option("vintage", "vintage"),
          new Option("perfume", "perfume"),
          new Option("serenity", "serenity"),
        ],
      },
      Ifilters: {
        checkboxes: [
          new Option("1977", filterset({ sepia: 0.5, hueRotate: 30, saturate: 1.4 }), "canFil"),
          new Option("aden", filterset({ sepia: 0.2, brightness: 1.15, saturate: 1.4 }), "canFil"),
          new Option("amaro", filterset({ sepia: 0.35, brightness: 1.2, contrast: 1.1, saturate: 1.43 }), "canFil"),
          new Option("ashby", filterset({ sepia: 0.5, contrast: 1.2, saturate: 1.8 }), "canFil"),
          new Option(
            "brannan",
            filterset({
              sepia: 0.4,
              brightness: 1.1,
              contrast: 1.25,
              saturate: 0.9,
              hueRotate: -2,
            }),
            "canFil"
          ),
          new Option("brooklyn", filterset({ sepia: 0.25, contrast: 1.25, brightness: 1.25, hueRotate: 5 }), "canFil"),
        ],
      },
    };
  },
};
