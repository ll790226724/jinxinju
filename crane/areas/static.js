const { digitalStyle, donutComponent } = require('../share')

module.exports = [
  {
    component: 'div',
    position: [40, 30],
    props: {
      $style: {
        width: '400px',
        height: '798px',
        backgroundColor: '#1f2240',
        borderRadius: '4px',
      },
    },
    children: [
      {
        component: 'img',
        position: [0, 0],
        props: {
          $style: {
            width: '400px',
            height: '150px',
          },
          src: '/jingxinju/images/map-head-bg.png',
        },
      },
      {
        component: 'div',
        position: [15, 57],
        props: {
          $style: {
            color: '#d8d8d8',
            display: 'inline-flex',
          },
        },
        children: [
          {
            component: '@byzanteam/vis-components/icon',
            props: {
              name: 'icon-company',
              size: '20px',
            },
          },
        ],
      },
      {
        component: '@byzanteam/vis-components/data-loader',
        position: [43, 29],
        props: {
          $url: "`/v1/components/1946f34d-a2b8-4f97-b956-4dc11dbfd083/data?table=${craneStates.routerMap[routeParams.table]}${craneStates.currentArea?'&area=\\''+craneStates.currentArea+'\\'':''}`",
          method: 'get',
          $data: "[[0]]",
        },
        exports: {
          results: 'results',
        },
        children: [
          {
            component: '@byzanteam/vis-components/digital-roll',
            props: {
              titlePosition: 'left',
              $content: {
                title: '合规企业总计',
                $digital: "getAttr(getAttr(results, '0'), '0')",
                suffix: '个',
              },
              ...digitalStyle,
            },
          },
        ],
      },
      {
        component: 'div',
        props: {
          $style: {
            marginTop: '100px',
            position: 'relative',
            lineHeight: '49px',
            width: '400px',
            paddingLeft: '14px',
            borderTop: '1px solid rgba(255, 255, 255, .1)',
          },
        },
        children: [
          {
            component: 'span',
            content: '现所选区域：',
            props: {
              $style: {
                color: '#8f919f',
                fontSize: '14px',
                lineHeight: '1',
                fontWeight: '500',
              },
            },
          },
          {
            component: 'span',
            content: "{{craneStates.currentArea ? craneStates.currentArea : '全部园区'}}",
            props: {
              $style: {
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: '1',
                fontWeight: '500',
              },
            },
          }
        ],
      },
      {
        component: '@byzanteam/vis-components/brick-input',
        props: {
          placeholder: '请输入',
          size: 'large',
        },
        directive: {
          model: 'craneStates.filterKey',
        },
        children: [
          {
            component: 'template',
            slot: 'head',
            children: [
              {
                component: '@byzanteam/vis-components/brick-icon',
                props: {
                  name: 'search',
                },
              },
            ],
          },
          {
            component: 'template',
            slot: 'tail',
            directive: {
              if: 'craneStates.filterKey',
            },
            children: [
              {
                component: '@byzanteam/vis-components/brick-icon',
                events: {
                  click: {
                    actions: ["setState('filterKey', '')"],
                  },
                },
                props: {
                  name: 'times-circle',
                },
              },
            ],
          },
        ],
      },
      {
        component: '@byzanteam/vis-components/data-loader',
        props: {
          $data: "[['陴都区金和塑料厂', '分类1'], ['aaa工厂', '分类2']]",
          $url: "`/v1/components/b758b6d2-e8d0-41bb-b24a-58228e1fb576/data?table=${craneStates.routerMap[routeParams.table]}&${craneStates.currentArea?'&area=\\''+craneStates.currentArea+'\\'':''}`",
          $style: {
            width: '400px',
            height: '296px',
          },
        },
        exports: {
          results: 'results',
        },
        children: [
          {
            component: '@byzanteam/vis-components/vis-table',
            props: {
              $data: '(results||[]).filter((item)=>!craneStates.filterKey||item[0].indexOf(craneStates.filterKey)>-1).map((item,i)=>({index:i+1,name:item[0],category:item[1]}))',
              theme: 'dark',
              $headers: "[{width: 40, key: 'index', title: ''}, {width: 220, key: 'name', title: '企业名称'}, {width: 140, key: 'category', title: '行业属性'}]",
            },
            children: [
              {
                component: 'template',
                exports: {
                  cell: 'cell',
                  columnKey: 'columnKey',
                },
                children: [
                  {
                    component: 'span',
                    content: '{{cell}}',
                    props: {
                      $class: "columnKey === 'index' ? 'row-index-cell' : ''",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        component: '@byzanteam/vis-components/data-loader',
        position: [0, 512],
        props: {
          $data: "[]",
          $url: "`/v1/components/1aebcfcb-3de4-4259-b880-fbd9a7da7a4f/data?table=${craneStates.routerMap[routeParams.table]}&industry='${craneStates.barChartIndustries.join('\\',\\'')}'${craneStates.currentArea?'&area=\\''+craneStates.currentArea+'\\'':''}`",
          $style: {
            width: '400px',
            height: '280px',
          },
        },
        exports: {
          results: 'results',
        },
        children: [
          {
            component: '@byzanteam/graphite/vertical-bar',
            props: {
              $data: "results.map((item) => ({key: item[0], value: item[1]}))",
              labelKey: 'key',
              valueKey: 'value',
              $crossAxis: {
                $range: {
                  $count: 6,
                },
                $lineStyle: {
                  stroke: 'transparent',
                },
                $labelStyle: {
                  $size: 12,
                  color: '#fff',
                },
                unit: '个',
              },
              $series: "[['#007afe', '#007afe33']]",
              $mainAxis: {
                $labelStyle: {
                  $rotate: -45,
                  $size: 12,
                  color: '#fff',
                },
                $labelLength: 9,
                $lineStyle: {
                  stroke: 'transparent',
                },
              },
              $theme: {
                background: 'transparent',
              },
              $labels: "[{ fill: '#fff', stroke: '#fff', size: 12}]",
              $tooltipOptions: {
                background: 'rgba(60, 71, 89, .9)',
                $text: {
                  $size: 14,
                  fill: '#ffffff',
                },
                $title: {
                  fill: '#fff',
                },
              },
            },
          },
        ],
      },
    ],
  },
  donutComponent,
]
