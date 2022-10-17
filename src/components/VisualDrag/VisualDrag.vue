<template>
  <div class="visual-drag-wrapper">
    <component-list />
    <section class="center">
      <div
        class="content"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @mousedown="handleMouseDown"
        @mouseup="deselectCurComponent"
      >
      </div>
    </section>
  </div>
</template>
<script>
import ComponentList from '@/components/VisualDrag/ComponentList'
import componentList from '@/components/VisualDrag/ComponentList'
import { deepCopy } from '@/utils'
import generateID from '@/utils/generateID'
import { changeComponentSizeWithScale } from '@/utils/changeComponentsSizeWithScale'

export default {
  name: 'VisualDrag',
  components: { ComponentList },
  data() {
    return {
      componentList: []
    }
  },
  methods: {

    handleDrop(e) {
      console.log('drop')
      e.preventDefault()
      e.stopPropagation()

      const index = e.dataTransfer.getData('index')
      const rectInfo = this.editor.getBoundingClientRect()
      if (index) {
        const component = deepCopy(componentList[index])
        component.style.top = e.clientY - rectInfo.y
        component.style.left = e.clientX - rectInfo.x
        component.id = generateID()

        // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
        changeComponentSizeWithScale(component)

        this.$store.commit('addComponent', { component })
        this.$store.commit('recordSnapshot')
      }
    },

    handleDragOver(e) {
      console.log('dragover')
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },

    handleMouseDown(e) {
      e.stopPropagation()
      console.log('handleMouseDown')
      this.$store.commit('setClickComponentStatus', false)
      this.$store.commit('setInEditorStatus', true)
    },

    deselectCurComponent(e) {
      console.log('mouseup')
      if (!this.isClickComponent) {
        this.$store.commit('setCurComponent', { component: null, index: null })
      }

      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit('hideContextMenu')
      }
    },
  }
}

</script>
<style lang="less" scoped>
.visual-drag-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .center {
    width: 50%;
    height: 100%;
    background: #FFFFFF;
  }
}
</style>
