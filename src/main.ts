import photoEditor from "./components/photoEditor.vue";

export default photoEditor;

// What should happen if the user installs the library as a plugin
function install(Vue: any, { store }: { store: any }) {
  Vue.component("photoEditor", photoEditor);
}

// Export the library as a plugin
export { install };

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}
