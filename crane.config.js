const mapPage = require('./crane/map')
const AreasPage = require('./crane/areas/index')
const citizenPage = require('./crane/citizen/index')

module.exports = {
  // i18n 配置
  name: 'zhengzhounsc',
  lang: {
    default: 'zh_CN',
    locales: {
      zh_CN: {
        pagination: {
          'total_count': '总计{total}条',
          perpage: '每页显示{perpage}条目',
          jump: '跳转',
          page: '页数'
        },
      },
      en_US: {},
    },
  },
  // 屏幕默认尺寸, 所有页面都继承该值，页面可单独设置
  size: [1920, 1080],
  requestSettings: {
    baseURL: 'http://vis.cdyoue.com:35008/',
  },
  modules: {
    '@byzanteam/vis-components': {
      version: '../../vis-components',
      style: {
        type: 'normal',
        path: 'dist/index.css',
      },
    },
    '@byzanteam/map-ui': {
      version: '../../map-ui',
      style: {
        type: 'normal',
        path: 'dist/map-ui.css',
      },
    },
    '@byzanteam/graphite': {
      version: 'latest',
    },
    '@byzanteam/carbonium': {
      style: {
        type: 'normal',
        path: 'dist/carbonium.css',
      },
    },
  },
  // 页面
  pages: [
    mapPage,
    AreasPage,
    citizenPage,
  ],
}
