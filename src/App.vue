<template>
  <div id="app" class="container-fluid">
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <Main/>
  </div>
</template>

<script>
import Main from './components/main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
#app {
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
h1 {
  font-weight: 700;
}
</style>
