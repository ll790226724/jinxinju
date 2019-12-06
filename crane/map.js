const mapPartial = require('./map/index')

module.exports = {
  route: {
    name: 'map',
    path: ':table/map/:street'
  },
  title: '合规企业',
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
      id: 'routerMap',
      value: {
        staff: 'nice_enterprise',
        slw: 'bad_enterprise',
      }
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
      value: {
        '行业': {
          clusterContent: {},
          markerContent: {},
          labelStyle: {}
        }
      }
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
    {
      id: 'tableKeyMap',
      value: {
        'CompanyName': '公司名字',
        'Industry': '所属行业',
        'CorporateTerritory': '企业属地',
        'UnifiedSocialCreditCode': '统一社会信用代码',
        'BusinessScope': '经营范围',
        'MainProducts': '主要产品',
        'LegalRepresentative': '法人代表',
        'ContactNumber': '联系电话',
        'EIAApprovalNumber': '环评批复（备案）',
        'MainBusinessIncome': '上一年度主营收入',
        'InboundTax': '上一年度入库税金',
        'ProductionAddress': '生产地址'
      }
    },
    {
      id: 'streetLntlatsMap',
      value: {
        '唐昌街道': [103.824336,30.92366],
        '三道堰街道': [103.915939,30.862178],
        '安德街道': [103.80584,30.870687],
        '友爱街道': [103.795132,30.823379],
        '团结街道': [103.978343,30.816234],
        '郫筒街道': [103.887996,30.807641],
        '红光街道': [103.945588,30.784785],
        '犀浦街道': [103.972796,30.753811],
        '川菜园区': [103.812872,30.865116],
        '现代工业港': [103.92972,30.802213],
        '德源街道': [103.853417,30.774637],
        '安靖街道': [104.018228,30.759085],
      }
    },
    {
      id: 'companyType',
      value: '合规企业',
    },
  ],
  components: [
    ...mapPartial,
  ],
}
