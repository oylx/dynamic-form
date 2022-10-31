<template>
  <div class="home">
    <!-- 中间画布 -->
    <section class="center">
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
        <template v-else>暂无定制菜单，可以通过拖拽左侧菜单实现定制化</template>
      </div>
    </section>
  </div>
</template>

<script>
import { routes } from '@/router/routes'
import { deepCopy } from '@/utils'

export default {
  name: 'CustomDragIndex',
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
.home {
  height: 100vh;
  background: #fff;

  .center {
    width: 100%;
    background: #f5f5f5;
    height: 100%;
    overflow: auto;
    padding: 20px;

    .content {
      width: 100%;
      height: 100%;
      overflow: auto;
      .drag-list {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 100px;
          height: 100px;
          box-shadow: 5px 5px 5px #999999;
          position: relative;
          .name {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .close {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            position: absolute;
            border: solid 1px #999999;
            right: 0;
            top: 0;
            font-size: 12px;
            z-index: 1;
          }
        }
      }
    }
  }


}
</style>

