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
      backgroundColor: 'rgb(26, 29, 57)',
    },
  },
  children: [
    {
      id: 'company-data',
      component: '@byzanteam/vis-components/data-loader',
      exports: {
        results: 'detail',
      },
      props: {
        $style: {
          position: 'relative',
          padding: '35px 16px 24px 16px',
          backgroundImage: 'url(/jingxinju/images/map-head-bg.png)',
          backgroundPosition: '100% 100%'
        }
      },
      children: [
        {
          id: 'company-name-container',
          component: 'div',
          props: {
            'v-if': 'detail',
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
              content: "xxx公司",
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
            }
          ]
        },
      ]
    },
  ]
}
