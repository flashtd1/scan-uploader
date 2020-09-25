import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/upload/:token',
    name: 'upload',
    component: () => import('@/views/Upload.vue')
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})