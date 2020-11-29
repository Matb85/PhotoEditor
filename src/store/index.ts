import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

interface State {
  orginalsrc: string;
  fileReady: boolean;
  curfilter: object;
  curfiltername: string;
  curset: object;
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
  };
}
export default new Vuex.Store({
  state: {
    orginalsrc: sessionStorage.orginalsrc || "",
    fileReady: sessionStorage.fileReady ? true : false,
    curfiltername: "default",
    curfilter: sessionStorage.curfilter ? JSON.parse(sessionStorage.curfilter) : init({}),
    curset: sessionStorage.curset ? JSON.parse(sessionStorage.curset) : init({ opacity: 100 }),
  } as State,
  mutations: {
    initImage(state, src) {
      state.orginalsrc = src;
      state.fileReady = true;
      //console.log(src);
      sessionStorage.setItem("orginalsrc", src);
      sessionStorage.setItem("fileReady", "true");
    },
    applyfilter(state, filter) {
      state.curfilter = filter;
      sessionStorage.curfilter = JSON.stringify(filter);
    },
    updatesettings(state, newset) {
      state.curset = newset;
      sessionStorage.curset = JSON.stringify(newset);
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
  },
  getters: {
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
      opacity(${f.opacity + s.opacity}%)
      `;
    },
  },
  modules: {},
});
