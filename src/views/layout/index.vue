<template>
  <el-container>
    <div class="sidebar">
      <router-link v-for="(item, i) in routes" :key="i" :to="item.path" type="primary">{{ item.name }}</router-link>
    </div>
    <div class="main">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </div>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LayoutIndex',
  components: {},
  data() {
    return {}
  },
  created() {
    console.log(this.routes)
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      routes: state => state.app.routes
    }),
    key() {
      return this.$route.path
    },
  }
}
</script>

<style lang="less" scoped>
@sidebarWidth: 230px;
.sidebar {
  width: @sidebarWidth;
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
}

.main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  width: calc(100% - @sidebarWidth);
  height: calc(100vh);
}
</style>
