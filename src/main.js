import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import './app.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAxios, axios)

Vue.use(VueTheMask)
Vue.use(money, {precision: 2})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
