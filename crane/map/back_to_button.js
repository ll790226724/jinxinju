module.exports = {
  id: 'back-button',
  component: '@byzanteam/vis-components/brick-button',
  position: [453, 43],
  props: {
    color: 'blue',
  },
  events: {
    'click': {
      actions: ["$router.push(`/${routeParams.table}/areas`)"]
    }
  },
  content: '返回上一级'
}
