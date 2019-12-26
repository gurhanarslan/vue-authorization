import Vue from 'vue'
import App from './App.vue'
import {store} from './store'
import VueResource from 'vue-resource'
import {router} from './router'

Vue.use(VueResource);


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)

})
