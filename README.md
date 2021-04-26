# Photo Editor

## A fully functional free online Photo Editor

## A working example: https://matb85.github.io/PhotoEditor/

### What's that?

Photo Editor can be considered as a showcase of various tech. It is a Vue SPA utilizing [Buefy](https://buefy.org/), canvas filters and [Cropperjs](https://github.com/fengyuanchen/cropperjs).

### Usage - Spa

Go to https://matb85.github.io/PhotoEditor/ Just upload a photo a start tweaking the sliders! Currently, there are 3 basic editing options:

- applying [canvas filters](https://developer.mozilla.org/en-US/docs/WebAPI/CanvasRenderingContext2D/filter) (same as css filters: brightness,saturation, hue rotate, contrast, opacity, grayscale, sepia, invert)
- applying instagram filters thanks to [Instagram.css](https://githubcom/picturepan2/instagram.css)
- cropping and rotating thanks to [Cropperjs](https://github.comfengyuanchen/cropperjs)

### Usage - Api

#### Download and importing photoEditor

Of course you can download the editor via npm as a commonjs or umd module. Please remember that photoEditor requires Vuex!

- in a no ssr environment (e.g. Vue spa):

```html
<template>
  <div>
    <photoEditor />
  </div>
</template>

<script>
  import "@matb85/photoeditor/dist/photoEditor.css";
  import photoEditor from "@matb85/photoeditor";

  export default {
    name: "Home",
    components: {
      photoEditor,
    },
  };
</script>
```

- in a ssr environment (e.g. Nuxt universal app):

```html
<template>
  <div>
    <client-only placeholder="Loading...">
      <photoEditor />
    </client-only>
  </div>
</template>

<script>
  import "@matb85/photoeditor/dist/photoEditor.css"
  export default {
    name: "your component",
    components:
      photoEditor: () => {
      return import("@matb85/photoeditor")
        });
      },
    },
  };
</script>
```

#### specification

#### props

- clearDataOnDestroy - if true, photoEditor's data in vuex and sessionStorage is cleared when the beforeDestroy hook is called

```html
<photoEditor clearDataOnDestroy />
```

#### events

you can emit to your photoEditor using this.$root.$emit("photoEditor/event", arguments)

- alterphoto - tells the photoEditor to update the photo (apply css filters)

```javascript
this.$root.$emit("photoEditor/alterphoto"); // no arguments
```

- cropperchange - calls a cropperjs method (works only when cropperjs is available)

```javascript
this.$root.$emit("photoEditor/cropperchange",  cropperjsmethod, [array with arguments])
this.$root.$emit("photoEditor/cropperchange",  "rotateTo", 20) //rotates the image to 20 degrees
```

#### Vuex - actions

- updatesettings - changes value of one css filter, in order to see the result call the alterphoto event

```javascript
this.$store.dispatch("photoEditor/updatesettings", { func: cssfiltername, val: value });
```

#### Vuex - mutations

- resetStore - reset the vuex module to its initial state and clear sessionStorage

```javascript
this.$store.commit("photoEditor/resetStore");
```

### Cotributing

Certainly, contributions are welcome. So if you'd like to addfunctionality or simply make it better, go ahead!
These are the early days of this project so bugs are more than probableand some features may lack. I recommend raising a PR before doing anything.

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies docs for production

```
npm run build:docs
```

### Compiles and minifies the library for production

```
npm run build:lib
```

### Lints and fixes files

```
npm run lint
```
