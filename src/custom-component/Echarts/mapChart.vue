<template>
  <div v-loading="loading" :style="{ height: height, width: width }">
    <div
      :id="chartId"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>
<script>
import echarts from './common'
import echartsMixin from './echartsMixin'
// 引入柱状图图表，图表后缀都为 Chart
import { MapChart } from 'echarts/charts'
echarts.use([MapChart])

export default {
  mixins: [echartsMixin],
  props: {
    mapFeature: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    mapFeature: {
      handler(val) {
        if (val.name && val.geoJson) {
          echarts.registerMap(val.name, val.geoJson)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
