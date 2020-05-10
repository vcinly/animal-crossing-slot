<template>
  <div id="app">
    <Slot />
    <div :class="[{'mobile-extend': waitDelay}]">&nbsp;&nbsp;</div>
  </div>
</template>

<script>
import Slot from './components/Slot.vue'

export default {
  name: 'App',
  components: {
    Slot
  },
  data() {
    return {
      waitDelay: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.waitDelay = window.innerWidth <= 750 && true
    }, 6000);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
body {
    margin: 0;
    background: url("assets/animal-leaf-bg.jpg");
    background-size: cover;
}
// @media only screen and (max-width: 759px) {
// body {
//     height: calc(100% + 800px)!important;
//   }
// }
html, body, .fullheight {
    min-height: 100% !important;
    height: 100%;
}
.mobile-extend {
    height: 100%;
    width: 100%;;
    margin: 0;
    background: url("assets/animal-leaf-bg.jpg");
    background-size: cover;
}

/* fallback */

@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(./assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

// .material-icons {
//     font-family: 'Material Icons';
//     font-weight: normal;
//     font-style: normal;
//     font-size: 24px;
//     line-height: 1;
//     letter-spacing: normal;
//     text-transform: none;
//     display: inline-block;
//     white-space: nowrap;
//     word-wrap: normal;
//     direction: ltr;
//     -webkit-font-feature-settings: 'liga';
//     -webkit-font-smoothing: antialiased;
// }

// @import 'vue-material/dist/theme/engine.scss';
// @include md-register-theme("default", (
//   primary: md-get-palette-color(green, A200), // The primary color of your application
//   accent: md-get-palette-color(red, A200), // The accent or secondary color
//   theme: dark // This can be dark or light
// ));

// @import "~vue-material/dist/theme/all";

</style>
