const mapPage = require('./crane/map')

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
    '@byzanteam/brick': {
      version: 'latest',
      order: 1,
      style: {
        type: 'injection',
        path: 'src/theme/default.scss',
      },
    },
    '@byzanteam/vis-components': {
      version: '../vis-components',
      order: 2,
      style: {
        type: 'normal',
        path: 'dist/index.css',
      },
    },
    '@byzanteam/carbonium': {
      version: 'latest',
      order: 3,
      style: {
        type: 'normal',
        path: 'dist/carbonium.css',
      },
    },
  },
  // 页面
  pages: [
    mapPage,
  ],
}
