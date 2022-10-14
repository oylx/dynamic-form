<template>
  <div @dragstart="handleDragStart" class="component-list">
    <div v-for="(item, index) in componentList" :key="index" class="list" draggable :data-index="index">
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftComponents',
  data() {
    return {
      componentList: [
        {
          component: 'VText', // 组件名称，需要提前注册到 Vue
          label: '文字', // 左侧组件列表中显示的名字
          propValue: '文字', // 组件所使用的值
          icon: 'el-icon-edit', // 左侧组件列表中显示的名字
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: { // 组件样式
            width: 200,
            height: 33,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
          },
        },
        {
          component: 'VButton', // 组件名称，需要提前注册到 Vue
          label: '按钮', // 左侧组件列表中显示的名字
          propValue: '按钮', // 组件所使用的值
          icon: 'el-icon-menu', // 左侧组件列表中显示的名字
          animations: [], // 动画列表
          events: {}, // 事件列表
          style: { // 组件样式
            width: 200,
            height: 33,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
          },
        },
      ]
    }
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    },
  }
}
</script>

<style lang="less" scoped>
.component-list {
  width: 50%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 5px;
  > div {
    display: inline-block;
    padding: 10px;
    border: solid 1px #efefef;
  }
}
</style>
