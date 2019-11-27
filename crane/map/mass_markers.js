module.exports = {
  id: 'map-component',
  component: '@byzanteam/vis-components/data-loader',
  position: [0, 0],
  exports: {
    results: 'results',
  },
  props: {
    $url: "`/v1/components/48d69e96-7ba5-40ba-946d-d0c84058f352/data?table=nice_enterprise&minLng=${this.craneStates.mapBounds.southwest.lng}&maxLng=${this.craneStates.mapBounds.northeast.lng}&minLat=${this.craneStates.mapBounds.southwest.lat}&maxLat=${this.craneStates.mapBounds.northeast.lat}`",
    method: 'get',
    $data: "[['', '', [0, 0]]]",
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
        $mapOptions: '{center: [103.89682,30.793154], zoom: 11, zooms: [11, 20]}',
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
            'v-if': "results",
            $markers: "results.map((result) => {return {name: result[0], type: result[1], lnglat: result[2], style: craneStates.markerValueMap[result[1]]}})",
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
