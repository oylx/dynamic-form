<template>
  <div class="home">
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <div>元素选择区域</div>
          <div>
            <el-button
              v-for="(item, index) in dragList"
              :key="index"
              class="drag-button"
              type="success"
              draggable="true"
              @dragstart.native="dragStart($event,item.component)"
            >
              <i :class="item.icon"/>
              <span>{{ item.label }}</span>
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div
          class="grid-content bg-purple-light drag-resize-area"
          @drop.prevent="drop($event)"
          @dragover.prevent=""
        >
          图表渲染区域
          <!-- 注意：当需要使用Echarts这样组件时，需要嵌套一个div；如果只是基础的正方形元素则不需要 -->
          <drag-resize
            v-for="histogram in dataVisualization.dataEcharts.histogram"
            :key="histogram.id"
            :is-resize="true"
            class="drag-item-echarts"
            @dblclick.native="changeSelectItem(histogram,'histogram')"
          >
            <div
              :id="histogram.id"
              class="drag-item-echarts-histogram"
            />
          </drag-resize>
          <drag-resize
            v-for="pie in dataVisualization.dataEcharts.pie"
            :key="pie.id"
            :is-resize="true"
            class="drag-item-echarts"
            @dblclick.native="changeSelectItem(pie,'pie')"
          >
            <div
              :id="pie.id"
              class="drag-item-echarts-histogram"
            />
          </drag-resize>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          数据修改区域
          <edit-histogram-data
            v-if="dblclickType==='histogram'"
            :dblclick-obj="dblclickObj"
          />
          <edit-pie-data
            v-if="dblclickType==='pie'"
            :dblclick-obj="dblclickObj"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import DragResize from '@/components/DragResize'
import EditHistogramData from '@/components/EditHistogramData'
import EditPieData from '@/components/EditPieData'
import { EleResize } from '@/utils/esresize'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { dragList } from './config'

export default {
  name: 'Home',
  components: {
    DragResize,
    EditHistogramData,
    EditPieData
  },
  data() {
    return {
      dragList,
      dblclickObj: null,
      dblclickType: '',
    }
  },
  computed: {
    ...mapState({
      dataVisualization: state => state.dataVisualization,
    }),
    ...mapGetters(['getDataEchartsItem', 'getDataEchartsIndex']),
  },
  methods: {
    ...mapMutations(['addDataEchartsItem', 'addDataEchartsIndex']),
    dragStart(event, type) {
      event.dataTransfer.setData('Text', type)
    },
    drop(event) {
      const data = event.dataTransfer.getData('Text')
      const option = dragList.find(v => v.component === data).chartData || {}
      if (data === 'histogram') {
        this.addDataEchartsIndex()
        let obj = {
          id: 'histogram' + this.getDataEchartsIndex(),
          option
        }
        let histogramObj = {
          type: 'histogram',
          option: obj,
        }
        this.addDataEchartsItem(histogramObj)
        this.renderEcharts('histogram')
      } else if (data === 'pie') {
        this.addDataEchartsIndex({ type: 'pie' })
        let obj = {
          id: 'pie' + this.getDataEchartsIndex({ type: 'pie' }),
          option
        }
        let pieObj = {
          type: 'pie',
          option: obj,
        }
        this.addDataEchartsItem(pieObj)
        this.renderEcharts('pie')
      }
    },
    renderEcharts(type) {
      this.$nextTick(() => {
        let myChart = this.$echarts.init(document.getElementById(type + this.getDataEchartsIndex({ type: type })))
        myChart.setOption((() => {
          let obj = {
            type: type,
            id: type + this.getDataEchartsIndex({ type: type }),
          }
          let b = this.getDataEchartsItem(obj)
          b.myChart = myChart
          return b.option
        })())
        // 定义图表重置监听函数
        let listener = function () {
          myChart.resize()
        }
        EleResize.on(document.getElementById(type + this.getDataEchartsIndex({ type: type })), listener)
      })
    },
    changeSelectItem(item, type) {
      console.log('*************************', item)
      this.dblclickObj = item
      this.dblclickType = type
    },
  }
}
</script>
<style lang="scss">
.home {
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 740px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .drag-button {
    margin: 10px;
  }

  .drag-resize-area {
    position: relative;

    .drag-item-echarts {
      border: 1px solid red;
      height: 300px;
      width: 400px;

      .drag-item-echarts-histogram {
        height: 100%;
        width: 100%;
        margin: auto auto;
        padding: 0;
      }
    }
  }
}
</style>
