import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

interface State {
  orginalsrc: string;
  fileReady: boolean;
  history: object[];
}
class Filterset {
  opacity: number;
  brightness: number;
  saturate: number;
  contrast: number;
  hueRotate: number;
  invert: number;
  sepia: number;
  grayscale: number;
  constructor() {
    this.opacity = 0;
    this.brightness = 0;
    this.saturate = 0;
    this.contrast = 0;
    this.hueRotate = 0;
    this.invert = 0;
    this.sepia = 0;
    this.grayscale = 0;
  }
}
export default new Vuex.Store({
  state: {
    orginalsrc: window.sessionStorage.orginalsrc || "",
    fileReady: window.sessionStorage.fileReady ? true : false,
    history: [],
    curfilter: new Filterset(),
    curset: new Filterset(),
  } as State,
  mutations: {
    initImage(state, src) {
      state.orginalsrc = src;
      state.fileReady = true;
      //console.log(src);
      window.sessionStorage.setItem("orginalsrc", src);
      window.sessionStorage.setItem("fileReady", "true");
    },
    updateHistory(state, log) {
      state.history.push(log);
    },
  },
  actions: {},
  modules: {},
});
