import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  // 取消URL中的  “ # ”
  // mode:'history',
  routes
})

export default router;
