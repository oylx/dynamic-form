<template>
  <div class="drag-echarts">
    <div class="left">
      <ComponentList />
    </div>
    <div
      class="content"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <template v-if="dragList.length">
        <ul class="drag-list">
          <li v-for="(item, index) in dragList" :key="index" @click="() => _handleClick(item)">
            <div class="name">{{ item.name }}</div>
            <i class="close" @click="(e) =>_handleClose(e, index)">关闭</i>
          </li>
        </ul>
      </template>
      <template v-else>暂无定制内容，可以通过拖拽左侧组件实现定制化</template>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/routes'
import { deepCopy } from '@/utils'
import ComponentList from '@/components/VisualDrag/ComponentList' // 左侧列表组件

export default {
  name: 'DragEcharts',
  components: {
    ComponentList
  },
  data() {
    return {
      dragList: []
    }
  },
  created() {
    const dragListCache = localStorage.getItem('dragList')
    this.dragList = dragListCache ? JSON.parse(dragListCache) : []
    console.log(this.dragList)
  },
  methods: {
    _handleClick(item) {
      window.open(item.path, '_blank')
    },
    _handleClose(e, index) {
      e.stopPropagation()
      this.dragList.splice(index, 1)
      const targetDragList = this.dragList.map(({ name, path }) => ({ name, path }))
      localStorage.setItem('dragList', JSON.stringify(targetDragList))
    },
    handleDrop(e) {
      console.log('=====================drop')
      e.preventDefault()
      e.stopPropagation()

      const path = e.dataTransfer.getData('index')
      if (path) {
        const item = routes.find(v => v.path === path)
        this.dragList.push(deepCopy(item))
        const targetDragList = this.dragList.map(({ name, path }) => ({ name, path }))
        localStorage.setItem('dragList', JSON.stringify(targetDragList))
      }
    },

    handleDragOver(e) {
      console.log('dragover')
      e.preventDefault()
    },
  }
}
</script>

<style lang="scss" scoped>
.drag-echarts {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 200px;
    height: 100%;
    border: solid 1px;
    margin-right: 20px;
  }
  .content {
    width: 100%;
    height: 100%;
    border: 1px solid #000;
  }
}
</style>
