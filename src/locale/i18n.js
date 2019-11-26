import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages,
})

export default i18n
