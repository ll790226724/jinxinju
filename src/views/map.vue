<template>
  <div class="map">
    <brick-input ref="search-input" @change="(value)=>[setState('searchValue', value)]" placeholder="请输入关键词" :style="{width: '400px', height: '50px', position: 'absolute', top: '30px', left: '40px'}">
      <template ref="search-input-prefix-template" v-slot:head>
        <brick-icon ref="search-input-prefix-icon" name="search" color="rgba(255, 255, 255, 0.4)" />
      </template>
      <template ref="search-input-prefix-template" v-slot:tail>
        <brick-tooltip v-if="craneStates.searchValue" content="清除" placement="bottom-center">
          <brick-icon ref="search-input-prefix-icon" @click="()=>[setState('searchValue', '')]" name="times-circle" color="rgba(255, 255, 255, 0.4)" />
        </brick-tooltip>
      </template>
    </brick-input>
    <data-loader ref="map-component" v-slot="{ results: results }" :url="`/v1/components/48d69e96-7ba5-40ba-946d-d0c84058f352/data?table=nice_enterprise&minLng=${this.craneStates.mapBounds.southwest.lng}&maxLng=${this.craneStates.mapBounds.northeast.lng}&minLat=${this.craneStates.mapBounds.southwest.lat}&maxLat=${this.craneStates.mapBounds.northeast.lat}`" method="get" :data="[['', '', [0, 0]]]" :style="{width: '100%', height: '100%', transform: getMapScale(), position: 'absolute', top: '0px', left: '0px'}">
      <base-map ref="mapRef" @map-created="(map)=>[setState('mapBounds', map.getBounds())]" @map-resize="(bounds)=>[setState('mapBounds', bounds)]" :mapOptions="{center: [103.89682,30.793154], zoom: 11, zooms: [11, 20]}" mapStyle="amap://styles/b31f276415bcbad48ed365bfa6651249" :style="{width: '100%', height: '100%', position: 'absolute', top: '0px', left: '0px'}">
        <mass-marker ref="markers" @mass-mouseover="(marker)=>[markerMouseoverFunc(marker)]" @mass-mouseout="(marker)=>[markerMouseoutFunc(marker)]" @mass-clicked="(marker)=>[setState('companyShow', true), setState('company', marker.data), setState('companyCloseIconShow', true)]" :markers="results.map((result) => {return {name: result[0], type: result[1], lnglat: result[2], style: craneStates.markerValueMap[result[1]]}})" :styles="craneStates.markerStyles" :options="{opacity: 1}" />
        <info-window ref="infowindowRef" />
      </base-map>
    </data-loader>
    <data-loader ref="search-list-data" v-slot="{ response: {data, pageInfo: { total }} }" :url="`/v1/components/c35cf824-badf-422a-8b14-b285329b99a3/data?table=nice_enterprise&name=%25${craneStates.searchValue}%25&industry=${craneStates.mapCommunities}&page=${craneStates.page}&per_page=20`" method="get" :data="{data: [['']], pageInfo: {total: 0}}" :style="{position: 'absolute', top: '84px', left: '40px'}">
      <div ref="search-list-container" v-show="craneStates.searchValue && !craneStates.companyShow && data" :style="{padding: '10px 0', backgroundColor: '#1f2440', maxHeight: '970px', overflow: 'hidden'}">
        <div ref="search-list-container" :style="{width: '400px', maxHeight: '950px', backgroundColor: '#1f2440', overflow: 'scroll'}">
          <brick-list class="search-list">
            <brick-list-optional-item ref="search-list-item" v-for="(item, index) in data" :key="index" @click="()=>[setState('company', item), setState('companyShow', true), setState('companyCloseIconShow', false)]" :item="item" :index="index + 1">
              <span ref="search-list-item-name">
                {{item[0]}}
              </span>
              <template ref="search-list-item-description-template" v-slot:description>
                <span>
                  {{item[1]}}
                </span>
              </template>
            </brick-list-optional-item>
          </brick-list>
          <pagination ref="search-paginator" @page-changed="({ currentPage, perPage })=>[setState('page', currentPage)]" v-if="total > 20" :showTotalCount="false" :showPerPage="false" :showJumper="false" :totalCount="total" :style="{height: '70px'}" />
        </div>
      </div>
    </data-loader>
    <div ref="company-container" v-if="craneStates.companyShow" :style="{width: '400px', maxHeight: '970px', position: 'absolute', top: '84px', left: '40px', backgroundColor: 'rgb(26, 29, 57)'}">
      <data-loader ref="company-data" v-slot="{ results: detail }" :style="{position: 'relative', padding: '35px 16px 24px 16px', backgroundImage: 'url(/jingxinju/images/map-head-bg.png)', backgroundPosition: '100% 100%'}">
        <div ref="company-name-container" v-if="detail" :style="{display: 'flex', alignItems: 'center'}">
          <img ref="close-icon" @click="()=>[setState('companyShow', false)]" v-if="craneStates.companyCloseIconShow" src="/jingxinju/images/Icon-Close.svg" :style="{width: '16px', cursor: 'pointer'}" />
          <img ref="arrow-icon" @click="()=>[setState('companyShow', false)]" src="/jingxinju/images/Icon-Back.svg" :style="{width: '16px', cursor: 'pointer'}" v-else />
          <span ref="arrow-icon-text" :style="{color: '#fff', fontSize: '18px', fontWeight: '600', marginLeft: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}">
            xxx公司
          </span>
        </div>
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
  </div>
