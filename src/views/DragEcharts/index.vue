<template>
  <div class="drag-echarts">
    <div class="left">
      <div class="title">
        元素选择区域
      </div>
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
    <div
      class="center"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <div class="title">
        <span>数据展示区</span>
        <el-button
          type="primary"
          @click="handleSave"
        >
          保存
        </el-button>
      </div>
      <template v-if="showComponentList.length">
        <ul class="show-list">
          <Component
            :is="item.component"
            v-for="(item, index) in showComponentList"
            :key="index"
            :chart-data="item.chartData"
            :height="item.height"
            :width="item.width"
          />
        </ul>
      </template>
    </div>
    <div class="right">
      <div class="title">
        数据修改区域
      </div>
      <ul class="edit-list">
        <li
          v-for="(item, index) in showComponentList"
          :key="index"
        >
          <div>{{ item.component }}</div>
          <i class="el-icon-delete" @click="handleDelComponent(index)"></i>
          <i class="el-icon-edit" @click="handleEditComponent(index)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import barChart from '@/components/Echarts/barChart'
import pieChart from '@/components/Echarts/pieChart'
import lineChart from '@/components/Echarts/lineChart'
import lineBarChart from '@/components/Echarts/lineBarChart'
import { dragList } from './config'

export default {
  name: 'DragEcharts',
  components: {
    barChart,
    lineChart,
    pieChart,
    lineBarChart
  },
  data() {
    return {
      dragList,
      showComponentList: []
    }
  },
  created() {
    const showComponentListCache = localStorage.getItem('showComponentListCache')
    const showComponentList = showComponentListCache ? JSON.parse(showComponentListCache) : []
    this.showComponentList = showComponentList.map(({ component }) => {
      const itemConfig = dragList.find(v => v.component === component)
      return {
        component: itemConfig.component,
        // chartId: ++id,
        height: '300px',
        width: '300px',
        chartData: JSON.parse(JSON.stringify(itemConfig.chartData))
      }
    }) || []

  },
  methods: {
    dragStart(event, component) {
      event.dataTransfer.setData('component', component)
    },
    handleDrop(e) {
      console.log('=====================drop')
      e.preventDefault()
      e.stopPropagation()
      const component = e.dataTransfer.getData('component')
      const itemConfig = dragList.find(v => v.component === component)
      const item = {
        component: itemConfig.component,
        // chartId: ++id,
        height: '300px',
        width: '300px',
        chartData: JSON.parse(JSON.stringify(itemConfig.chartData))
      }
      this.$nextTick(() => {
        this.showComponentList.push(item)
      })
    },
    handleDragOver(e) {
      console.log('dragover')
      e.preventDefault()
    },
    handleSave() {
      this.$confirm('确认保存吗').then(() => {
        const data = this.showComponentList.map(({ component, height, width, }) => ({
          component,
          height,
          width,
        })) || []
        localStorage.setItem('showComponentListCache', JSON.stringify(data))
      })
    },
    handleDelComponent(index) {
      this.$confirm('确认删除吗').then(() => {
        this.showComponentList.splice(index, 1)
      })
    },
    handleEditComponent(index) {
      const item = this.showComponentList[index]
      console.log(item)
    }
  }
}
</script>
<style lang="scss" scoped>
.drag-echarts {
  width: 100%;
  display: flex;
  height: 760px;

  .left {
    width: 200px;
    background: #99a9bf;
    height: 100%;
    border-right: 5px;
  }

  .center {
    width: calc(100% - 400px);
    height: 100%;
    min-height: 760px;
    background: #d3dce6;

    .show-list {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .right {
    width: 200px;
    height: 100%;

    .edit-list {
      list-style: none;

      li {
        display: flex;
      }
    }
  }
}
</style>
