exports.digitalStyle = {
  $titleStyle: {
    color: '#d8d8d8',
    fontSize: '18px',
    fontWeight: '500',
  },
  $digitalStyle: {
    fontSize: '44px',
    color: '#dece83',
    fontFamily: 'Oswald-Regular',
    fontWeight: '400',
    letterSpacing: '1px',
  },
  $suffixStyle: {
    color: '#d8d8d8',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '1',
  },
}

exports.donutComponent = {
  component: '@byzanteam/vis-components/data-loader',
  position: [40, 841],
  props: {
    url: '/v1/components/5d4574bf-fb0f-47fe-87e9-c33680aecaf0/data?table=table=nice_enterprise',
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
}

exports.mapComponent = {
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
            'marker-dbclicked': {
              actions: ["$router.push({ name: 'map', params: { street: area.id }})"]
            }
          },
          props: {
            $marker: {
              $id: 'area.id',
              $label: "[area.id, '共有企业:' + area.count + '个']",
              $location: 'area.location',
            },
            icon: 'circle-o',
            $markerStyle: {
              strokeColor: 'rgb(0, 122, 254)',
              $strokeWeight: '1',
              color: 'rgba(0, 122, 254, .12)',
              $size: 130,
              textAlign: 'center',
            },
            $innerLabelStyle: {
              color: 'white',
              $textStyleMap: "[{fontSize: 16}, {fontSize: 14}]",
              offset: [0, 45],
            },
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
            'marker-dbclicked': {
              actions: ["$router.push({ name: 'map', params: { street: area.id }})"]
            }
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
}

exports.areasLoader = {
  component: '@byzanteam/vis-components/data-loader',
  props: {
    $url: "`/v1/components/ab5aac88-eb86-4d83-8107-090dabc16632/data?table=${craneStates.routerMap[routeParams.table]}`",
  },
  events: {
    requestDone: {
      params: ['exports'],
      actions: ["setState('areas', exports.results.map((item) => ({ id: item[0], count: item[1], location: craneStates.areasLocationMap[item[0]] })))"],
    },
  },
}
