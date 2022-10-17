<template>
  <div class="visual-drag-wrapper">

      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
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
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import { setDefaultcomponentData } from '@/store/snapshot'
import Editor from '@/components/VisualDrag/Editor'
import { mapState } from 'vuex'

export default {
  name: 'VisualDragIndex1',
  components: { ComponentList, Editor },
  data() {
    return {
      activeName: 'attr',
      reSelectAnimateIndex: undefined,
    }
  },
  computed: mapState([
    'componentData',
    'curComponent',
    'isClickComponent',
    'canvasStyleData',
    'editor',
  ]),
  created() {
    this.restore()
    // 全局监听按键事件
    listenGlobalKeyDown()
  },
  methods: {
    restore() {
      // 用保存的数据恢复画布
      if (localStorage.getItem('canvasData')) {
        setDefaultcomponentData(JSON.parse(localStorage.getItem('canvasData')))
        this.$store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
      }

      if (localStorage.getItem('canvasStyle')) {
        this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
      }
    },

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
  },
}

</script>
<style lang="less" scoped>

.visual-drag-wrapper {
  height: 100vh;
  background: #fff;


    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      & > div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }

}
</style>
