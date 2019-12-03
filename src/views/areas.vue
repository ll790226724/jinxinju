<template>
  <div class="areas">
    <div :style="{width: '100%', height: '100%', transform: `scale(${getMapScale()})`, position: 'absolute', top: '0px', left: '0px'}">
      <base-map ref="baseMap" @map-created="()=>[getComponent('baseMap').setCenter([103.797642, 30.838752])]" features="none" :useMapUi="true" :mapOptions="{zoom: getMapScale() > 4 ? 10: 12, zoomEnable: false}">
        <regions :areas="craneStates.geojson" :areaStyle="{strokeColor: '#363856', strokeWeight: 2, fillOpacity: 0}" :areaHoverStyle="{fillOpacity: 0}" />
        <marker-point ref="marker-point" v-for="area in normalAreas" :key="area.id" @marker-clicked="()=>[setState('currentArea', area.id === craneStates.currentArea ? '' : area.id)]" @marker-dbclicked="()=>[$router.push({ name: 'map', params: { street: area.id }})]" :marker="{id: area.id, label: [area.id, '共有企业:' + area.count + '个'], location: area.location}" icon="circle-o" :markerStyle="area.markerStyle" :innerLabelStyle="area.innerLabelStyle" />
        <marker-point ref="marker-point" v-for="area in specialAreas" :key="area.id" @marker-clicked="()=>[setState('currentArea', area.id === craneStates.currentArea ? '' : area.id)]" @marker-dbclicked="()=>[$router.push({ name: 'map', params: { street: area.id }})]" :marker="{id: area.id, label: [area.id], location: area.location}" icon="circle-o" :markerStyle="{strokeColor: 'rgb(0, 122, 254, .12)', strokeWeight: 1, color: 'rgb(0, 122, 254)', size: getMapScale() > 4 ? Math.round(14 / getMapScale()) : 14, textAlign: 'center'}" :innerLabelStyle="{color: '#367eef', textStyleMap: [{fontSize: getMapScale() > 4 ? Math.round(16 / getMapScale()) : 16}], offset: [-8*area.id.length+4, 30]}" />
      </base-map>
    </div>
    <data-loader @requestDone="(exports)=>[setState('areas', exports.results.map((item) => ({ id: item[0], count: item[1], location: craneStates.areasLocationMap[item[0]] })))]" :url="`/v1/components/ab5aac88-eb86-4d83-8107-090dabc16632/data?table=${craneStates.routerMap[routeParams.table]}`" />
    <div :style="{width: '400px', height: '798px', backgroundColor: '#1f2240', borderRadius: '4px', position: 'absolute', top: '30px', left: '40px'}">
      <img :style="{width: '400px', height: '150px', position: 'absolute', top: '0px', left: '0px'}" src="/piduzxqy/images/map-head-bg.png" />
      <div :style="{color: '#d8d8d8', display: 'inline-flex', position: 'absolute', top: '57px', left: '15px'}">
        <icon name="icon-company" size="20px" />
      </div>
      <data-loader v-slot="{ results: results }" :url="`/v1/components/1946f34d-a2b8-4f97-b956-4dc11dbfd083/data?table=${craneStates.routerMap[routeParams.table]}${craneStates.currentArea?'&area=\''+craneStates.currentArea+'\'':''}`" method="get" :data="[[0]]" :style="{position: 'absolute', top: '29px', left: '43px'}">
        <digital-roll titlePosition="left" :content="{title: `${craneStates.companyType}总计`, digital: getAttr(getAttr(results, '0'), '0'), suffix: '个'}" :titleStyle="{color: '#d8d8d8', fontSize: '18px', fontWeight: '500'}" :digitalStyle="{fontSize: '44px', color: '#dece83', fontFamily: 'Oswald-Regular', fontWeight: '400', letterSpacing: '1px'}" :suffixStyle="{color: '#d8d8d8', fontWeight: '500', fontSize: '18px', lineHeight: '1'}" />
      </data-loader>
      <div :style="{marginTop: '100px', position: 'relative', lineHeight: '49px', width: '400px', paddingLeft: '14px', borderTop: '1px solid rgba(255, 255, 255, .1)'}">
        <span :style="{color: '#8f919f', fontSize: '14px', lineHeight: '1', fontWeight: '500'}">
          现所选区域：
        </span>
        <span :style="{color: '#ffffff', fontSize: '14px', lineHeight: '1', fontWeight: '500'}">
          {{craneStates.currentArea ? craneStates.currentArea : '全部园区'}}
        </span>
      </div>
      <brick-input placeholder="请输入" size="large" v-model="craneStates.filterKey">
        <template v-slot:head>
          <brick-icon name="search" />
        </template>
        <template v-slot:tail v-if="craneStates.filterKey">
          <brick-icon @click="()=>[setState('filterKey', '')]" name="times-circle" />
        </template>
      </brick-input>
      <data-loader v-slot="{ results: results }" :data="[['陴都区金和塑料厂', '分类1'], ['aaa工厂', '分类2']]" :url="`/v1/components/b758b6d2-e8d0-41bb-b24a-58228e1fb576/data?table=${craneStates.routerMap[routeParams.table]}&${craneStates.currentArea?'&area=\''+craneStates.currentArea+'\'':''}`" :style="{width: '400px', height: '296px'}">
        <vis-table :data="(results||[]).filter((item)=>!craneStates.filterKey||item[0].indexOf(craneStates.filterKey)>-1).map((item,i)=>({index:i+1,name:item[0],category:item[1]}))" theme="dark" :headers="[{width: 40, key: 'index', title: ''}, {width: 220, key: 'name', title: '企业名称'}, {width: 140, key: 'category', title: '行业属性'}]">
          <template v-slot="{ cell: cell, columnKey: columnKey }">
            <span :class="columnKey === 'index' ? 'row-index-cell' : ''">
              {{cell}}
            </span>
          </template>
        </vis-table>
      </data-loader>
      <data-loader v-slot="{ results: results }" :data="[]" :url="`/v1/components/1aebcfcb-3de4-4259-b880-fbd9a7da7a4f/data?table=${craneStates.routerMap[routeParams.table]}&industry='${craneStates.barChartIndustries.join('\',\'')}'${craneStates.currentArea?'&area=\''+craneStates.currentArea+'\'':''}`" :style="{width: '400px', height: '280px', position: 'absolute', top: '512px', left: '0px'}">
        <vertical-bar :data="results.map((item) => ({key: item[0], ['数量']: item[1]}))" labelKey="key" valueKey="数量" :crossAxis="{range: {count: 6}, lineStyle: {stroke: 'transparent'}, labelStyle: {size: 12, fill: '#fff'}, unit: '个'}" :series="[['#007afe', '#007afe33']]" :mainAxis="{labelStyle: {rotate: -45, size: 12, fill: '#fff'}, labelLength: 9, lineStyle: {stroke: 'transparent'}}" :theme="{background: 'transparent'}" :labels="[{ fill: '#fff', stroke: '#fff', size: 12}]" :tooltipOptions="{background: 'rgba(60, 71, 89, .9)', text: {size: 14, fill: '#ffffff'}, title: {fill: '#fff'}}" />
      </data-loader>
    </div>
    <data-loader v-slot="{ results: results, response: response }" :url="`/v1/components/5d4574bf-fb0f-47fe-87e9-c33680aecaf0/data?table=${craneStates.routerMap[routeParams.table]}`" :style="{width: '400px', height: '217px', borderRadius: '4px', overflow: 'hidden', position: 'absolute', top: '841px', left: '40px'}" :data="[[0]]">
      <donut :data="results[0].map((item, index) => ({ key: craneStates.categoryMap[response.schema[index].field], value: item }))" label-key="key" value-key="value" :innerRadius="0.655" :theme="{background: '#1f2240', colors: ['#007afe', '#dece84', '#8f919f']}" :guide="{text: '企业类型占比', stroke: '#ffffff', size: 12, align: 'center'}" :tooltipOptions="{background: 'rgba(60, 71, 89, .9)', text: {size: 14, fill: '#ffffff'}}" v-if="response" />
    </data-loader>
  </div>
