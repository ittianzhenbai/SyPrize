import "../src/common/js/control.js"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import "../src/common/css/common.styl"
// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './common/js/element.js'
import vant from './common/js/vant.js'
import LuckDraw from 'vue-luck-draw'
import request from './common/js/api.js'



Vue.use(LuckDraw)
Vue.use(element)
Vue.use(vant)
Vue.prototype.request = request
Vue.config.productionTip = false
// Vue.use(VueAxios,axios);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
