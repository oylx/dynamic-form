<template>
  <div>
    <div v-if="dblclickObj !== null">
      图例：
      <el-input
        v-for="(xAxis,index) in dblclickObj.option.legend.data"
        :key="'legend' + index + dblclickObj.id"
        v-model="dblclickObj.option.legend.data[index]"
        placeholder=""
        @change="rederChange(dblclickObj)"
        @input="changLegend(dblclickObj,index)"
      />
      数据坐标值：
      <el-input
        v-for="(serie,index) in dblclickObj.option.series[0].data"
        :key="'series' + index + dblclickObj.id"
        v-model="dblclickObj.option.series[0].data[index].value"
        placeholder=""
        @change="rederChange(dblclickObj)"
      />
    </div>
  </div>
</template>

<script>
 export default {
   components: {

   },
   props: {
     dblclickObj: {
       type: Object,
       default: null,
     }
   },
   data () {
     return {

     }
   },
   created () {
   },
   mounted () {
   },
   methods: {
    changLegend(pie,index){
      debugger;
      pie.option.series[0].data[index].name = pie.option.legend.data[index];
    },
    rederChange(pie){
      debugger;
      console.log('====================',pie);
      // const findHistogram = this.histogramList.find((histogram) => histogram.id === this.dblclickIndex);
      // findHistogram.myChart.setOption(findHistogram.option);
      pie.myChart.setOption(pie.option);
    },
   },
 }
</script>

<style scoped lang='scss'>


</style>
