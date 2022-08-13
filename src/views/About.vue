<template>
  <div class="section container" style="margin-top: 2rem">
    <h1 class="title is-2">Photo Editor</h1>
    <h2 class="subtitle is-4">A fully functional free online Photo Editor</h2>
    <hr />
    <figure
      class="image 16/9"
      style="width: 100%; max-width: 300px; margin: 0 auto"
    >
      <img src="/img/logo.svg" />
    </figure>
    <article class="content pb-5">
      <h3 class="title is-3 mb-1">What's that?</h3>
      <p>
        Photo Editor can be considered as a showcase of various tech. It is a
        Vue SPA utilizing
        <a href="https://buefy.org/">Buefy</a>, canvas filters and
        <a href="https://github.com/fengyuanchen/cropperjs">Cropperjs</a>.
      </p>

      <h3 class="title is-3 mb-1">Usage</h3>
      <p>
        Just upload a photo a start tweaking the sliders! Currently, there are 3
        basic editing options:
      </p>
      <ul>
        <li>
          applying
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter"
            >canvas filters</a
          >
          (same as css filters: brightness, saturation, hue rotate, contrast,
          opacity, grayscale, sepia, invert)
        </li>
        <li>
          applying instagram filters thanks to
          <a href="https://github.com/picturepan2/instagram.css"
            >Instagram.css</a
          >
        </li>
        <li>
          cropping and rotating thanks to
          <a href="https://github.com/fengyuanchen/cropperjs">Cropperjs</a>
        </li>
      </ul>
      <p>
        Yes, you can install the PhotoEditor via npm and use it in your own
        project - check the See More section below.
      </p>
      <h3 class="title is-3 mb-1">See More</h3>
      <a href="https://github.com/matb85/photoEditor/"
        >For more info (contributing, usage in your own project, API) check out
        the repo on Github</a
      >
    </article>
  </div>
</template>
