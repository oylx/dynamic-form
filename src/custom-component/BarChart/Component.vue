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
import echarts from './../Echarts/common'
import echartsMixin from './../Echarts/echartsMixin'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
import OnEvent from '@/custom-component/common/OnEvent'
echarts.use([BarChart])

export default {
  mixins: [echartsMixin],
  extends: OnEvent,
  props: {
    propValue: {
      type: Object,
      required: true,
      default: () => {},
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
