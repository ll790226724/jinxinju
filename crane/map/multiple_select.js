module.exports = {
  id: 'multipe-select-component',
  component: '@byzanteam/vis-components/data-loader',
  position: [1540, 30],
  exports: {
    results: 'results',
  },
  props: {
    $url: "`/v1/components/80a9cb47-606d-48f1-952d-7b03d1c238fd/data?table=${routeParams.table}`",
    method: 'get',
    $data: "[['']]",
    $style: {
      width: '342px',
      height: '53px',
    },
  },
  events: {
    'requestDone': {
      actions: ["setState('communities', getComponent('multipe-select-component').results)"]
    }
  },
  children: [
    {
      id: 'select',
      component: '@byzanteam/vis-components/vis-multiple-select',
      props: {
        'v-model': 'craneStates.selectOptions',
        placeholder: "全部类型",
        labelKey: 'label',
        valueKey: 'value',
        $options: 'results.map((result, index) => {return {label: result[0], value: result[0], color: craneStates.colorMap[index % 19]}})'
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
