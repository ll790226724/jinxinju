module.exports = {
  id: 'multipe-select-component',
  component: '@byzanteam/vis-components/data-loader',
  position: [1540, 30],
  exports: {
    results: 'results',
  },
  props: {
    url: '/v1/components',
    method: 'post',
    $data: "[{community: ''}]",
    $style: {
      width: '342px',
      height: '53px',
    },
    $params: 'selectParams'
  },
  events: {
    'requestDone': {
      actions: ["setState('communities', getComponent('multipe-select-component').results.data)"]
    }
  },
  children: [
    {
      id: 'select',
      component: '@byzanteam/vis-components/vis-multiple-select',
      props: {
        'v-model': 'craneStates.selectOptions',
        placeholder: "全部区域",
        labelKey: 'label',
        valueKey: 'value',
        $options: 'results.map((result, index) => {return {label: result.community, value: result.community, color: colorMap[index % 19]}})'
      },
      children: [
        {
          id: 'select-value-template',
          component: 'template',
          slot: 'value={option}',
          children: [
            {
              id: 'select-value-container',
              component: 'div',
              $style: {
                display: 'flex',
                alignItems: 'center'
              },
              children:[
                {
                  id: 'select-value-badge',
                  component: 'span',
                  props: {
                    $style: {
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      $backgroundColor: 'option.color',
                      marginRight: '8px',
                      display: 'inline-block',
                    }
                  }
                },
                {
                  id: 'select-value-text',
                  component: 'span',
                  content: '{{ option.label }}'
                }
              ]
            }
          ]
        },
        {
          id: 'select-item-template',
          component: 'template',
          slot: '{option}',
          children: [
            {
              id: 'select-item-container',
              component: 'div',
              $style: {
                display: 'flex',
                alignItems: 'center'
              },
              children:[
                {
                  id: 'select-item-badge',
                  component: 'span',
                  props: {
                    $style: {
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      $backgroundColor: 'option.color',
                      marginRight: '8px',
                      display: 'inline-block',
                    }
                  }
                },
                {
                  id: 'select-item-text',
                  component: 'span',
                  content: '{{ option.label }}'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
