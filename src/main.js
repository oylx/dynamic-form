import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import store from'@/store'
import router from '@/router'
import globalComponents from '@/components/index'
import { routes } from '@/router/routes'
import '@/custom-component' // 注册自定义组件

import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.scss'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(globalComponents)
store.commit('app/SET_ROUTES', routes)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
