<template>
  <div
    class="drag-resize-component"
    :style="{ left:left+ 'px', top: top + 'px', width: width +' px', height: height + 'px'}"
    @click="showResizeTag"
  >
    <div
      v-show="isResize && resizeFlag"
      id="resizeDivTag"
      ref="resizeDivTag"
    >
      <span class="br"/>
      <span class="bl"/>
      <span class="tr"/>
      <span class="tl"/>
    </div>
    <slot/>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  components: {},
  props: {
    itemId: { // 是否可缩放，默认为false
      type: [Number, String],
      default: 0,
    },
    isDrag: {  // 是否可拖拽，默认true
      type: Boolean,
      default: true,
    },
    isResize: { // 是否可缩放，默认为false
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: 400,
    },
    height: {
      type: [Number, String],
      default: 300,
    },
    left: {
      type: [Number, String],
      default: 0,
    },
    top: {
      type: [Number, String],
      default: 0,
    }
  },
  data() {
    return {
      resizeFlag: false, // 可拖动的标志位
    }
  },
  created() {
  },
  mounted() {
    if (this.isDrag) {
      this.initDrag()
    }
    if (this.isResize) {
      this.initResize()
    }
  },
  methods: {
    showResizeTag() {
      this.resizeFlag = !this.resizeFlag
    },
    // 初始化可缩放
    initResize() {
      let el = this.$el
      let spanNodes = this.$refs.resizeDivTag.childNodes
      for (let i = 0; i < spanNodes.length; i++) {
        this.resizeElementFun(spanNodes[i], el)
      }
    },
    resizeElementFun(element, el) {
      let itemId = this.itemId
      element.onmousedown = function (ev) {
        console.log('我是按下的元素')
        let oEv = ev || event
        oEv.stopPropagation()
        let oldWidth = el.offsetWidth
        let oldHeight = el.offsetHeight
        console.log('-----' + oldWidth + '----' + oldHeight)
        let oldX = oEv.clientX
        let oldY = oEv.clientY
        let oldLeft = el.offsetLeft
        let oldTop = el.offsetTop
        console.log('--zuo---' + oldLeft + '--gao--' + oldTop)
        document.onmousemove = function (ev) {
          // oEv.stopPropagation();
          let oEv = ev || event
          let disY = (oldTop + (oEv.clientY - oldY))
          // let disX = (oldLeft + (oEv.clientX - oldLeft));
          let disX = (oldLeft + (oEv.clientX - oldX))
          if (disX > oldLeft + oldWidth) {
            disX = oldLeft + oldWidth
          }
          if (disY > oldTop + oldHeight) {
            disY = oldTop + oldHeight
          }
          if (element.className == 'tl') {
            el.style.width = oldWidth - (oEv.clientX - oldX) + 'px'
            el.style.height = oldHeight - (oEv.clientY - oldY) + 'px'
            el.style.left = disX + 'px'
            el.style.top = disY + 'px'
          } else if (element.className == 'bl') {
            el.style.width = oldWidth - (oEv.clientX - oldX) + 'px'
            el.style.height = oldHeight + (oEv.clientY - oldY) + 'px'
            el.style.left = disX + 'px'
            // el.style.bottom = oldTop + (oEv.clientY + oldY) + 'px';
          } else if (element.className == 'tr') {
            el.style.width = oldWidth + (oEv.clientX - oldX) + 'px'
            el.style.height = oldHeight - (oEv.clientY - oldY) + 'px'
            el.style.right = oldLeft - (oEv.clientX - oldX) + 'px'
            el.style.top = disY + 'px'
          } else if (element.className == 'br') {
            el.style.width = oldWidth + (oEv.clientX - oldX) + 'px'
            el.style.height = oldHeight + (oEv.clientY - oldY) + 'px'
            el.style.right = oldLeft - (oEv.clientX - oldX) + 'px'
            // el.style.bottom = oldTop + (oEv.clientY + oldY) + 'px';
          }
        }
        document.onmouseup = function () {
          document.onmousemove = null
          const keys = ['width', 'height', 'left', 'top']
          const target = keys.reduce((prev, key) => {
            prev[key] = (el.style[key]).match(/\d+/)[0]
            return prev
          }, {})
          eventBus.$emit('give-advice', { itemId, ...target })
        }
        return false
      }
    },
    // 初始化可拖拽方法
    initDrag() {
      let el = this.$el
      let itemId = this.itemId
      el.onmousedown = (e) => {
        console.log('开始')
        let tX = null
        let tY = null
        e.preventDefault()
        e.target.style.cursor = 'move'
        //鼠标按下，计算鼠标触点距离元素左侧和顶部的距离
        let disX = e.clientX - el.offsetLeft
        let disY = e.clientY - el.offsetTop
        let width = el.style.width
        let height = el.style.height
        document.onmousemove = function (e) {
          //计算需要移动的距离
          tX = e.clientX - disX
          tY = e.clientY - disY
          //移动当前元素
          if (tX >= 0 && tX <= window.innerWidth - el.offsetWidth) {
            el.style.left = tX + 'px'
          }
          if (tY >= 0 && tY <= window.innerHeight - el.offsetHeight) {
            el.style.top = tY + 'px'
          }
        }
        //鼠标松开时，注销鼠标事件，停止元素拖拽。
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
          e.target.style.cursor = 'default'
          eventBus.$emit('give-advice', { itemId, width, height, left: tX, top: tY })
        }
      }
    },
  },
}
</script>

<style lang='scss'>
.drag-resize-component {
  position: absolute;
  // 四角
  .tl, .bl, .br, .tr {
    width: 10px;
    height: 10px;
    position: absolute;
    background: #fff;
    border: 1px solid #666;
    z-index: 2;
    cursor: nwse-resize
  }

  .tl, .bl {
    left: -6px;
  }

  .tr, .br {
    right: -6px;
  }

  .br, .bl {
    bottom: -6px;
  }

  .tl, .tr {
    top: -6px;
  }

  .tr, .bl {
    cursor: nesw-resize;
  }
}
</style>
