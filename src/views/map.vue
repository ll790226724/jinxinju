<template>
  <div class="map">
    <brick-input ref="search-input" @input="(value)=>[setSearchValue(value)]" placeholder="请输入关键词" :value="craneStates.searchValue" :style="{width: '400px', height: '50px', backgroundColor: '#1f2440', borderRadius: '4px', position: 'absolute', top: '30px', left: '40px'}">
      <template ref="search-input-prefix-template" v-slot:head>
        <brick-icon ref="search-input-prefix-icon" name="search" color="rgba(255, 255, 255, 0.4)" />
      </template>
      <template ref="search-input-prefix-template" v-slot:tail>
        <brick-tooltip v-if="craneStates.searchValue" content="清除" placement="bottom-center">
          <brick-icon ref="search-input-prefix-icon" @click="()=>[setState('searchValue', '')]" name="times-circle" color="rgba(255, 255, 255, 0.4)" />
        </brick-tooltip>
      </template>
    </brick-input>
    <data-loader ref="map-component" v-slot="{ results: results }" @requestDone="()=>[setState('markersData', getComponent('map-component').results)]" :url="`/v1/components/48d69e96-7ba5-40ba-946d-d0c84058f352/data?table=${craneStates.routerMap[routeParams.table]}${craneStates.mapCommunities}&minLng=${craneStates.mapBounds.southwest.lng}&maxLng=${craneStates.mapBounds.northeast.lng}&minLat=${craneStates.mapBounds.southwest.lat}&maxLat=${craneStates.mapBounds.northeast.lat}`" method="get" :data="[['', '', [0, 0]]]" :style="{width: '100%', height: '100%', transform: getMapScale(), position: 'absolute', top: '0px', left: '0px'}">
        <base-map ref="mapRef" @map-created="(map)=>[setState('mapBounds', map.getBounds()), $refs.mapRef.setCenter(craneStates.streetLntlatsMap[routeParams.street])]" @map-resize="(bounds)=>[setState('mapBounds', bounds)]" @map-click="(bounds)=>[Object.keys(craneStates.currentClusterContext).length !== 0 ? craneStates.currentClusterContext.setContent(craneStates.currentClusterContext.getContent().replace(/selectedCluster/, 'normalCluster')) : '', getComponent('mapRef').map.setStatus({zoomEnable: true, dragEnable: true,})]" :mapOptions="{center: [103.89682,30.793154], zoom: 17, zooms: [11, 20]}" mapStyle="amap://styles/b31f276415bcbad48ed365bfa6651249" :style="{width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}">
          <cluster ref="clusterRef" v-for="(item, key) in markerGroup" :key="key" @marker-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @marker-clicked="(marker)=>[setState('companyShow', true), setState('company', marker.target.getExtData()), setState('companyCloseIconShow', true)]" @clusterClick="(cluster)=>[clusterClickFunc(cluster)]" :clusterContent="craneStates.markerValueMap[key].clusterContent" :points="item" :markerContent="craneStates.markerValueMap[key].markerContent" :options="{zoomOnClick: false}" />
        <info-window ref="infowindowRef" />
      </base-map>
    </data-loader>
    <data-loader ref="search-list-data" v-slot="{ response: response }" :url="`/v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data?table=${craneStates.routerMap[routeParams.table]}&name=%25${craneStates.searchValue}%25${craneStates.mapCommunities}&page=${craneStates.page}&per_page=20`" method="get" :data="{data: [['']], pageInfo: {total: 0}}" :style="{position: 'absolute', top: '84px', left: '40px'}">
      <div ref="search-list-container" v-show="craneStates.searchValue && !craneStates.companyShow && response.data" :style="{padding: '10px 0', backgroundColor: '#1f2440', maxHeight: '970px', overflow: 'hidden', borderRadius: '4px'}">
        <div ref="search-list-container" v-if="response" :style="{width: '400px', maxHeight: '950px', backgroundColor: '#1f2440', overflow: 'scroll'}">
          <brick-list class="search-list">
            <brick-list-optional-item ref="search-list-item" v-for="(item, index) in response.data" :key="index" @click="()=>[setState('company', {name: [item[1]], lnglat: item[17]}), setState('companyShow', true), setState('companyCloseIconShow', false)]" :item="{}" :index="index + 1">
              <span ref="search-list-item-name" :style="{display: 'inline-block', width: '325px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '16px', lineHeight: '24px'}">
                {{item[1]}}
              </span>
              <template ref="search-list-item-description-template" v-slot:description>
                <span :style="{display: 'inline-block', width: '325px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '14px', lineHeight: '21px'}">
                  {{item[2]}}
                </span>
              </template>
            </brick-list-optional-item>
          </brick-list>
          <pagination ref="search-paginator" @page-changed="({ currentPage, perPage })=>[setState('page', currentPage)]" v-if="response.pageInfo && response.pageInfo.total > 20" :showTotalCount="false" :showPerPage="false" :showJumper="false" :totalCount="response.pageInfo.total" :style="{height: '70px', justifyContent: 'center'}" />
        </div>
      </div>
    </data-loader>
    <div ref="company-container" v-if="craneStates.companyShow" :style="{width: '400px', maxHeight: '970px', position: 'absolute', top: '84px', left: '40px', backgroundColor: '#1f2440', borderRadius: '4px', overflow: 'scroll'}">
      <data-loader ref="company-data" v-slot="{ response: response }" :url="encodeURI(`v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data?table=${craneStates.routerMap[routeParams.table]}&name=%${craneStates.company.name}%`)" method="get" :data="{data: [[]]}">
        <div v-if="response" :style="{position: 'relative', padding: '35px 16px', backgroundImage: 'url(/piduzxqy/images/map-head-bg.png)', borderRadius: '4px 4px 0 0'}">
          <div ref="company-name-container" v-if="response" :style="{display: 'flex', alignItems: 'center'}">
            <img ref="close-icon" @click="()=>[setState('companyShow', false)]" v-if="craneStates.companyCloseIconShow" src="/piduzxqy/images/Icon-Close.svg" :style="{width: '16px', cursor: 'pointer'}" />
            <img ref="arrow-icon" @click="()=>[setState('companyShow', false)]" src="/piduzxqy/images/Icon-Back.svg" :style="{width: '16px', cursor: 'pointer'}" v-else />
            <span ref="arrow-icon-text" :style="{color: '#fff', fontSize: '18px', fontWeight: '600', marginLeft: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}">
              {{ response.data[0][1] }}
            </span>
          </div>
        </div>
        <table ref="details-table" v-if="response">
          <tr ref="industry-tr" v-for="(item, key) in response.schema" :key="key" v-if="craneStates.tableKeyMap[item.field]" :style="{borderBottom: '1px solid rgba(255, 255, 255, .03)'}">
            <td ref="industry-th" :style="{width: '140px', verticalAlign: 'middle', padding: '20px 8px ', borderRight: '1px solid rgba(255, 255, 255, .03)', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400, lineHeight: '20px', textAlign: 'left', fontSize: '14px'}">
              {{craneStates.tableKeyMap[item.field]}}
            </td>
            <td ref="details-dependency-td" :style="{width: '260px', verticalAlign: 'middle', padding: '20px 8px ', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400, lineHeight: '20px', textAlign: 'left', fontSize: '14px'}">
              {{ response.data[0][key] }}
            </td>
          </tr>
        </table>
      </data-loader>
    </div>
    <data-loader ref="multipe-select-component" v-slot="{ results: results }" @requestDone="()=>[setState('communities', getComponent('multipe-select-component').results)]" :url="`/v1/components/80a9cb47-606d-48f1-952d-7b03d1c238fd/data?table=${craneStates.routerMap[routeParams.table]}`" method="get" :data="[['']]" :style="{width: '342px', height: '53px', position: 'absolute', top: '30px', left: '1540px'}">
      <vis-multiple-select ref="select" v-model="craneStates.selectOptions" placeholder="全部类型" labelKey="label" valueKey="value" :options="results.map((result, index) => {return {label: result[0], value: result[0], color: craneStates.colorMap[index % 19]}})">
        <template ref="select-value-template" v-slot:value="{option}">
          <div ref="select-value-container">
            <span ref="select-value-badge" :style="{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: option.color, marginRight: '8px', display: 'inline-block'}" />
            <span ref="select-value-text">
              {{ option.label }}
            </span>
          </div>
        </template>
        <template ref="select-item-template" v-slot="{option}">
          <div ref="select-item-container">
            <span ref="select-item-badge" :style="{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: option.color, marginRight: '8px', display: 'inline-block'}" />
            <span ref="select-item-text">
              {{ option.label }}
            </span>
          </div>
        </template>
      </vis-multiple-select>
    </data-loader>
    <brick-button ref="back-button" @click="()=>[$router.push(`/${routeParams.table}`)]" color="blue" :style="{position: 'absolute', top: '43px', left: '453px'}">
      返回上一级
    </brick-button>
  </div>
