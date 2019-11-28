module.exports = {
  id: 'company-container',
  component: 'div',
  props: {
    'v-if': "craneStates.companyShow",
    $style: {
      width: '400px',
      maxHeight: '970px',
      position: 'absolute',
      top: '84px',
      left: '40px',
      backgroundColor: '#1f2440',
      borderRadius: '4px',
    },
  },
  children: [
    {
      id: 'company-data',
      component: '@byzanteam/vis-components/data-loader',
      exports: {
        response: 'response',
      },
      props: {
        $url: "encodeURI(`v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data?table=nice_enterprise&name=%${craneStates.company[0]}%`)",
        method: 'get',
        $data: "{data: [[]]}",
      },
      children: [
        {
          component: 'div',
          props: {
            'v-if': "response",
            $style: {
              position: 'relative',
              padding: '35px 16px',
              backgroundImage: 'url(/jingxinju/images/map-head-bg.png)',
              borderRadius: '4px 4px 0 0'
            }
          },
          children: [
            {
              id: 'company-name-container',
              component: 'div',
              props: {
                'v-if': 'response',
                $style: {
                  display: 'flex',
                  alignItems: 'center',
                }
              },
              children: [
                {
                  id: 'close-icon',
                  component: 'img',
                  props: {
                    'v-if': 'craneStates.companyCloseIconShow',
                    src: '/jingxinju/images/Icon-Close.svg',
                    $style: {
                      width: '16px',
                      cursor: 'pointer',
                    }
                  },
                  events: {
                    'click': {
                      actions: ["setState('companyShow', false)"]
                    }
                  },
                },
                {
                  id: 'arrow-icon',
                  component: 'img',
                  props: {
                    src: '/jingxinju/images/Icon-Back.svg',
                    $style: {
                      width: '16px',
                      cursor: 'pointer',
                    }
                  },
                  directive: {
                    else: true
                  },
                  events: {
                    'click': {
                      actions: ["setState('companyShow', false)"]
                    }
                  },
                },
                {
                  id: 'arrow-icon-text',
                  component: 'span',
                  content: "{{ response.data[0][0] }}",
                  props: {
                    $style: {
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: '600',
                      marginLeft: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }
                  }
                },
              ]
            },
          ]
        },
        {
          id: 'details-table',
          component: 'table',
          props: {
            'v-if': "response",
          },
          children: [
            {
              id: 'industry-tr',
              component: 'tr',
              vfor: {
                data: 'response.schema',
                exports: {item: 'item', index: 'key'}
              },
              props: {
                'v-if': 'craneStates.tableKeyMap[item.field]',
                $style: {
                  borderBottom: '1px solid rgba(255, 255, 255, .03)',
                },
              },
              children: [
                {
                  id: 'industry-th',
                  component: 'td',
                  content: '{{craneStates.tableKeyMap[item.field]}}',
                  props: {
                    $style: {
                      width: '140px',
                      verticalAlign: 'middle',
                      padding: '20px 8px ',
                      borderRight: '1px solid rgba(255, 255, 255, .03)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      $fontWeight: 400,
                      lineHeight: '20px',
                      textAlign: 'left',
                      fontSize: '14px',
                    }
                  }
                },
                {
                  id: 'details-dependency-td',
                  component: 'td',
                  content: '{{ response.data[0][key] }}',
                  props: {
                    $style: {
                      width: '260px',
                      verticalAlign: 'middle',
                      padding: '20px 8px ',
                      color: 'rgba(255, 255, 255, 0.7)',
                      $fontWeight: 400,
                      lineHeight: '20px',
                      textAlign: 'left',
                      fontSize: '14px',
                    }
                  }
                }
              ]
            },
          ],
        }
      ]
    },
  ]
}
