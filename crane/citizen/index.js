const StaticComponents = require('./static')
const { pidugeojson, areasLocationMap } = require('../geojson')

module.exports = {
  route: {
    name: 'citizen',
  },
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
      value:   {
        strokeColor: 'rgba(0, 122, 254, .6)',
        strokeWeight: 1,
        color: 'rgba(0, 122, 254, .06)',
        size: 130,
        textAlign: 'center',
      },
    },
    {
      id: 'innerLabelStyle',
      value: {
        color: 'rgba(255, 255, 255, 0.8)',
        textStyleMap: [{fontSize: 16},{fontSize: 14}],
        offset: {0: '0', 1: '45'},
      },
    },
    {
      id: 'selectedMarkerStyle',
      value: {
        strokeColor: 'rgb(0, 122, 254)',
        strokeWeight: 1,
        color: 'rgba(0, 122, 254, .12)',
        size: 130,
        textAlign: 'center',
      },
    },
    {
      id: 'selectedInnerLabelStyle',
      value: {
        color: 'white',
        textStyleMap: [{fontSize: 16},{fontSize: 14}],
        offset: {0: '0', 1: '45'},
      }
    }
  ],
  components: [
    {
      component: 'div',
      position: [0, 0],
      props: {
        $style: {
          width: '100%',
          height: '100%',
        },
      },
      children: [
        {
          component: '@byzanteam/map-ui/base-map',
          id: 'baseMap',
          props: {
            features: 'none',
            $useMapUi: 'true',
            $mapOptions: {
              $zoom: 12,
              $zoomEnable: false,
            },
          },
          events: {
            'map-created': {
              actions: ["getComponent('baseMap').setCenter([103.797642, 30.838752])"],
            },
          },
          children: [
            {
              component: '@byzanteam/map-ui/regions',
              props: {
                $areas: 'craneStates.geojson',
                $areaStyle: {
                  strokeColor: '#363856',
                  $strokeWeight: 2,
                  $fillOpacity: 0,
                },
                $areaHoverStyle: {
                  $fillOpacity: 0,
                },
              },
            },
            {
              component: '@byzanteam/map-ui/marker-point',
              id: 'marker-point',
              vfor: {
                data: 'normalAreas',
                exports: {
                  item: 'area',
                },
              },
              events: {
                'marker-clicked': {
                  actions: ["setState('currentArea', area.id === craneStates.currentArea ? '' : area.id)"],
                },
              },
              props: {
                $marker: {
                  $id: 'area.id',
                  $label: "[area.id, '共有企业:' + area.count + '个']",
                  $location: 'area.location',
                },
                icon: 'circle-o',
                $markerStyle: "area.markerStyle",
                $innerLabelStyle: "area.innerLabelStyle",
              },
            },
            {
              component: '@byzanteam/map-ui/marker-point',
              id: 'marker-point',
              vfor: {
                data: 'specialAreas',
                exports: {
                  item: 'area',
                },
              },
              events: {
                'marker-clicked': {
                  actions: ["setState('currentArea', area.id === craneStates.currentArea ? '' : area.id)"],
                },
              },
              props: {
                $marker: {
                  $id: 'area.id',
                  $label: "[area.id]",
                  $location: 'area.location',
                },
                icon: 'circle-o',
                $markerStyle: {
                  strokeColor: 'rgb(0, 122, 254, .12)',
                  $strokeWeight: 1,
                  color: 'rgb(0, 122, 254)',
                  $size: 14,
                  textAlign: 'center',
                },
                $innerLabelStyle: {
                  color: '#367eef',
                  $textStyleMap: "[{fontSize: 16}]",
                  $offset: "[-8*area.id.length+4, 30]",
                },
              },
            },
          ],
        },
      ],
    },
    {
      component: '@byzanteam/vis-components/data-loader',
      props: {
        $url: "`/v1/components/ab5aac88-eb86-4d83-8107-090dabc16632/data?table=nice_enterprise`",
      },
      events: {
        requestDone: {
          params: ['exports'],
          actions: ["setState('areas', exports.results.map((item) => ({ id: item[0], count: item[1], location: craneStates.areasLocationMap[item[0]] })))"],
        },
      },
    },
    ...StaticComponents,
    {
      component: '@byzanteam/vis-components/data-loader',
      position: [40, 841],
      props: {
        url: '/v1/components/5d4574bf-fb0f-47fe-87e9-c33680aecaf0/data?table=nice_enterprise',
        $style: {
          width: '400px',
          height: '217px',
          borderRadius: '4px',
          overflow: 'hidden',
        },
        $data: "[[0]]",
      },
      exports: {
        results: 'results',
        response: 'response',
      },
      children: [
        {
          component: '@byzanteam/graphite/donut',
          directive: {
            if: 'response',
          },
          props: {
            $data: 'results[0].map((item, index) => ({ key: craneStates.categoryMap[response.schema[index].field], value: item }))',
            'label-key': 'key',
            'value-key': 'value',
            $innerRadius: .655,
            $theme: {
              background: '#1f2240',
              $colors: "['#007afe', '#dece84', '#8f919f']",
            },
            $guide: {
              text: '企业类型占比',
              stroke: '#ffffff',
              $size: 12,
              align: 'center',
            },
            $tooltipOptions: {
              background: 'rgba(60, 71, 89, .9)',
              $text: {
                $size: 14,
                fill: '#ffffff',
              },
            },
          },
        },
      ],
    },
  ],
}
