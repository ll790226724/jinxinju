module.exports = {
  id: 'search-list-data',
  component: '@byzanteam/vis-components/data-loader',
  position: [40, 84],
  exports: {
    response: '{data: results, total: totalCount}',
  },
  props: {
    url: '/v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data',
    method: 'post',
    $data: "{data: [{community: '', ['单位详细名称']: ''}], totalCount: 0}",
    $params: {
      $name: 'craneStates.searchValue',
      industry: '',
      $page: 1,
      $per_page: 20
    }
  },
  children: [
    {
      id: 'search-list-container',
      component: 'div',
      props: {
        'v-show': 'craneStates.searchValue && !craneStates.companyShow && results',
        $style: {
          padding: '10px 0',
          backgroundColor: '#1f2440',
          maxHeight: '970px',
          overflow: 'hidden'
        }
      },
      children: [
        {
          id: 'search-list-container',
          component: 'div',
          props: {
            $style: {
              width: '400px',
              maxHeight: '950px',
              backgroundColor: '#1f2440',
              padding: '10px 0',
              overflow: 'scroll',
            }
          },
          children: [
            {
              component: '@byzanteam/brick/brick-list',
              props: {
                class: 'search-list',
              },
              children: [
                {
                  id: 'search-list-item',
                  component: '@byzanteam/brick/brick-list-optional-item',
                  vfor: {
                    data: 'results',
                    exports: {item: 'item', index: 'index'}
                  },
                  props: {
                    $item: 'item',
                    $index: 'index + 1',
                  },
                  events: {
                    'click': {
                      actions: ["setState('company', item)", "setState('companyShow', true)", "setState('companyCloseIconShow', false)"]
                    }
                  },
                  children: [
                    {
                      id: 'search-list-item-name',
                      component: 'span',
                      content: '{{item["单位详细名称"]}}'
                    },
                    {
                      id: 'search-list-item-description-template',
                      component: 'template',
                      slot: 'description',
                      children: [
                        {
                          id: 'search-list-item-description-wrapper',
                          component: 'div',
                          props: {
                            $style: {
                              display: 'flex',
                            }
                          },
                          children: [
                            {
                              id: 'search-list-item-description-icon',
                              component: 'img',
                              props: {
                                src: '/jingxinju/images/Icon-Positioning.svg',
                                $style: {
                                  width: '14px',
                                  height: '14px',
                                  position: 'relative',
                                  top: '3px',
                                  marginRight: '4px',
                                }
                              }
                            },
                            {
                              component: 'div',
                              content: '{{item.community}}',
                              props:{
                                class: 'search-list-item-description-text',
                                $style: {
                                  color: '#8f919f',
                                  fontSize: '14px',
                                  lineHeight: '21px',
                                  width: '325px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }
                              }
                            }
                          ]
                        }
                      ],
                    }
                  ],
                }
              ],
            },
            {
              id: 'search-paginator',
              component: '@byzanteam/brick/pagination',
              events: {
                'page-changed': {
                  params: ['{ currentPage, perPage }'],
                  actions: ["setState('page', currentPage)"]
                }
              },
              props: {
                'v-if': 'totalCount > 20',
                $showTotalCount: 'false',
                $showPerPage: 'false',
                $showJumper: 'false',
                $totalCount: 'totalCount',
                $style: {
                  height: '70px'
                }
              }
            }
          ]
        },
      ],
    }
  ]
}
