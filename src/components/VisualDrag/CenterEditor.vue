<template>
  <div class="content" @drop="handleDrop" @dragover="handleDragOver" @click="deselectCurComponent">
    <Editor />
  </div>
</template>

<script>
import { deepCopy } from '@/utils'

export default {
  name: 'CenterEditor',
  methods: {
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      const component = deepCopy(componentList[e.dataTransfer.getData('index')])
      this.$store.commit('addComponent', component)
    },
    handleMouseDown(e) {
      e.stopPropagation()
      this.$store.commit('setCurComponent', { component: this.element, zIndex: this.zIndex })

      const pos = { ...this.defaultStyle }
      const startY = e.clientY
      const startX = e.clientX
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(pos.top)
      const startLeft = Number(pos.left)

      const move = (moveEvent) => {
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        pos.top = currY - startY + startTop
        pos.left = currX - startX + startLeft
        // 修改当前组件样式
        this.$store.commit('setShapeStyle', pos)
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  }
}
</script>

<style scoped>

</style>
