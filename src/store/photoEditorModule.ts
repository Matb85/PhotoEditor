import { Module } from "vuex";

interface State {
  orginalsrc: string;
  fileReady: boolean;
  curfilter: object;
  curfiltername: string;
  curset: object;
  width: number;
  height: number;
}
function init(f: any) {
  return {
    opacity: f.opacity || 0,
    brightness: f.brightness || 0,
    hueRotate: f.hueRotate || 0,
    saturate: f.saturate || 0,
    contrast: f.contrast || 0,
    invert: f.invert || 0,
    sepia: f.sepia || 0,
    grayscale: f.grayscale || 0,
    blur: f.blur || 0,
  };
}

export default {
  namespaced: true,
  state: {
    orginalsrc: sessionStorage.orginalsrc || "",
    width: sessionStorage.width,
    height: sessionStorage.height,
    fileReady: sessionStorage.fileReady ? true : false,
    curfiltername: "default",
    curfilter: sessionStorage.curfilter ? JSON.parse(sessionStorage.curfilter) : init({}),
    curset: sessionStorage.curset ? JSON.parse(sessionStorage.curset) : init({ opacity: 100 }),
  },
  mutations: {
    applyfilter(state, filter) {
      state.curfilter = filter;
      sessionStorage.curfilter = JSON.stringify(filter);
    },
    updatesettings(state, newset) {
      state.curset = newset;
      sessionStorage.curset = JSON.stringify(newset);
    },
    resetStore(state) {
      Object.assign(state, {
        orginalsrc: "",
        width: null,
        height: null,
        fileReady: false,
        curfiltername: "default",
        curfilter: init({}),
        curset: init({ opacity: 100 }),
      });
      for (const i in state) {
        sessionStorage.removeItem(i);
      }
    },
  },
  actions: {
    applyfilter(context, filter) {
      const base: any = init(filter);
      console.log(base);
      context.commit("applyfilter", base);
    },
    updatesettings(context, { func, val }) {
      const settings: any = Object.assign(context.state.curset);
      settings[func] = val;
      context.commit("updatesettings", settings);
    },
    initImage({ state }, { src, width, height }) {
      state.fileReady = true;
      state.orginalsrc = src;
      state.width = width;
      state.height = height;
      sessionStorage.setItem("width", width);
      sessionStorage.setItem("height", height);
      sessionStorage.setItem("fileReady", "true");
      sessionStorage.setItem("orginalsrc", src);
    },
  },
  getters: {
    //all edits merged together
    alleditsmerged(state) {
      const f: any = state.curfilter;
      const s: any = state.curset;
      return `
      brightness(${100 + f.brightness + s.brightness}%)
      hue-rotate(${f.hueRotate + s.hueRotate}deg)
      saturate(${100 + f.saturate + s.saturate}%)
      contrast(${100 + f.contrast + s.contrast}%)
      invert(${f.invert + s.invert}%)
      sepia(${f.sepia + s.sepia}%)
      grayscale(${f.grayscale + s.grayscale}%)
      blur(${f.blur + s.blur}px)
      opacity(${f.opacity + s.opacity}%)
      `;
    },
  },
  modules: {},
} as Module<State, State>;