</template>

<script>
import BuiltInMixin from '../mixins/built_in'
import {
  BaseMap,
  Regions,
  MarkerPoint,
} from '@byzanteam/map-ui'
import {
  DataLoader,
  Icon,
  DigitalRoll,
  BrickInput,
  BrickIcon,
  VisTable,
} from '@byzanteam/vis-components'
import {
  VerticalBar,
  Donut,
} from '@byzanteam/graphite'

const SpecialAreas = ['川菜园区', '现代工业港']

export const areas = {
  mixins: [BuiltInMixin],

  components: {
    BaseMap,
    Regions,
    MarkerPoint,
    DataLoader,
    Icon,
    DigitalRoll,
    BrickInput,
    BrickIcon,
    VisTable,
    VerticalBar,
    Donut,
  },

  data () {
    return {
      craneStates: {
        filterKey: '',
        categoryMap: {type1: '川菜园区', type2: '现代工业港', other: '园外企业'},
        geojson: [{type: 'Feature', properties: {adcode: '51012400000000'}, geometry: {type: 'MultiPolygon', coordinates: [[[103.90312, 30.92699], [103.90804, 30.92028], [103.91061, 30.91861], [103.94055, 30.90587], [103.9354, 30.90228], [103.93512, 30.89723], [103.94739, 30.88823], [103.94231, 30.88154], [103.94666, 30.87705], [103.93778, 30.86961], [103.93678, 30.86703], [103.94399, 30.85723], [103.94452, 30.85179], [103.94727, 30.84857], [103.95699, 30.84567], [103.96154, 30.84633], [103.96501, 30.8453], [103.96764, 30.83939], [103.96595, 30.83617], [103.97009, 30.83379], [103.97587, 30.83343], [103.9818, 30.82753], [103.98842, 30.82803], [103.99058, 30.82344], [103.99458, 30.82405], [103.99776, 30.8216], [104.00453, 30.82343], [104.01692, 30.81715], [104.02018, 30.81357], [104.01937, 30.80737], [104.02514, 30.80475], [104.02801, 30.79971], [104.03462, 30.79553], [104.03453, 30.79289], [104.031, 30.79005], [104.03225, 30.78693], [104.03721, 30.78571], [104.04263, 30.78746], [104.04441, 30.7858], [104.04611, 30.78067], [104.04389, 30.77708], [104.0405, 30.77671], [104.03216, 30.77989], [104.02903, 30.77838], [104.03264, 30.76944], [104.03227, 30.76214], [104.04279, 30.75566], [104.04928, 30.7535], [104.04142, 30.7498], [104.03637, 30.74572], [104.03127, 30.74496], [104.03671, 30.73804], [104.03353, 30.73179], [104.02787, 30.73427], [104.02546, 30.73815], [104.02783, 30.73921], [104.02531, 30.7415], [104.02093, 30.74111], [104.02093, 30.7486], [104.01698, 30.74681], [104.01263, 30.74855], [104.01686, 30.75381], [104.01036, 30.75888], [104.00075, 30.75759], [103.99765, 30.75434], [103.9965, 30.74911], [103.99704, 30.74405], [104.00176, 30.73836], [103.99437, 30.72917], [103.98966, 30.72733], [103.98688, 30.72804], [103.98217, 30.73225], [103.97613, 30.73165], [103.97354, 30.72818], [103.97684, 30.72146], [103.97122, 30.71941], [103.97001, 30.72243], [103.96895, 30.72088], [103.9663, 30.72255], [103.96537, 30.72719], [103.96255, 30.72617], [103.9609, 30.72174], [103.95485, 30.72089], [103.95123, 30.7217], [103.94749, 30.7204], [103.94413, 30.72333], [103.94591, 30.72558], [103.94311, 30.72633], [103.94368, 30.72866], [103.93974, 30.72866], [103.93894, 30.73178], [103.93191, 30.73197], [103.92944, 30.73585], [103.91982, 30.7428], [103.91327, 30.74416], [103.91354, 30.73957], [103.90656, 30.73977], [103.89031, 30.75139], [103.87825, 30.75572], [103.87635, 30.7559], [103.87549, 30.75467], [103.88147, 30.74823], [103.87998, 30.7459], [103.85659, 30.74965], [103.84214, 30.75969], [103.83523, 30.76123], [103.82404, 30.77029], [103.81848, 30.77712], [103.80279, 30.78188], [103.79895, 30.78092], [103.79624, 30.78187], [103.79809, 30.78626], [103.7948, 30.79161], [103.79167, 30.7941], [103.79157, 30.79738], [103.78867, 30.79938], [103.78762, 30.8068], [103.78255, 30.81079], [103.77859, 30.80901], [103.76854, 30.80803], [103.76606, 30.81215], [103.76097, 30.81532], [103.75996, 30.82338], [103.75633, 30.82785], [103.75043, 30.831], [103.74564, 30.83157], [103.72752, 30.83798], [103.72288, 30.84628], [103.72243, 30.85258], [103.71583, 30.86125], [103.72827, 30.86425], [103.73509, 30.87426], [103.73554, 30.87801], [103.74454, 30.87998], [103.75064, 30.87908], [103.75465, 30.8819], [103.76079, 30.88355], [103.75734, 30.89077], [103.7526, 30.89308], [103.74802, 30.89826], [103.74926, 30.90097], [103.75438, 30.89933], [103.7594, 30.9052], [103.76187, 30.91504], [103.76483, 30.91748], [103.76725, 30.92306], [103.76683, 30.93609], [103.76806, 30.9439], [103.76642, 30.95218], [103.77267, 30.95991], [103.7772, 30.95941], [103.78078, 30.95647], [103.78507, 30.95543], [103.78991, 30.94984], [103.79407, 30.94843], [103.79529, 30.94577], [103.79935, 30.94317], [103.81111, 30.94502], [103.81631, 30.94358], [103.82488, 30.93828], [103.82871, 30.92938], [103.83047, 30.92828], [103.84039, 30.9273], [103.84373, 30.93049], [103.84465, 30.93569], [103.8495, 30.93691], [103.85436, 30.93564], [103.86105, 30.93793], [103.86473, 30.9369], [103.87237, 30.93111], [103.885, 30.92998], [103.89226, 30.92608], [103.90312, 30.92699]]]}}],
        areasLocationMap: {唐昌街道: [103.824336, 30.92366], 三道堰街道: [103.915939, 30.862178], 安德街道: [103.80584, 30.870687], 友爱街道: [103.795132, 30.823379], 团结街道: [103.978343, 30.816234], 郫筒街道: [103.887996, 30.807641], 红光街道: [103.945588, 30.784785], 犀浦街道: [103.972796, 30.753811], 川菜园区: [103.812872, 30.865116], 现代工业港: [103.92972, 30.802213], 德源街道: [103.853417, 30.774637], 安靖街道: [104.018228, 30.759085]},
        areas: [],
        currentArea: '',
        barChartIndustries: ['农副食品加工业', '食品制造业', '电气机械和器材制造业', '计算机、通信和其他电子设备制造业', '酒、饮料和精制茶制造业', '仪器仪表制造业'],
        routerMap: {staff: 'nice_enterprise', slw: 'bad_enterprise'},
        companyType: '合规企业',
        markerStyle: {strokeColor: 'rgba(0, 122, 254, .6)', strokeWeight: 1, color: 'rgba(0, 122, 254, .06)', size: this.getMapScale() > 4 ? Math.round(130 / this.getMapScale()) : 130, textAlign: 'center'},
        innerLabelStyle: {color: 'rgba(255, 255, 255, 0.8)', textStyleMap: [{fontSize: this.getMapScale() > 4 ? Math.round(16 / this.getMapScale()) : 16}, {fontSize: this.getMapScale() > 4 ? Math.round(14 / this.getMapScale()) : 14}], offset: {0: '0', 1: '45'}},
        selectedMarkerStyle: {strokeColor: 'rgb(0, 122, 254)', strokeWeight: 1, color: 'rgba(0, 122, 254, .12)', size: this.getMapScale() > 4 ? Math.round(130 / this.getMapScale()) : 130, textAlign: 'center'},
        selectedInnerLabelStyle: {color: 'white', textStyleMap: [{fontSize: this.getMapScale() > 4 ? Math.round(16 / this.getMapScale()) : 16}, {fontSize: this.getMapScale() > 4 ? Math.round(14 / this.getMapScale()) : 14}], offset: {0: '0', 1: '45'}},
      },
    }
  },

  computed: {
    normalAreas () {
      const filteredAreas = this.craneStates.areas.filter((item) => SpecialAreas.indexOf(item.id) < 0)
      return filteredAreas.map((area) => {
        if(this.craneStates.currentArea === area.id) {
          area.markerStyle =  this.craneStates.selectedMarkerStyle
          area.innerLabelStyle = this.craneStates.selectedInnerLabelStyle
        } else {
          area.markerStyle = this.craneStates.markerStyle
          area.innerLabelStyle = this.craneStates.innerLabelStyle
        }
        return area
      })
    },
    specialAreas () {
      return this.craneStates.areas.filter((item) => SpecialAreas.indexOf(item.id) > -1)
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
    getMapScale () {
      const scaleValue = document.body.style.transform.match(/scale\(([\.\d]+)\)/)[1]
      return 1/scaleValue
    },
  },
}
export default areas
</script>
