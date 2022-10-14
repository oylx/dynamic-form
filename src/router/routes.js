export const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    name: '首页',
    children: [
      { path: '', component: () => import('@/views/DynamicForm'), },
    ]
  },
  {
    path: '/DynamicForm',
    component: () => import('@/views/layout'),
    name: '动态表单',
    children: [
      { path: '', component: () => import('@/views/DynamicForm'), },
    ]
  },
  {
    path: '/VisualDrag',
    component: () => import('@/views/layout'),
    name: '拖拽组件',
    children: [
      { path: '', component: () => import('@/views/VisualDrag'), },
    ]
  },
]
