<template>
  <div class="drag-echarts">
    <el-row>
      <el-col :span="4">
        <el-row>
          <div class="top-select">
            <div class="title">
              元素选择区域
            </div>
            <el-button
              v-for="(item, index) in dragList"
              :key="index"
              class="drag-button-list"
              type="success"
              draggable="true"
              @dragstart.native="dragStart($event,item.component)"
            >
              <i :class="item.icon"/>
              <span>{{ item.label }}</span>
            </el-button>
          </div>
        </el-row>
        <el-row>
          <div class="bottom-edit">
            <div class="title">
              数据修改区域
            </div>
            <ul class="edit-list">
              <li
                v-for="(item, index) in showComponentList"
                :key="index"
              >
                <div>{{ item | filterName }}</div>
                <i class="el-icon-delete" @click="handleDelComponent(index)"></i>
                <i class="el-icon-edit" @click="handleEditComponent(index)"></i>
              </li>
            </ul>
          </div>
        </el-row>
      </el-col>
      <el-col :span="20">
        <div
          class="center"
          @drop="handleDrop"
          @dragover="handleDragOver"
        >
          <div class="title">
            <el-row>
              <el-col :span="20">数据展示区</el-col>
              <el-col :span="4">
                <el-button type="primary" @click="handleSave">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <template v-if="showComponentList.length">
            <div class="show-list">
              <drag-resize
                class="drag-item-echarts"
                :isResize='true'
                v-for="(item) in showComponentList"
                :key="item.id"
                :item-id="item.itemId"
                :left="item.left"
                :top="item.top"
                :width="item.width"
                :height="item.height"
                @dblclick.native="changeSelectItem(item)">
                <Component
                  class="drag-item-echarts-histogram"
                  :is="item.component"
                  :width="item.width+'px'"
                  :height="item.height+'px'"
                  :chart-data="item.chartData"
                />
              </drag-resize>
            </div>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import barChart from '@/components/Echarts/barChart'
import pieChart from '@/components/Echarts/pieChart'
import lineChart from '@/components/Echarts/lineChart'
import lineBarChart from '@/components/Echarts/lineBarChart'
import { dragList } from './components/config'
import DragResize from './components/DragResize'
import eventBus from '@/utils/eventBus'
import { createUUID } from '@/utils'
import DragDialog from '@/views/DragEcharts/components/DragDialog'

export default {
  name: 'DragEcharts',
  components: {
    DragDialog,
    DragResize,
    barChart,
    lineChart,
    pieChart,
    lineBarChart
  },
  filters: {
    filterName(val) {
      return `${val.component}:${val?.chartData?.title?.text || '-'}`
    }
  },
  data() {
    return {
      dragList,
      showComponentList: [],
      dragDialogVisible: false,
      dragDialogType: 'eidt',
      dragDialogData: null
    }
  },
  created() {
    const showComponentListCache = localStorage.getItem('showComponentListCache')
    const showComponentList = showComponentListCache ? JSON.parse(showComponentListCache) : []
    this.showComponentList = showComponentList.map(({ component, itemId, left, top, width, height }) => {
      const itemConfig = dragList.find(v => v.component === component)
      return {
        itemId,
        left,
        top,
        component: itemConfig.component,
        width,
        height,
        chartData: JSON.parse(JSON.stringify(itemConfig.chartData))
      }
    }) || []

  },
  mounted() {
    eventBus.$on('give-advice', (val) => {
      this.$nextTick(() => {
        this.showComponentList.forEach(v => {
          if (v.itemId === val.itemId) {
            const keys = ['width', 'height', 'left', 'top']
            keys.forEach(key => v[key] = val[key])
            console.log(v)
          }
        })
        console.log(this.showComponentList)
      })
    })
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
        itemId: createUUID(),
        component: itemConfig.component,
        width: 400,
        height: 300,
        left: 0,
        top: 0,
        chartData: JSON.parse(JSON.stringify(itemConfig.chartData))
      }
      this.$nextTick(() => {
        this.showComponentList.push(item)
        this.$forceUpdate()
      })
    },
    handleDragOver(e) {
      console.log('dragover')
      e.preventDefault()
    },
    handleSave() {
      this.$confirm('确认保存吗').then(() => {
        this.setLocal()
      })
    },
    setLocal() {
      const data = this.showComponentList.map(({ itemId, component, height, width, left, top }) => ({
        component,
        height,
        width,
        itemId,
        left,
        top
      })) || []
      localStorage.setItem('showComponentListCache', JSON.stringify(data))
    },
    handleDelComponent(index) {
      this.$confirm('确认删除吗').then(() => {
        this.showComponentList.splice(index, 1)
        this.$nextTick(() => {
          this.setLocal()
        })
      })
    },
    handleEditComponent(index) {
      const item = this.showComponentList[index]
      this.dragDialogData = {
        width: item.width,
        height: item.height,
        left: item.left,
        top: item.top,
      }
      this.dragDialogVisible = true
    },
    changeSelectItem(item, type) {
      console.log('*************************', item)
      this.dblclickObj = item
      this.dblclickType = type
    },
    updateList() {
      this.$emit('update')
    }
  }
}
</script>
<style lang="scss" scoped>
.drag-echarts {
  width: 100%;
  height: 100%;

  .top-select {
    height: 50%;
    padding: 20px;
    text-align: left;

    .title {
    }

    .drag-button-list {
      margin: 5px 0;

      &.el-button + .el-button {
        margin-left: 0;
      }
    }
  }

  .bottom-edit {
    height: 50%;
    padding: 20px;
    text-align: left;

    .edit-list {
      list-style: none;

      li {
        display: flex;
      }
    }
  }


  .center {
    width: 100%;
    background: #d3dce6;
    min-height: 760px;
    height: auto;
    padding: 20px;
    text-align: left;

    .show-list {
      position: relative;

      .drag-item-echarts {
        border: 1px solid red;
        min-height: 300px;
        min-width: 400px;

        .drag-item-echarts-histogram {
          height: 100%;
          width: 100%;
          margin: auto auto;
          padding: 0;
        }
      }
    }
  }

}
</style>
