export const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    name: '首页',
    redirect: '/VisualDrag',
    children: [
      { path: '', component: () => import('@/views/VisualDragIndex'), },
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
]
