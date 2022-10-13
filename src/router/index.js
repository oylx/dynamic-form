import VueRouter from 'vue-router'
import DynamicForm from '@/views/DynamicForm'
import Vue from 'vue'

Vue.use(VueRouter)
const routes = [
  { path: '/', component: DynamicForm },
]

const router = new VueRouter({ routes })
export default router
