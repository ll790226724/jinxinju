<template>
  <div class="map">
    <brick-input ref="search-input" @input="(value)=>[setSearchValue(value)]" placeholder="请输入关键词" :value="craneStates.searchValue" :style="{width: '384px', height: '50px', backgroundColor: '#1f2440', position: 'absolute', top: '30px', left: '40px'}">
      <template ref="search-input-prefix-template" v-slot:head>
        <brick-icon ref="search-input-prefix-icon" name="search" color="rgba(255, 255, 255, 0.4)" />
      </template>
      <template ref="search-input-prefix-template" v-slot:tail>
        <brick-tooltip v-if="craneStates.searchValue" content="清除" placement="bottom-center">
          <brick-icon ref="search-input-prefix-icon" @click="()=>[setState('searchValue', '')]" name="times-circle" color="rgba(255, 255, 255, 0.4)" />
        </brick-tooltip>
      </template>
    </brick-input>
    <data-loader ref="map-component" v-slot="{ results: results }" :url="`/v1/components/48d69e96-7ba5-40ba-946d-d0c84058f352/data?table=nice_enterprise${craneStates.mapCommunities}&minLng=${craneStates.mapBounds.southwest.lng}&maxLng=${craneStates.mapBounds.northeast.lng}&minLat=${craneStates.mapBounds.southwest.lat}&maxLat=${craneStates.mapBounds.northeast.lat}`" method="get" :data="[['', '', [0, 0]]]" :style="{width: '100%', height: '100%', transform: getMapScale(), position: 'absolute', top: '0px', left: '0px'}">
      <base-map ref="mapRef" @map-created="(map)=>[setState('mapBounds', map.getBounds()), $refs.mapRef.setCenter(craneStates.streetLntlatsMap[routeParams.street])]" @map-resize="(bounds)=>[setState('mapBounds', bounds)]" :mapOptions="{center: [103.89682,30.793154], zoom: 17, zooms: [11, 20]}" mapStyle="amap://styles/b31f276415bcbad48ed365bfa6651249" :style="{width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}">
        <mass-marker ref="markers" @mass-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @mass-mouseout="(marker)=>[markerMouseoutFunc(marker)]" @mass-clicked="(marker)=>[setState('companyShow', true), setState('company', marker.data), setState('companyCloseIconShow', true)]" v-if="results" :markers="results.map((result) => {return {name: result[0], type: result[1], lnglat: result[2], style: craneStates.markerValueMap[result[1]]}})" :styles="craneStates.markerStyles" :options="{opacity: 1}" />
        <info-window ref="infowindowRef" />
      </base-map>
    </data-loader>
    <data-loader ref="search-list-data" v-slot="{ response: response }" :url="`/v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data?table=nice_enterprise&name=%25${craneStates.searchValue}%25${craneStates.mapCommunities}&page=${craneStates.page}&per_page=20`" method="get" :data="{data: [['']], pageInfo: {total: 0}}" :style="{position: 'absolute', top: '84px', left: '40px'}">
      <div ref="search-list-container" v-show="craneStates.searchValue && !craneStates.companyShow && response.data" :style="{padding: '10px 0', backgroundColor: '#1f2440', maxHeight: '970px', overflow: 'hidden'}">
        <div ref="search-list-container" v-if="response" :style="{width: '400px', maxHeight: '950px', backgroundColor: '#1f2440', overflow: 'scroll'}">
          <brick-list class="search-list">
            <brick-list-optional-item ref="search-list-item" v-for="(item, index) in response.data" :key="index" @click="()=>[setState('company', item), setState('companyShow', true), setState('companyCloseIconShow', false)]" :item="{}" :index="index + 1">
              <span ref="search-list-item-name" :style="{display: 'inline-block', width: '325px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}">
                {{item[0]}}
              </span>
              <template ref="search-list-item-description-template" v-slot:description>
                <span :style="{display: 'inline-block', width: '325px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}">
                  {{item[1]}}
                </span>
              </template>
            </brick-list-optional-item>
          </brick-list>
          <pagination ref="search-paginator" @page-changed="({ currentPage, perPage })=>[setState('page', currentPage)]" v-if="response.pageInfo && response.pageInfo.total > 20" :showTotalCount="false" :showPerPage="false" :showJumper="false" :totalCount="response.pageInfo.total" :style="{height: '70px', justifyContent: 'center'}" />
        </div>
      </div>
    </data-loader>
    <div ref="company-container" v-if="craneStates.companyShow" :style="{width: '400px', maxHeight: '970px', position: 'absolute', top: '84px', left: '40px', backgroundColor: 'rgb(26, 29, 57)'}">
      <data-loader ref="company-data" v-slot="{ response: response }" :url="encodeURI(`v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data?table=nice_enterprise&name=%${craneStates.company[0]}%`)" method="get" :data="{data: [[]]}">
        <div v-if="response" :style="{position: 'relative', padding: '35px 16px 24px 16px', backgroundImage: 'url(/jingxinju/images/map-head-bg.png)', backgroundPosition: '100% 100%'}">
          <div ref="company-name-container" v-if="response" :style="{display: 'flex', alignItems: 'center'}">
            <img ref="close-icon" @click="()=>[setState('companyShow', false)]" v-if="craneStates.companyCloseIconShow" src="/jingxinju/images/Icon-Close.svg" :style="{width: '16px', cursor: 'pointer'}" />
            <img ref="arrow-icon" @click="()=>[setState('companyShow', false)]" src="/jingxinju/images/Icon-Back.svg" :style="{width: '16px', cursor: 'pointer'}" v-else />
            <span ref="arrow-icon-text" :style="{color: '#fff', fontSize: '18px', fontWeight: '600', marginLeft: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}">
              {{ response.data[0][0] }}
            </span>
          </div>
        </div>
        <table ref="details-table" v-if="response">
          <tr ref="industry-tr" v-for="(item, key) in response.schema" :key="key" v-if="craneStates.tableKeyMap[item.field]" :style="{borderBottom: '1px  solid  rgba(255, 255, 255, .03)'}">
            <td ref="industry-th" :style="{width: '140px', verticalAlign: 'middle', padding: '10px 8px ', borderRight: '1px, solid, rgba(255, 255, 255, .03)', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400, lineHeight: '20px', textAlign: 'left', fontSize: '14px'}">
              {{craneStates.tableKeyMap[item.field]}}
            </td>
            <td ref="details-dependency-td" :style="{width: '260px', verticalAlign: 'middle', padding: '10px 8px ', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 400, lineHeight: '20px', textAlign: 'left', fontSize: '14px'}">
              {{ response.data[0][key] }}
            </td>
          </tr>
        </table>
      </data-loader>
    </div>
    <data-loader ref="multipe-select-component" v-slot="{ results: results }" @requestDone="()=>[setState('communities', getComponent('multipe-select-component').results)]" url="/v1/components/80a9cb47-606d-48f1-952d-7b03d1c238fd/data?table=nice_enterprise" method="get" :data="[['']]" :style="{width: '342px', height: '53px', position: 'absolute', top: '30px', left: '1540px'}">
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
    <brick-button ref="back-button" @click="()=>[$router.go(-1)]" color="blue" :style="{position: 'absolute', top: '43px', left: '453px'}">
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
  MassMarker,
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
    MassMarker,
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
        mapBounds: {southwest: {lat: 0, lng: 0}, northeast: {lat: 0, lng: 0}},
        communities: [],
        companyCloseIconShow: false,
        markerValueMap: {},
        markerStyles: [],
        mapCommunities: '',
        colorMap: ['#007afe', '#dece84', '#8f919f', '#dc5f5f', '#f7b267', '#4fa8f1', '#2ec4b6', '#bed8d4', '#627592', '#5fd6dc', '#7d5fdc', '#7dcfef', '#2e81c4', '#979eda', '#4b4b4b', '#dc5f9a', '#7dcfef', '#f76767', '#c08185'],
        tableKeyMap: {companyname: '公司名字', industry: '所属行业', corporateterritory: '企业属地', unifiedsocialcreditcode: '统一社会信用代码', businessscope: '经营范围', mainproducts: '主要产品', legalrepresentative: '法人代表', contactnumber: '联系电话', eiaapprovalnumber: '环评批复（备案）', mainbusinessincome: '上一年度主营收入', inboundtax: '上一年度入库税金', productionaddress: '生产地址'},
        streetLntlatsMap: {唐昌街道: [103.824336, 30.92366], 三道堰街道: [103.915939, 30.862178], 安德街道: [103.80584, 30.870687], 友爱街道: [103.795132, 30.823379], 团结街道: [103.978343, 30.816234], 郫筒街道: [103.887996, 30.807641], 红光街道: [103.945588, 30.784785], 犀浦街道: [103.972796, 30.753811], 川菜园区: [103.812872, 30.865116], 现代工业港: [103.92972, 30.802213], 德源街道: [103.853417, 30.774637], 安靖街道: [104.018228, 30.759085]},
      },
    }
  },

  watch: {
    'craneStates.communities' (value) {
      value.forEach((result, index) => {
        this.craneStates.markerValueMap[result[0]] = index + 1
        this.craneStates.markerStyles.push({
          url: `/jingxinju/images/circle${index % 19}.svg`,
          anchor: [6, 6],
          size: [10, 10]
        })
      })
    },
    'craneStates.company': {
      handler (value) {
        const content = `<div>${value[0]}</div>`
        const location = value[3]
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
    }
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
      const scaleValue = document.body.style.transform.match(/(?<=\().*?(?=\))/)[0]
      return `scale(${1/scaleValue})`
    },
    markerMouseoverFunc (marker) {
      const content = `<div>${marker.data.name}</div>`
      const location = marker.data.lnglat
      this.$refs.infowindowRef.createInfoWindow(content, location)
    },
    markerMouseoutFunc () {
      this.$refs.infowindowRef.close()
    }
  }
}
export default map
</script>
