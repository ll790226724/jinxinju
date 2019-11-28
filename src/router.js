import Vue from 'vue'
import Router from 'vue-router'
import * as pages from './views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      name: 'map',
      path: '/map/:street',
      component: pages.map,
    },
    {
      name: 'areas',
      path: '/areas',
      component: pages.areas,
    },
  ],
})
