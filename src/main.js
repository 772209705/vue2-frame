import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axiosApi from './api/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false


Vue.use(axiosApi)
Vue.use(ElementUI)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
