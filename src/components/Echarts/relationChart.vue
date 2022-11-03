<!--
 * @description  关系图
 * @date 2021-12-14
 * @author lism
-->
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
// 引入GraphChart图表，图表后缀都为 Chart
import { GraphChart } from 'echarts/charts'
echarts.use([GraphChart])

export default {
  mixins: [echartsMixin]
}
</script>
