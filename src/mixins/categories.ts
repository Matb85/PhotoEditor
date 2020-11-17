let id = 0;
class Option {
    id: number;
    name: string;
    func: string;
    val: any;
    constructor(name: string, func: string) {
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
                        new Slider("Constast", "adjust_contrast", 5, -1 * colordev, colordev),
                    ],
                },
                {
                    id: 2,
                    name: "Brightness",
                    sliders: [
                        new Slider("hsl", "lighten_hsl", ldStep, -0.8, 1),
                        new Slider("hsv", "lighten_hsv", ldStep, -0.8, 1),
                        new Slider("lch", "lighten_lch", ldStep, -0.8, 1),
                    ]
                },
                {
                    id: 4,
                    name: "Saturate",
                    sliders: [
                        new Slider("hsl", "saturate_hsl", ldStep, -1, 1),
                        new Slider("hsv", "saturate_hsv", ldStep, -1, 1),
                        new Slider("lch", "saturate_lch", ldStep, -1, 1),
                    ]
                },
                {
                    id: 5,
                    name: "Hue rotate",
                    sliders: [
                        new Slider("hsl", "hue_rotate_hsl", ldStep, -1, 1),
                        new Slider("hsv", "hue_rotate_hsv", ldStep, -1, 1),
                        new Slider("lch", "hue_rotate_lch", ldStep, -1, 1),
                    ]
                },
                {
                    id: 6,
                    name: "Grayscale",
                    sliders: [
                        new Slider("with shade count", "grayscale_shades", 1, 0, 50),
                    ],
                    checkboxes: [
                        new Option("Blue Channel", "b_grayscale"),
                        new Option("Green Channel", "g_grayscale"),
                        new Option("Red Channel", "r_grayscale"),
                        new Option("Human corrected", "grayscale_human_corrected"),
                    ]
                },
                {
                    id: 3,
                    name: "Monochrome",
                    sliders: [
                        new Slider("Threshold", "threshold", 5, 0, 300),
                    ],
                    checkboxes: [
                        new Option("Decompose max", "decompose_max"),
                        new Option("Decompose min", "decompose_min"),
                        new Option("Sepia", "sepia"),

                    ]
                },
                {
                    id: 7,
                    name: "Blur",
                    sliders: [
                        new Slider("Gaussian blur", "gaussian_blur", 1, 0, 100),
                    ],
                    checkboxes: [
                        new Option("Box blur", "box_blur"),
                    ]
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
                        new Option("tint", "tint"),
            
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
                    ]
                },
            ],
            filters: {
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
                ]
            }
        }
    },
}