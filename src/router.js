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
      path: '/:table/map/:street',
      component: pages.map,
    },
    {
      name: 'citizen',
      path: '/citizen',
      component: pages.areas,
    },
  ],
})
