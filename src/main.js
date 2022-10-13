import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import router from '@/router'
import globalComponents from '@/components/index'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(globalComponents)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
