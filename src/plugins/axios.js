import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults['baseURL'] = 'http://vis.cdyoue.com:35008/'

export default {
  install () {
    Vue.use(VueAxios, axios)
  },
}
