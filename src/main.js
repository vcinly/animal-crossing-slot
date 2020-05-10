import Vue from 'vue'
import App from './App.vue'
import { MdButton, MdEmptyState, MdIcon } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import animated from 'animate.css'

Vue.use(MdButton)
Vue.use(MdEmptyState)
Vue.use(MdIcon)
Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
