<template>
  <b-navbar shadow id="navbar">
    <template slot="brand">
      <h1 class="is-size-3 mx-2">Image editor</h1>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            class="button is-primary"
            href="https://silvia-odwyer.github.io/photon/"
          >
            <strong>Download</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
export default {
  name: "navbar",
};
</script>

<style lang="scss">
#navbar {
  position: absolute;
  z-index: 40;
  width: 100%;
}
</style>
