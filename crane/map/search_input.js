module.exports = [
  {
    id: 'search-input',
    component: '@byzanteam/vis-components/brick-input',
    position: [40, 30],
    props: {
      placeholder: '请输入关键词',
      $style: {
        width: '400px',
        height: '50px',
      },
    },
    events: {
      'change': {
        params: ['value'],
        actions: ["setState('searchValue', value)"]
      }
    },
    children: [
      {
        id: 'search-input-prefix-template',
        component: 'template',
        slot: 'head',
        children: [
          {
            id: 'search-input-prefix-icon',
            component: '@byzanteam/vis-components/brick-icon',
            props: {
              name: 'search',
              color: 'rgba(255, 255, 255, 0.4)'
            }
          }
        ]
      },
      {
        id: 'search-input-prefix-template',
        component: 'template',
        slot: 'tail',
        children: [
          {
            component: '@byzanteam/vis-components/brick-tooltip',
            props: {
              'v-if': 'craneStates.searchValue',
              content: '清除',
              placement: 'bottom-center',
            },
            children: [
              {
                id: 'search-input-prefix-icon',
                component: '@byzanteam/vis-components/brick-icon',
                props: {
                  name: 'times-circle',
                  color: 'rgba(255, 255, 255, 0.4)'
                },
                events: {
                  'click': {
                    actions: ["setState('searchValue', '')"]
                  }
                },
              }
            ]
          }
        ]
      }
    ]
  },
]
