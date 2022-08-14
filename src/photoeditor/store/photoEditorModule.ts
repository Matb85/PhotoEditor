import { Module } from 'vuex';

interface State {
  orginalsrc: string;
  fileReady: boolean;
  curfilter: FilterI;
  curfiltername: string;
  curset: FilterI;
  width?: string;
  height?: string;
  cropperData: { width: number; height: number };
}
interface FilterI {
  opacity: number;
  brightness: number;
  hueRotate: number;
  saturate: number;
  contrast: number;
  invert: number;
  sepia: number;
  grayscale: number;
  blur: number;
}
export type FilterProtoI = Partial<FilterI>;

function init(f: FilterProtoI): FilterI {
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
    orginalsrc: sessionStorage.getItem('orginalsrc') || '',
    width: sessionStorage.getItem('width'),
    height: sessionStorage.getItem('height'),
    //
    fileReady: sessionStorage.getItem('fileReady') ? true : false,
    curfiltername: sessionStorage.getItem('curfiltername') ? sessionStorage.getItem('curfiltername') : 'default',
    //
    curfilter: sessionStorage.getItem('curfilter ')
      ? JSON.parse(sessionStorage.getItem('curfilter') as string)
      : init({}),
    //
    curset: sessionStorage.getItem('curset')
      ? JSON.parse(sessionStorage.getItem('curset') as string)
      : init({ opacity: 100 }),
    //
    cropperData: sessionStorage.getItem('cropperData')
      ? JSON.parse(sessionStorage.getItem('cropperData') as string)
      : { width: sessionStorage.getItem('width'), height: sessionStorage.getItem('height') },
  },
  mutations: {
    applyfilter(state, { filter, name }: { filter: FilterProtoI; name: string }) {
      state.curfiltername = name;
      sessionStorage.setItem('curfiltername', name);
      const fullfilter = init(filter);
      state.curfilter = fullfilter;
      sessionStorage.setItem('curfilter', JSON.stringify(fullfilter));
    },
    updatesettings(state, { func, val }: { func: keyof FilterI; val: number }) {
      const settings: FilterI = Object.assign(state.curset);
      settings[func] = val;
      state.curset = settings;
      sessionStorage.setItem('curset', JSON.stringify(settings));
    },
    reset(state) {
      state.curfiltername = 'default';
      state.curfilter = init({});
      state.curset = init({ opacity: 100 });

      sessionStorage.removeItem('curset');
      sessionStorage.removeItem('curfilter');
      sessionStorage.removeItem('curfiltername');
    },
    clearModule(state) {
      Object.assign(state, {
        orginalsrc: '',
        width: 0,
        height: 0,
        fileReady: false,
        curfiltername: 'default',
        curfilter: init({}),
        curset: init({ opacity: 100 }),
        cropperData: { width: 0, height: 0 },
      });
      for (const i in state) {
        sessionStorage.removeItem(i);
      }
    },
    initImage(state, { src, width, height }) {
      state.fileReady = true;
      state.orginalsrc = src;
      state.width = state.cropperData.width = width;
      state.height = state.cropperData.height = height;

      sessionStorage.setItem('width', width);
      sessionStorage.setItem('height', height);
      sessionStorage.setItem('cropperData', JSON.stringify(state.cropperData));
      sessionStorage.setItem('fileReady', 'true');
      sessionStorage.setItem('orginalsrc', src);
    },
  },
  actions: {},
  getters: {
    //all edits merged together
    alleditsmerged(state) {
      const f: FilterI = state.curfilter;
      const s: FilterI = state.curset;
      return `
      brightness(${100 + f.brightness + s.brightness}%)
      hue-rotate(${f.hueRotate + s.hueRotate}deg)
      saturate(${100 + f.saturate + s.saturate}%)
      contrast(${100 + f.contrast + s.contrast}%)
      invert(${f.invert + s.invert}%)
      sepia(${f.sepia + s.sepia}%)
      grayscale(${f.grayscale + s.grayscale}%)
      blur(${f.blur + s.blur}px)
      `;
    },
  },
  modules: {},
} as Module<State, State>;
