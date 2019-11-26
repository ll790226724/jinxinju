module.exports = {
  id: 'map-component',
  component: '@byzanteam/vis-components/data-loader',
  position: [0, 0],
  exports: {
    results: 'results',
  },
  props: {
    url: '/v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data',
    method: 'get',
    $data: "[{community: '', location: [0, 0]}]",
    $params: 'mapParams',
    $style: {
      width: '100%',
      height: '100%',
      $transform: 'getMapScale()'
    }
  },
  children: [
    {
      id: 'mapRef',
      component: '@byzanteam/map-ui/base-map',
      position: [0 , 0],
      props: {
        $mapOptions: '{center: [113.586456,34.803382], zoom: 11, zooms: [11, 20]}',
        mapStyle: 'amap://styles/b31f276415bcbad48ed365bfa6651249',
        $style: {
          width: '100%',
          height: '100%'
        }
      },
      events: {
        'map-created': {
          params: ['map'],
          actions: ["setState('mapBounds', map.getBounds())"]
        },
        'map-resize': {
          params: ['bounds'],
          actions: ["setState('mapBounds', bounds)"]
        }
      },
      children: [
        {
          id: 'markers',
          component: '@byzanteam/map-ui/mass-marker',
          props: {
            $markers: "results.map((result) => {return {...result, lnglat: result.location, style: craneStates.markerValueMap[result.community]}})",
            $styles: 'craneStates.markerStyles',
            $options: "{opacity: 1}"
          },
          events: {
            'mass-mouseover': {
              params: ['marker'],
              actions: ["markerMouseoverFunc(marker)"]
            },
            'mass-mouseout': {
              params: ['marker'],
              actions: ["markerMouseoutFunc(marker)"]
            },
            'mass-clicked': {
              params: ['marker'],
              actions: ["setState('companyShow', true)", "setState('company', marker.data)", "setState('companyCloseIconShow', true)"]
            }
          }
        },
        {
          id: 'infowindowRef',
          component: '@byzanteam/map-ui/info-window',
        }
      ],
    },
  ]
}
