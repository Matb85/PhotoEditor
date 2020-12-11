<template>
  <div class="section container" style="margin-top: 2rem;">
    <h1 class="title is-2">Photo Editor</h1>
    <h2 class="subtitle is-4">A fully functional free online Photo Editor</h2>
    <hr />
    <figure class="image 16/9" style="width: 100%; max-width: 300px; margin: 0 auto">
      <img :src="`${publicPath}img/logo.svg`" />
    </figure>
    <article class="content pb-5">
      <h3 class="title is-3 mb-1">What's that?</h3>
      <p>
        Photo Editor can be considered as a showcase of various tech. It is a Vue SPA utilizing
        <a href="https://buefy.org/">Buefy</a>, canvas filters and
        <a href="https://github.com/fengyuanchen/cropperjs">Cropperjs</a>. All in all, it's a fun hobby project!
      </p>

      <h3 class="title is-3 mb-1">Usage</h3>
      <p>
        Just upload a photo a start tweaking the sliders! Currently, there are 3 basic editing options:
      </p>
      <ul>
        <li>
          applying
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter">canvas filters</a>
          (same as css filters: brightness, saturation, hue rotate, contrast, opacity, grayscale, sepia, invert)
        </li>
        <li>
          applying instagram filters thanks to <a href="https://github.com/picturepan2/instagram.css">Instagram.css</a>
        </li>
        <li>cropping and rotating thanks to <a href="https://github.com/fengyuanchen/cropperjs">Cropperjs</a></li>
      </ul>
      <h3 class="title is-3 mb-1">Cotributing</h3>
      <p>
        Certainly, contributions are welcome. So if you'd like to add functionality or simply make it better, go ahead!
        These are the early days of this project so bugs are more than probable and some features may lack. I recommend
        raising an issue/PR before doing anything.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>
