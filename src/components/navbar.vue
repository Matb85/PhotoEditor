<template>
  <b-navbar shadow id="navbar">
    <template slot="brand">
      <h1 class="is-size-3 mx-2">Photo editor</h1>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <button v-show="$store.state.fileReady" class="button is-primary">
            <strong>Download</strong>
          </button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style>
#navbar {
  position: fixed;
  top: 0;
  z-index: 40;
  width: 100%;
}
</style>
