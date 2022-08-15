<template>
  <div class="max-w-6xl w-11/12 mx-auto" style="margin-top: 2rem">
    <h1 class="text-4xl font-medium">Photo Editor</h1>
    <h2 class="text-2xl">A fully functional free online Photo Editor</h2>
    <hr />
    <figure class="w-full max-w-xs mx-auto">
      <img src="/img/logo.svg" />
    </figure>
    <article class="pb-5">
      <h3 class="text-2xl font-medium">What's that?</h3>
      <p>
        Photo Editor can be considered as a showcase of various tech. It is a Vue SPA utilizing
        <a href="https://element-plus.org/">Element Plus</a>, canvas filters and
        <a href="https://github.com/fengyuanchen/cropperjs">Cropperjs</a>.
      </p>

      <h3 class="text-2xl font-medium mb-1">Usage</h3>
      <p>Just upload a photo a start tweaking the sliders! Currently, there are 3 basic editing options:</p>
      <ul class="list-disc ml-6">
        <li>
          applying
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter">canvas filters</a>
          (same as css filters: brightness, saturation, hue rotate, contrast, opacity, grayscale, sepia, invert)
        </li>
        <li>
          applying instagram filters thanks to
          <a href="https://github.com/picturepan2/instagram.css">Instagram.css</a>
        </li>
        <li>
          cropping and rotating thanks to
          <a href="https://github.com/fengyuanchen/cropperjs">Cropperjs</a>
        </li>
      </ul>
      <p>
        Yes, you can install the PhotoEditor via npm and use it in your own project - check the See More section below.
      </p>
      <h3 class="text-2xl font-medium">See More</h3>
      <a href="https://github.com/matb85/photoEditor/"
        >For more info (contributing, usage in your own project, API) check out the repo on Github</a
      >
    </article>
  </div>
</template>

<style scoped>
a {
  color: var(--el-color-primary);
}
</style>