</template>

<script>
import BuiltInMixin from '../mixins/built_in'
import {
  BrickInput,
  BrickIcon,
  DataLoader,
  BrickList,
  BrickListOptionalItem,
  Pagination,
  VisMultipleSelect,
  BrickButton,
} from '@byzanteam/vis-components'
import {
  BrickTooltip,
} from '@byzanteam/brick'
import {
  BaseMap,
  Cluster,
  InfoWindow,
} from '@byzanteam/map-ui'

export const map = {
  mixins: [BuiltInMixin],

  components: {
    BrickInput,
    BrickIcon,
    DataLoader,
    BrickList,
    BrickListOptionalItem,
    Pagination,
    VisMultipleSelect,
    BrickButton,
    BrickTooltip,
    BaseMap,
    Cluster,
    InfoWindow,
  },

  data () {
    return {
      craneStates: {
        searchValue: '',
        company: '',
        page: 1,
        selectOptions: [],
        companyShow: false,
        routerMap: {staff: 'nice_enterprise', slw: 'bad_enterprise'},
        mapBounds: {southwest: {lat: 0, lng: 0}, northeast: {lat: 0, lng: 0}},
        communities: [],
        companyCloseIconShow: false,
        markerValueMap: {行业: {clusterContent: {}, markerContent: {}, labelStyle: {}}},
        markerStyles: [],
        mapCommunities: '',
        colorMap: ['#007afe', '#dece84', '#8f919f', '#dc5f5f', '#f7b267', '#4fa8f1', '#2ec4b6', '#bed8d4', '#627592', '#5fd6dc', '#7d5fdc', '#7dcfef', '#2e81c4', '#979eda', '#4b4b4b', '#dc5f9a', '#7dcfef', '#f76767', '#c08185'],
        tableKeyMap: {CompanyName: '公司名字', Industry: '所属行业', CorporateTerritory: '企业属地', UnifiedSocialCreditCode: '统一社会信用代码', BusinessScope: '经营范围', MainProducts: '主要产品', LegalRepresentative: '法人代表', ContactNumber: '联系电话', EIAApprovalNumber: '环评批复（备案）', MainBusinessIncome: '上一年度主营收入', InboundTax: '上一年度入库税金', ProductionAddress: '生产地址'},
        streetLntlatsMap: {唐昌街道: [103.824336, 30.92366], 三道堰街道: [103.915939, 30.862178], 安德街道: [103.80584, 30.870687], 友爱街道: [103.795132, 30.823379], 团结街道: [103.978343, 30.816234], 郫筒街道: [103.887996, 30.807641], 红光街道: [103.945588, 30.784785], 犀浦街道: [103.972796, 30.753811], 川菜园区: [103.812872, 30.865116], 现代工业港: [103.92972, 30.802213], 德源街道: [103.853417, 30.774637], 安靖街道: [104.018228, 30.759085]},
        companyType: '合规企业',
        currentClusterContext: {},
        markersData: [],
      },
    }
  },

  computed: {
    markerGroup () {
      // markerGroup在cluster组件中作为data使用
      const markers = this.craneStates.markersData.map((marker) => {return {name: marker[0], industry: marker[1], location: [marker[2][1], marker[2][0]], offset: [-6, -7]}});
      // markersData,在requestDone里被赋值（请求回来的results）
      // marker是有companyName, industry, location三个属性
      // return回来的marker增加了一个属性，offset
      return _.groupBy(markers, (result) => result.industry)
      // 根据行业将marker分组
    }
  },

  watch: {
    // craneStates.communities,在multiSelect组件中被赋值，赋值选中的行业
    'craneStates.communities' (value) {
      value.forEach((result, index) => {
        this.craneStates.markerValueMap[result[0]] = {
          // result[0],multiSelect选中的值
          clusterContent: (context) => {
            const node = `<div class="normalCluster" style="border: 2px solid #284159A6; border-radius: 50%;">
              <div style='width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: ${this.craneStates.colorMap[index % 19]};
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                color: white;'
                >
                ${context.count}
              </div>
            </div>`
            context.marker.setContent(node);
          },
          markerContent: `<div style="background-color: ${this.craneStates.colorMap[index % 19]}; height: 12px; width: 12px; border-radius: 50%;"></div>`,
        }
        this.craneStates.markerStyles.push({
          url: `/piduzxqy/images/circle${index % 19}.svg`,
          anchor: [6, 6],
          size: [10, 10]
        })
      })
    },
    'craneStates.company': {
      handler (value) {
        const content = `<div>${value.name}</div>`
        const location = value.lnglat
        this.$refs.infowindowRef.createInfoWindow(content, location)
        this.$refs.mapRef.map.setCenter(location)
      },
    },
    'craneStates.selectOptions' (value) {
      if(value.length === 0) {
        this.craneStates.mapCommunities = ''
      } else {
        this.craneStates.mapCommunities = this.genarateCommunities()
      }
    },
    'craneStates.searchValue' () {
      this.setState('companyShow', false)
    },
    // 清空
    'craneStates.markersData' () {
      if(this.$refs.clusterRef) {
        this.$refs.clusterRef.forEach((component) => {
          component.cluster.setMap(null)
        })
      }
    }
  },

  created () {
    if(this.routeParams.table === 'slw') {
      this.craneStates.companyType = '散乱污企业'
    } else {
      this.craneStates.companyType = '合规企业'
    }
    document.title = this.craneStates.companyType
  },

  methods: {
    genarateCommunities () {
      return _.reduce(this.craneStates.selectOptions, (acc, option, index) => {
        if(index === this.craneStates.selectOptions.length -1) {
          return `${acc}'${option}'`
        }
        return `${acc}'${option}',`
      }, '&industry=')
    },
    setSearchValue: _.debounce(function(value) {
      this.setState('searchValue', value)
    }, 300),
    getMapScale () {
      const scaleValue = document.body.style.transform.match(/scale\(([\.\d]+)\)/)[1]
      return `scale(${1/scaleValue})`
    },
    markerMouseoverFunc (marker) {
      const data = marker.target.getExtData()
      const content = `<div class='info-container'>${data['name']}</div>`
      const location = data.location
      this.$refs.infowindowRef.createInfoWindow({content: content, location: location})
      this.$refs.mapRef.map.setStatus({zoomEnable: false, dragEnable: false,})
    },
    generateClusterInfoWindow(cluster) {
      const list = document.createElement('div');
      list.classList.add('info-list');
      cluster.markers.forEach((marker) => {
        const item = document.createElement('div');
        item.classList.add('info-list-item');
        item.innerHTML = marker.getExtData()['name'];
        item.setAttribute('title', marker.getExtData()['name'])
        item.addEventListener('click', () => {
          console.log(marker.getExtData())
          this.setState('company', marker.getExtData())
          this.setState('companyShow', true)
        })
        list.appendChild(item)
      })
      const container = document.createElement('div');
      container.classList.add('info-container');
      container.appendChild(list)
      return container
    },
    clusterClickFunc (cluster) {
      this.getComponent('infowindowRef').createInfoWindow({
        content: this.generateClusterInfoWindow(cluster),
        location: cluster.lnglat,
        offset: [9, -39]}
      );
      this.getComponent('mapRef').map.setStatus(
        {
          zoomEnable: false,
          dragEnable: false,
        }
      )
      cluster.cluster.marker.setContent(cluster.cluster.marker.getContent().replace(/normalCluster/, 'selectedCluster'))
      if(!_.isEmpty(this.craneStates.currentClusterContext)) {
        this.craneStates.currentClusterContext.setContent(this.craneStates.currentClusterContext.getContent().replace(/selectedCluster/, 'normalCluster'))
      }
      this.setState('currentClusterContext', cluster.cluster.marker)
    }
  }
}
export default map
</script>
