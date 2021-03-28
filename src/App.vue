<template>
  <router-view />
</template>

<script lang="ts">
import bootstrap from "bootstrap";
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $snow;
  background: $dark-grey;
  @import "~bootstrap/scss/bootstrap";
  height: 100vh;
}
</style>
