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
  {
    path: '/customDrag',
    component: () => import('@/views/layout'),
    name: '定制菜单',
    children: [
      { path: '', component: () => import('@/views/CustomDrag'), },
    ]
  },
  {
    path: '/dragEcharts',
    component: () => import('@/views/layout'),
    name: 'echarts拖拽',
    children: [
      { path: '', component: () => import('@/views/DragEcharts'), },
    ]
  },
]
