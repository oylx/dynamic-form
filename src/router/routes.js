import DynamicForm from '@/views/DynamicForm'
import VisualDrag from '@/views/VisualDrag'
import Layout from '@/layout'

export const routes = [
  {
    path: '/',
    component: () => Layout,
    children: [
      { path: 'DynamicForm', component: () => DynamicForm, name: '动态表单', },
      { path: 'VisualDrag', component: () => VisualDrag, name: '拖拽组件', },
    ]
  },
]
