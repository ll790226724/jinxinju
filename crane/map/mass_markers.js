module.exports = {
  id: 'map-component',
  component: '@byzanteam/vis-components/data-loader',
  position: [0, 0],
  exports: {
    results: 'results',
  },
  props: {
    $url: "`/v1/components/48d69e96-7ba5-40ba-946d-d0c84058f352/data?table=${craneStates.routerMap[routeParams.table]}${craneStates.mapCommunities}&minLng=${craneStates.mapBounds.southwest.lng}&maxLng=${craneStates.mapBounds.northeast.lng}&minLat=${craneStates.mapBounds.southwest.lat}&maxLat=${craneStates.mapBounds.northeast.lat}`",
    method: 'get',
    $data: "[['', '', [0, 0]]]",
    $style: {
      width: '100%',
      height: '100%',
      $transform: 'getMapScale()'
    }
  },
  events: {
    'requestDone': {
      actions: ["setState('markersData', getComponent('map-component').results)"]
    }
  },
  children: [
    {
      id: 'mapRef',
      component: '@byzanteam/map-ui/base-map',
      position: [0 , 0],
      props: {
        $mapOptions: '{center: [103.89682,30.793154], zoom: 17, zooms: [11, 20]}',
        mapStyle: 'amap://styles/b31f276415bcbad48ed365bfa6651249',
        $style: {
          width: '100%',
          height: '100%'
        }
      },
      events: {
        'map-created': {
          params: ['map'],
          actions: ["setState('mapBounds', map.getBounds()), $refs.mapRef.setCenter(craneStates.streetLntlatsMap[routeParams.street])"]
        },
        'map-resize': {
          params: ['bounds'],
          actions: ["setState('mapBounds', bounds)"]
        },
        'map-click': {
          params: ['bounds'],
          actions: [
            "Object.keys(craneStates.currentClusterContext).length !== 0 ? craneStates.currentClusterContext.setContent(craneStates.currentClusterContext.getContent().replace(/selectedCluster/, 'normalCluster')) : ''",
            "getComponent('mapRef').map.setStatus({zoomEnable: true, dragEnable: true,})"
          ]
        }
      },
      children: [
        {
          id: 'clusterRef',
          component: '@byzanteam/map-ui/cluster',
          vfor: {
            data: 'markerGroup',
            exports: {item: 'item', index: 'key'}
          },
          props: {
            $clusterContent: 'craneStates.markerValueMap[key].clusterContent',
            //
            $points: 'item',
            $markerContent: 'craneStates.markerValueMap[key].markerContent',
            $options: {
              $zoomOnClick: false,
            }
          },
          events: {
            'marker-mouseover': {
              params: ['marker'],
              actions: ["markerMouseoverFunc(marker)"]
            },
            'marker-clicked': {
              params: ['marker'],
              actions: ["setState('companyShow', true)", "setState('company', marker.target.getExtData())", "setState('companyCloseIconShow', true)"]
              // actions: ["setState('companyShow', true)", "setState('company', marker.data)", "setState('companyCloseIconShow', true)"]
            },
            'clusterClick': {
              params: ['cluster'],
              actions: ["clusterClickFunc(cluster)"]
            }
          },
        },
        {
          id: 'infowindowRef',
          component: '@byzanteam/map-ui/info-window',
          props: {
            $options: {
              $closeWhenClickMap: true,
              $isCustom: true,
            }
          },
          events: {
            'window-closed': {
              actions: [
                "Object.keys(craneStates.currentClusterContext).length !== 0 ? craneStates.currentClusterContext.setContent(craneStates.currentClusterContext.getContent().replace(/selectedCluster/, 'normalCluster')) : ''"
              ]
            }
          }
        }
      ],
    },
  ]
}
