import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

interface State {
  orginalsrc: string,
  fileReady: boolean,
  history: object[],
}
export default new Vuex.Store({
  state: {
    orginalsrc: window.sessionStorage.orginalsrc || "",
    fileReady: window.sessionStorage.fileReady ? true : false,
    history: [],
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
  modules: {
  },
});
