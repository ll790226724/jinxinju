const StaticComponents = require('./static')
const { mapComponent, areasLoader } = require('../share')
const { pidugeojson, areasLocationMap } = require('../geojson')

module.exports = {
  route: {
    name: 'areas',
  },
  title: '合规企业',
  states: [
    {
      id: 'filterKey',
      value: '',
    },
    {
      id: 'categoryMap',
      value: {
        type1: '川菜园区',
        type2: '现代工业港',
        other: '其他',
      },
    },
    {
      id: 'geojson',
      value: [pidugeojson],
    },
    {
      id: 'areasLocationMap',
      value: areasLocationMap,
    },
    {
      id: 'areas',
      value: [],
    },
    {
      id: 'currentArea',
      value: '',
    },
    {
      id: 'barChartIndustries',
      value: [
        '农副食品加工业',
        '食品制造业',
        '电气机械和器材制造业',
        '计算机、通信和其他电子设备制造业',
        '酒、饮料和精制茶制造业',
        '仪器仪表制造业',
      ],
    },
    {
      id: 'markerStyle',
      value: {strokeColor: 'rgb(0, 122, 254)', strokeWeight: 1, color: 'rgba(0, 122, 254, .12)', size: 130, textAlign: 'center'}
    },
    {
      id: 'innerLabelStyle',
      value: {color: 'white', textStyleMap: [{fontSize: 16}, {fontSize: 14}], offset: {0: '0', 1: '45'}}
    },
    {
      id: 'routerMap',
      value: {
        staff: 'nice_enterprise',
        slw: 'bad_enterprise',
      }
    },
  ],
  components: [
    mapComponent,
    areasLoader,
    ...StaticComponents,
  ],
}