</template>

<script>
import BuiltInMixin from '../mixins/built_in'
import {
  BrickInput,
  BrickIcon,
  BrickTooltip,
  DataLoader,
  BrickList,
  BrickListOptionalItem,
  Pagination,
  VisMultipleSelect,
} from '@byzanteam/vis-components'
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
    BrickTooltip,
    DataLoader,
    BrickList,
    BrickListOptionalItem,
    Pagination,
    VisMultipleSelect,
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
        markerResults: [],
        markerGroup: [],
        companyCloseIconShow: false,
        markerValueMap: {},
        markerStyles: [],
        mapCommunities: '',
        colorMap: ['#007afe', '#dece84', '#8f919f', '#dc5f5f', '#f7b267', '#4fa8f1', '#2ec4b6', '#bed8d4', '#627592', '#5fd6dc', '#7d5fdc', '#7dcfef', '#2e81c4', '#979eda', '#4b4b4b', '#dc5f9a', '#7dcfef', '#f76767', '#c08185'],
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
      this.initMapCommunities(value)
    },
    'craneStates.company': {
      handler (value) {
        const content = `<div>${value['单位详细名称']}</div>`
        const location = value.location
        this.$refs.infowindowRef.createInfoWindow(content, location)
        this.$refs.mapRef.map.setCenter(location)
      },
    },
    'craneStates.selectOptions' (value) {
      if(value.length === 0) {
        this.initMapCommunities(this.craneStates.communities)
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
      }, '')
    },
    getMapScale () {
      const scaleValue = document.body.style.transform.match(/(?<=\().*?(?=\))/)[0]
      return `scale(${1/scaleValue})`
    },
    initMapCommunities (value) {
      this.craneStates.mapCommunities = _.reduce(value, (acc, item, index) => {
        if(index === value.length -1) {
          return `${acc}'${item[0]}'`
        }
        return `${acc}'${item[0]}',`
      }, '')
    },
    markerMouseoverFunc (marker) {
      const content = `<div>${marker.data['单位详细名称']}</div>`
      const location = marker.data.location
      this.$refs.infowindowRef.createInfoWindow(content, location)
    },
    markerMouseoutFunc () {
      this.$refs.infowindowRef.close()
    }
  }
}
export default map
</script>
