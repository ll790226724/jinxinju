const mapPartial = require('./map/index')

module.exports = {
  route: {
    name: 'map',
  },
  title: '企业地图',
  states: [
    {
      id: 'searchValue',
      value: '',
    },
    {
      id: 'company',
      value: ''
    },
    {
      id: 'page',
      value: 1,
    },
    {
      id: 'selectOptions',
      value: []
    },
    {
      id: 'companyShow',
      value: false
    },
    {
      id: 'mapBounds',
      value: {
        southwest: {
          lat: 0,
          lng: 0,
        },
        northeast: {
          lat: 0,
          lng: 0,
        }
      }
    },
    {
      id: 'communities',
      value: []
    },
    {
      id: 'companyCloseIconShow',
      value: false
    },
    {
      id: 'markerValueMap',
      value: {}
    },
    {
      id: 'markerStyles',
      value: []
    },
    {
      id: 'mapCommunities',
      value: ''
    },
    {
      id: 'colorMap',
      value:  [
        '#007afe',
        '#dece84',
        '#8f919f',
        '#dc5f5f',
        '#f7b267',
        '#4fa8f1',
        '#2ec4b6',
        '#bed8d4',
        '#627592',
        '#5fd6dc',
        '#7d5fdc',
        '#7dcfef',
        '#2e81c4',
        '#979eda',
        '#4b4b4b',
        '#dc5f9a',
        '#7dcfef',
        '#f76767',
        '#c08185'
      ]
    },
  ],
  components: [
    ...mapPartial,
  ],
}
